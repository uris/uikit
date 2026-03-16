import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { useTheme } from '../../hooks';
import { addOpacity } from '../../utils';
import { accessibleKeyDown } from '../../utils/functions/misc';
import { Icon } from '../Icon';
import css from './Camera.module.css';
import type {
	CameraElement,
	CameraProps,
	CameraSnapshotOptions,
	ToolbarButtonProps,
} from './_types';

export const Camera = React.memo(
	React.forwardRef<CameraElement, CameraProps>((props, ref) => {
		const videoElement = useRef<HTMLVideoElement>(null);
		const containerElement = useRef<HTMLDivElement>(null);
		const controlsTimer = useRef<NodeJS.Timeout | null>(null);
		const {
			width,
			height,
			showControlBar = true,
			autoHideControlBar = true,
			startCameraOff = false,
			startAudioMuted = false,
			pipSnapshot = true,
			onSnapshot,
			onVideoStream,
			onNoVideo,
			onNoAudio,
		} = props;
		const theme = useTheme();
		const [cameraSupport, setCameraSupport] = useState<boolean | undefined>(
			undefined,
		);
		const [cameraError, setCameraError] = useState<string | undefined>(
			undefined,
		);
		const [hovered, setHovered] = useState<boolean>(false);
		const [cameraOn, setCameraOn] = useState<boolean>(false);
		const [micMuted, setMicMuted] = useState<boolean>(startAudioMuted);
		const [snapshot, setSnapshot] = useState<string | undefined>(undefined);

		const constraints = useMemo(
			() => ({
				video: true,
				audio: true,
			}),
			[],
		);

		const getStream = useCallback(() => {
			const srcObject = videoElement.current?.srcObject;
			return srcObject instanceof MediaStream ? srcObject : undefined;
		}, []);

		const getTrack = useCallback(
			(type: 'video' | 'audio') => {
				const stream = getStream();
				if (!stream) return undefined;
				if (type === 'video') return stream.getVideoTracks()[0] ?? undefined;
				return stream.getAudioTracks()[0] ?? undefined;
			},
			[getStream],
		);

		const getMediaDevices = useCallback(async () => {
			if (!navigator.mediaDevices?.enumerateDevices)
				return new Error('Media devices not supported');
			return await navigator.mediaDevices.enumerateDevices().catch((error) => {
				const defaultError = new Error(
					'Unknown error enumerating devices. Please try again.',
				);
				return error instanceof Error ? error : defaultError;
			});
		}, []);

		const hasMediaSupport = useMemo(() => {
			return Boolean(navigator.mediaDevices?.getUserMedia);
		}, []);

		const syncMediaState = useCallback(() => {
			const stream = getStream();
			const videoTrack = stream?.getVideoTracks()[0];
			const audioTrack = stream?.getAudioTracks()[0];
			setCameraOn(
				Boolean(videoTrack?.readyState === 'live' && videoTrack.enabled),
			);
			setMicMuted(audioTrack ? !audioTrack.enabled : false);
		}, [getStream]);

		const takeSnapshot = useCallback((options?: CameraSnapshotOptions) => {
			if (!videoElement.current) return undefined;
			const width = options?.width ?? videoElement.current.videoWidth;
			const height = options?.height ?? videoElement.current.videoHeight;
			if (!width || !height) return undefined;
			const canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			const context = canvas.getContext('2d');
			if (!context) return undefined;
			context.drawImage(
				videoElement.current,
				0,
				0,
				canvas.width,
				canvas.height,
			);
			const url = canvas.toDataURL('image/png');
			const [header, data] = url.split(',');
			if (!header || !data) return undefined;
			const mimeType =
				new RegExp(/data:(.*?);base64/).exec(header)?.[1] ?? 'image/png';
			const binary = atob(data);
			const bytes = new Uint8Array(binary.length);
			for (let index = 0; index < binary.length; index += 1) {
				bytes[index] = binary.charCodeAt(index);
			}
			return new Blob([bytes], { type: mimeType });
		}, []);

		// helper function to take a snapshot and set state
		const handleSnapshot = useCallback(
			(options?: CameraSnapshotOptions) => {
				if (options?.toggle && !!snapshot) {
					setSnapshot(undefined);
					return undefined;
				}
				const photo = takeSnapshot(options);
				onSnapshot?.(photo);
				setSnapshot((previousSnapshot) => {
					if (previousSnapshot) URL.revokeObjectURL(previousSnapshot);
					return photo ? URL.createObjectURL(photo) : undefined;
				});
				return photo;
			},
			[onSnapshot, takeSnapshot, snapshot],
		);

		// mute the mic
		const muteMic = useCallback(() => {
			const audioTrack = getTrack('audio');
			if (!audioTrack) return new Error('No audio track found');
			audioTrack.enabled = false;
			setMicMuted(true);
			return true;
		}, [getTrack]);

		// unmute the mic
		const unmuteMic = useCallback(() => {
			const audioTrack = getTrack('audio');
			if (!audioTrack) return new Error('No audio track found');
			audioTrack.enabled = true;
			setMicMuted(false);
			return true;
		}, [getTrack]);

		// helper to toggle mic on/off
		const toggleMic = useCallback(() => {
			const audioTrack = getTrack('audio');
			if (!audioTrack) return new Error('No audio track found');
			return audioTrack.enabled ? muteMic() : unmuteMic();
		}, [getTrack, muteMic, unmuteMic]);

		// disable video while keeping the stream and audio track alive
		const disableVideo = useCallback(() => {
			const videoTrack = getTrack('video');
			if (!videoTrack) return new Error('No video track found');
			videoTrack.enabled = false;
			setCameraOn(false);
			return true;
		}, [getTrack]);

		// re-enable the existing video track without recreating the stream
		const enableVideo = useCallback(() => {
			const stream = getStream();
			if (!stream) return new Error('No media stream found');
			const videoTrack = getTrack('video');
			if (!videoTrack) return new Error('No video track found');
			if (videoTrack.readyState !== 'live')
				return new Error('Video track is no longer live');
			videoTrack.enabled = true;
			setCameraOn(true);
			return stream;
		}, [getStream, getTrack]);

		// start the camera stream
		const startCamera = useCallback(async () => {
			if (!videoElement.current) return new Error('Video element not found');
			if (!hasMediaSupport) {
				setCameraSupport(false);
				setCameraError('Camera not supported');
				return new Error('Camera not supported');
			}
			const existingStream = getStream();
			const existingVideoTrack = existingStream?.getVideoTracks()[0];
			if (
				existingVideoTrack?.readyState === 'live' &&
				!existingVideoTrack.enabled
			) {
				const enabledStream = enableVideo();
				if (enabledStream instanceof Error) return enabledStream;
				onVideoStream?.(enabledStream);
				setCameraSupport(true);
				setCameraError(undefined);
				syncMediaState();
				return enabledStream;
			}
			if (existingStream?.active && existingVideoTrack?.readyState === 'live') {
				setCameraSupport(true);
				setCameraError(undefined);
				syncMediaState();
				return existingStream;
			}
			try {
				const stream = await navigator.mediaDevices.getUserMedia(constraints);
				const audioTrack = stream.getAudioTracks()[0];
				const videoTrack = stream.getVideoTracks()[0];
				if (!videoTrack) {
					onNoVideo?.('No video track available');
					for (const track of stream.getTracks()) {
						track.stop();
					}
					return new Error('No video track available');
				}
				if (!audioTrack) onNoAudio?.('No audio track available');
				if (audioTrack) audioTrack.enabled = !startAudioMuted;
				videoElement.current.srcObject = stream;
				await videoElement.current.play();
				onVideoStream?.(stream);
				setCameraSupport(true);
				setCameraError(undefined);
				syncMediaState();
				return stream;
			} catch (error) {
				const defaultError = new Error(
					'Could not access the camera. Ensure permissions are correct',
				);
				const resolvedError = error instanceof Error ? error : defaultError;
				onNoVideo?.(resolvedError);
				onNoAudio?.(resolvedError);
				setCameraSupport(true);
				setCameraError(resolvedError.message);
				setCameraOn(false);
				return resolvedError;
			}
		}, [
			constraints,
			enableVideo,
			hasMediaSupport,
			onNoAudio,
			onNoVideo,
			onVideoStream,
			startAudioMuted,
			getStream,
			syncMediaState,
		]);

		const toggleVideo = useCallback(async () => {
			const stream = getStream();
			if (!stream) return await startCamera();
			const videoTrack = stream.getVideoTracks()[0];
			if (!videoTrack) return new Error('No video track found');
			return videoTrack.enabled ? disableVideo() : enableVideo();
		}, [disableVideo, enableVideo, getStream, startCamera]);

		// stop the camer stream
		const stopCamera = useCallback(async () => {
			if (!videoElement.current) return new Error('Video element not found');
			try {
				const stream = getStream();
				if (!stream) return new Error('No media stream to stop');
				for (const track of stream.getTracks()) {
					track.stop();
				}
				videoElement.current.srcObject = null;
				setCameraOn(false);
				setMicMuted(startAudioMuted);
				setCameraError(undefined);
				return true;
			} catch (error) {
				const defaultError = new Error(
					'Unknown error stopping the camera. Please try again.',
				);
				return error instanceof Error ? error : defaultError;
			}
		}, [getStream, startAudioMuted]);

		// expose camera video/audio objects and methods via forwarded ref
		React.useImperativeHandle(
			ref,
			() => ({
				get video() {
					return videoElement.current ?? undefined;
				},
				get container() {
					return containerElement.current ?? undefined;
				},
				get stream() {
					return getStream();
				},
				get videoTrack() {
					return getTrack('video');
				},
				get audioTrack() {
					return getTrack('audio');
				},
				snapshot: (options?: CameraSnapshotOptions) => handleSnapshot(options),
				startCamera: () => startCamera(),
				stopCamera: () => stopCamera(),
				enableVideo: () => enableVideo(),
				disableVideo: () => disableVideo(),
				muteMic: () => muteMic(),
				unmuteMic: () => unmuteMic(),
				toggleMic: () => toggleMic(),
				devices: () => getMediaDevices(),
				toggleVideo: () => toggleVideo(),
			}),
			[
				disableVideo,
				enableVideo,
				getMediaDevices,
				getStream,
				getTrack,
				handleSnapshot,
				muteMic,
				startCamera,
				stopCamera,
				toggleMic,
				toggleVideo,
				unmuteMic,
			],
		);

		// styling setup

		const controlsBg = useMemo(() => {
			const bgColor = theme.current.colors['core-surface-primary'];
			return addOpacity(bgColor, 0.75);
		}, [theme.current]);

		const setControlBarVisible = useMemo(() => {
			if (!showControlBar) return 'translateY(100%)';
			if (!autoHideControlBar) return 'translateY(0%)';
			if (hovered) return 'translateY(0%)';
			return 'translateY(100%)';
		}, [autoHideControlBar, hovered, showControlBar]);

		const cssVars = useMemo(
			() =>
				({
					'--camera-width': width,
					'--camera-height': height,
					'--camera-controls-bg': controlsBg,
					'--camera-controls-transform': setControlBarVisible,
				}) as React.CSSProperties,
			[controlsBg, height, setControlBarVisible, width],
		);

		// methods

		const handleMouseEnter = () => {
			if (controlsTimer.current) clearTimeout(controlsTimer.current);
			setHovered(true);
			controlsTimer.current = setTimeout(() => setHovered(false), 3000);
		};

		const handleMouseLeave = () => {
			if (controlsTimer.current) clearTimeout(controlsTimer.current);
			setHovered(false);
		};

		const handleControlsMouseEnter = () => {
			if (controlsTimer.current) clearTimeout(controlsTimer.current);
			setHovered(true);
		};

		const handleControlsMouseLeave = () => {
			if (controlsTimer.current) clearTimeout(controlsTimer.current);
			controlsTimer.current = setTimeout(() => setHovered(false), 3000);
		};

		// trigger auto start camera based on prop changes
		useEffect(() => {
			if (startCameraOff) {
				stopCamera().then(() => null);
				return;
			}
			startCamera().then(() => null);
		}, [startCamera, startCameraOff, stopCamera]);

		// clean up camer stream object
		useEffect(() => {
			return () => {
				if (controlsTimer.current) clearTimeout(controlsTimer.current);
				const stream = getStream();
				if (stream) {
					for (const track of stream.getTracks()) {
						track.stop();
					}
				}
			};
		}, [getStream]);

		// clean up snapshot object url
		useEffect(() => {
			return () => {
				if (snapshot) URL.revokeObjectURL(snapshot);
			};
		}, [snapshot]);

		return (
			<div
				ref={containerElement}
				className={css.wrapper}
				style={cssVars}
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
				onMouseMove={handleMouseEnter}
			>
				{pipSnapshot && snapshot && (
					<div className={css.snapshotFrame}>
						<div className={css.clear}>
							<Icon
								name={'x'}
								pointer={true}
								role={'button'}
								aria-label={'Clear snapshot'}
								onClick={() =>
									setSnapshot((previousSnapshot) => {
										if (previousSnapshot) URL.revokeObjectURL(previousSnapshot);
										return undefined;
									})
								}
							/>
						</div>
						<img className={css.snapshot} src={snapshot} alt={'Snapshot'} />
					</div>
				)}
				{cameraSupport !== false && (
					// biome-ignore lint/a11y/useMediaCaption: Live camera preview has no caption source.
					<video ref={videoElement} className={css.video} autoPlay playsInline>
						<track kind={'captions'} src={undefined} />
					</video>
				)}
				{cameraSupport === false && <div>Camera not supported</div>}
				{cameraError && cameraSupport !== false && <div>{cameraError}</div>}
				<div
					className={css.controls}
					onMouseEnter={handleControlsMouseEnter}
					onMouseLeave={handleControlsMouseLeave}
				>
					<div className={css.controlsLeft} />
					<div className={css.controlsCenter}>
						<ToolbarButton
							icon={'video'}
							iconActive={'video'}
							active={!cameraOn}
							label={cameraOn ? 'Video' : 'Off'}
							onClick={() => void toggleVideo()}
						/>
						<ToolbarButton
							icon={'mic'}
							iconActive={'mic muted'}
							active={micMuted}
							label={micMuted ? 'Muted' : 'Mic'}
							onClick={() => toggleMic()}
						/>
						<ToolbarButton
							icon={'camera'}
							iconActive={'camera'}
							active={!!snapshot}
							label={'Photo'}
							disabled={!cameraOn}
							onClick={() => cameraOn && handleSnapshot({ toggle: true })}
						/>
					</div>
					<div className={css.controlsRight} />
				</div>
			</div>
		);
	}),
);

