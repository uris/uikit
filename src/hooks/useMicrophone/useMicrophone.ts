import type { RefObject } from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { DropDownOption } from '../../components/DropDown';

export type MicOption = { id: string };

export type UseMicrophoneReturn = {
	micStream: RefObject<MediaStream | null>;
	micTrack: RefObject<MediaStreamTrack | null>;
	muted: boolean;
	isSupported: boolean;
	isRequesting: boolean;
	error: Error | null;
	microphones: MediaDeviceInfo[];
	micOptions: DropDownOption<MicOption>[];
	requestMicrophone: () => Promise<MediaStream | null>;
	stopMicrophone: () => void;
	muteMic: () => boolean;
	unmuteMic: () => boolean;
	toggleMute: () => void;
	refreshMicrophones: () => Promise<MediaDeviceInfo[]>;
	setMicrophone: (
		deviceId: string | DropDownOption<MicOption>,
	) => Promise<void>;
};

export function useMicrophone(
	startMuted = true,
	microphoneDeviceId?: string,
): UseMicrophoneReturn {
	const micStream = useRef<MediaStream | null>(null);
	const micTrack = useRef<MediaStreamTrack | null>(null);
	const mutedRef = useRef<boolean>(startMuted);
	const mountedRef = useRef<boolean>(true);
	const initializedRef = useRef<boolean>(false);
	const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
	const [micOptions, setMicOptions] = useState<DropDownOption<MicOption>[]>([]);
	const [muted, setMuted] = useState<boolean>(startMuted);
	const [isRequesting, setIsRequesting] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);

	// use this to account for connection lags of external mics, etc. and provide accurate isRequesting state
	const waitForPaint = useCallback(async () => {
		await new Promise<void>((resolve) => {
			requestAnimationFrame(() => resolve());
		});
	}, []);

	// device mount can happen before the device actually becomes active, so we wait for the live state
	const waitForTrackToBecomeActive = useCallback(
		async (track: MediaStreamTrack) => {
			if (track.readyState === 'live' && !track.muted) return;

			await new Promise<void>((resolve) => {
				const handleUnmute = () => {
					track.removeEventListener('unmute', handleUnmute);
					resolve();
				};

				track.addEventListener('unmute', handleUnmute, { once: true });
			});
		},
		[],
	);

	// kill the mic stream entirely
	const stopMicStream = useCallback(() => {
		const tracks = micStream.current?.getTracks();
		for (const track of tracks ?? []) {
			track.stop();
		}
		micStream.current = null;
		micTrack.current = null;
	}, []);

	// determine whether the browser can access media devices at all
	const hasMediaSupport = useMemo(() => {
		if (typeof navigator === 'undefined') return false;
		return Boolean(navigator.mediaDevices?.getUserMedia);
	}, []);

	// get mic audio track
	const getMicTrack = useCallback(() => {
		if (!micStream.current) throw new Error('No microphone stream found');
		const audioTrack = micStream.current.getAudioTracks()[0];
		if (!audioTrack) throw new Error('No audio track found');
		return audioTrack;
	}, []);

	// disable the live microphone track
	const muteMic = useCallback(() => {
		const audioTrack = getMicTrack();
		audioTrack.enabled = false;
		mutedRef.current = true;
		setMuted(true);
		return true;
	}, [getMicTrack]);

	// enable the live microphone track
	const unmuteMic = useCallback(() => {
		const audioTrack = getMicTrack();
		audioTrack.enabled = true;
		mutedRef.current = false;
		setMuted(false);
		return true;
	}, [getMicTrack]);

	// constraint to microphone and specific device if any
	const constraints = useCallback(
		(deviceId?: string, usePreferredDevice = true) => {
			const id = usePreferredDevice
				? (deviceId ?? microphoneDeviceId ?? undefined)
				: deviceId;
			return {
				audio: {
					deviceId: id ? { exact: id } : undefined,
				},
			};
		},
		[microphoneDeviceId],
	);

	// shared request path so the hook can explicitly switch to the default device when needed
	const requestStream = useCallback(
		async (deviceId?: string, usePreferredDevice = true) => {
			micStream.current = await navigator.mediaDevices.getUserMedia(
				constraints(deviceId, usePreferredDevice),
			);
			micTrack.current = getMicTrack();
			micTrack.current.enabled = !mutedRef.current;
			if (!mutedRef.current) {
				await waitForTrackToBecomeActive(micTrack.current);
			}
			return micStream.current;
		},
		[constraints, getMicTrack, waitForTrackToBecomeActive],
	);

	// request a media stream and fall back to generic constraints if needed
	const requestMicrophone = useCallback(async () => {
		setIsRequesting(true);
		await waitForPaint();

		if (!hasMediaSupport) {
			const nextError = new Error('Microphone access is not supported');
			setError(nextError);
			if (mountedRef.current) setIsRequesting(false);
			return null;
		}

		setError(null);
		stopMicStream();

		try {
			return await requestStream();
		} catch (error) {
			const shouldRetry =
				(error instanceof DOMException &&
					error.name === 'OverconstrainedError') ||
				(error instanceof DOMException && error.name === 'NotFoundError');
			if (!shouldRetry) {
				const nextError =
					error instanceof Error
						? error
						: new Error('Failed to access microphone');
				setError(nextError);
				throw nextError;
			}
			return await requestStream(undefined, false);
		} finally {
			setIsRequesting(false);
		}
	}, [hasMediaSupport, requestStream, stopMicStream, waitForPaint]);

	// get a list of available microphones
	const refreshMicrophones = useCallback(async () => {
		if (!hasMediaSupport) return [];
		try {
			const devices = await navigator.mediaDevices.enumerateDevices();
			const mics = devices.filter((device) => device.kind === 'audioinput');
			const options: DropDownOption<MicOption>[] = mics.map((mic) => ({
				value: { id: mic.deviceId },
				label: mic.label,
			}));
			setMicrophones(mics);
			setMicOptions(options);
			return devices.filter((device) => device.kind === 'audioinput');
		} catch (error) {
			console.warn('Error getting microphone devices:', error);
			setMicrophones([]);
			setMicOptions([]);
			return [];
		}
	}, [hasMediaSupport]);

	// switch microphones
	const setMicrophone = useCallback(
		async (deviceId: string | DropDownOption<MicOption>) => {
			setIsRequesting(true);
			await waitForPaint(); // make sure isRequesting registers
			const id = typeof deviceId === 'string' ? deviceId : deviceId.value?.id;
			try {
				setError(null);
				stopMicStream();
				await requestStream(id, false);
			} catch (err) {
				setError(
					err instanceof Error ? err : new Error('Error switching microphone'),
				);
				console.warn('Error switching microphone:', err);
			} finally {
				setIsRequesting(false);
			}
		},
		[requestStream, stopMicStream, waitForPaint],
	);

	// toggle mic mute on/off
	const toggleMute = useCallback(() => {
		try {
			if (muted) unmuteMic();
			else muteMic();
		} catch (error) {
			console.warn('Error toggling microphone mute:', error);
			return;
		}
	}, [muted, unmuteMic, muteMic]);

	// get microphone stream on mount
	useEffect(() => {
		mountedRef.current = true;
		if (!hasMediaSupport) return;
		if (initializedRef.current) return;
		initializedRef.current = true;
		void requestMicrophone()
			.then(() => {
				if (startMuted) muteMic();
			})
			.catch((err) => {
				console.error('Error accessing microphone:', err);
			});
		return () => {
			mountedRef.current = false;
			stopMicStream();
		};
	}, [hasMediaSupport, requestMicrophone, startMuted, muteMic, stopMicStream]);

	// keep microphone devices fresh as hardware becomes available/unavailable
	useEffect(() => {
		if (!hasMediaSupport || !navigator.mediaDevices?.addEventListener) return;
		void refreshMicrophones();

		const handleDeviceChange = () => {
			void refreshMicrophones().then((nextMicrophones) => {
				const currentDeviceId = micTrack.current?.getSettings().deviceId;
				const selectedDeviceId = microphoneDeviceId ?? currentDeviceId;
				if (!selectedDeviceId) return;
				const stillAvailable = nextMicrophones.some(
					(mic) => mic.deviceId === selectedDeviceId,
				);
				if (stillAvailable) return;
				void requestMicrophone();
			});
		};

		navigator.mediaDevices.addEventListener('devicechange', handleDeviceChange);

		return () => {
			navigator.mediaDevices.removeEventListener(
				'devicechange',
				handleDeviceChange,
			);
		};
	}, [
		hasMediaSupport,
		microphoneDeviceId,
		refreshMicrophones,
		requestMicrophone,
	]);

	return {
		micStream,
		micTrack,
		muted,
		isSupported: hasMediaSupport,
		isRequesting,
		error,
		microphones,
		micOptions,
		requestMicrophone,
		stopMicrophone: stopMicStream,
		muteMic,
		unmuteMic,
		toggleMute,
		refreshMicrophones,
		setMicrophone,
	};
}
