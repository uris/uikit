export interface WebRTCConnectionOptions {
	connectionUrl?: string;
	audioElement?: HTMLAudioElement;
	autoPlayAudio?: boolean;
	dataChannels?: string | string[];
	micMediaTrack: MediaStreamTrack;
	videoMediaTrack?: MediaStreamTrack;
	onRemoteVideoStream?: (streams: Map<string, MediaStream>) => void;
	onRemoteAudioStream?: (streams: Map<string, MediaStream>) => void;
	onDataChannelEvent?: (
		channel: string,
		eventType: 'message' | 'open' | 'close' | 'error',
		eventData: MessageEvent | Event | RTCErrorEvent,
	) => void;
}