export function ToolbarButton(props: Readonly<ToolbarButtonProps>) {
	const { icon, iconActive, active, label, disabled, onClick } = props;

	const iconColor = useMemo(() => {
		if (active) return 'var(--core-surface-primary)';
		return 'var(--core-text-special)';
	}, [active]);

	const labelColor = useMemo(() => {
		if (active) return 'var(--core-text-primary)';
		return disabled ? 'var(--core-text-disabled)' : 'var(--core-text-special)';
	}, [active, disabled]);

	const cssVars = useMemo(() => {
		return {
			'--toolbar-button-size': '44px',
			'--toolbar-button-border': 'none',
			'--toolbar-button-bg-color': active
				? 'var(--core-text-primary)'
				: 'var(--core-surface-primary)',
			'--toolbar-button-label-color': labelColor,
			'--toolbar-button-opacity': disabled ? '0.25' : '1',
		} as React.CSSProperties;
	}, [active, labelColor, disabled]);
	return (
		<div
			className={css.toolbarButton}
			style={cssVars}
			role="button"
			aria-label={label}
			aria-disabled={disabled}
			onKeyDown={(e) => {
				if (disabled) return;
				accessibleKeyDown(e, () => onClick());
			}}
			onClick={disabled ? undefined : onClick}
			tabIndex={disabled ? -1 : 0}
		>
			<div className={css.buttonIcon}>
				<Icon name={active ? iconActive : icon} strokeColor={iconColor} />
			</div>
			<div className={css.buttonLabel}>{label}</div>
		</div>
	);
}
