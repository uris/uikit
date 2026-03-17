export type SSEEventMap = Record<string, unknown>;

type SSEEventName<TCustomEvents extends SSEEventMap> = Extract<
	keyof TCustomEvents,
	string
>;

export interface SSECustomEvent<
	TCustomEvents extends SSEEventMap,
	TName extends SSEEventName<TCustomEvents> = SSEEventName<TCustomEvents>,
> {
	name: TName;
	handler: (data: TCustomEvents[TName]) => void;
}

export interface SSEConnectionOptions<
	TMessage = unknown,
	TCustomEvents extends SSEEventMap = Record<string, never>,
> {
	url?: string;
	options?: EventSourceInit;
	onMessageCallback?: (data: TMessage | string) => void;
	onErrorCallback?: (event: Event) => void;
	onOpenCallback?: (event: Event) => void;
	customEvents?:
		| SSECustomEvent<TCustomEvents>
		| SSECustomEvent<TCustomEvents>[];
}

export class SSEConnection<
	TMessage = unknown,
	TCustomEvents extends SSEEventMap = Record<string, never>,
> {
	private readonly url!: string;
	private readonly options!: EventSourceInit | undefined;
	private sseConnection: EventSource | null = null;
	private readonly onMessageCallback?: (data: TMessage | string) => void;
	private readonly onErrorCallback?: (event: Event) => void;
	private readonly onOpenCallback?: (event: Event) => void;
	private readonly customEvents!: SSECustomEvent<TCustomEvents>[];
	private readonly customEventHandlers = new Map<
		string,
		Array<(event: MessageEvent) => void>
	>();

	/**
	 * Create an SEE connection instance
	 */
	constructor(options?: SSEConnectionOptions<TMessage, TCustomEvents>) {
		this.url = options?.url ?? '';
		this.options = options?.options ?? undefined;
		this.onMessageCallback = options?.onMessageCallback;
		this.onErrorCallback = options?.onErrorCallback;
		this.onOpenCallback = options?.onOpenCallback;
		if (options?.customEvents) {
			this.customEvents = Array.isArray(options?.customEvents)
				? options.customEvents
				: [options.customEvents];
		} else this.customEvents = [];
		this.sseConnection = new EventSource(this.url, this.options);
		this.attachDefaultEventListeners(this.sseConnection);
		if (this.customEvents.length > 0)
			this.attachCustomEventListeners(this.customEvents);
	}

	/**
	 * Safely parse SSE event data. Falls back to the raw string when the payload is not JSON.
	 */
	private parseEventData<T>(rawData: string): T | string {
		try {
			return JSON.parse(rawData) as T;
		} catch {
			return rawData;
		}
	}

	/**
	 * Attach default SEE events
	 */
	private attachDefaultEventListeners(connection: EventSource) {
		connection.addEventListener('message', this.onMessage as EventListener);
		connection.addEventListener('error', this.onError as EventListener);
		connection.addEventListener('open', this.onOpen as EventListener);
	}

	/**
	 * Attach custom event listeners to the SSE connection
	 */
	private attachCustomEventListener<TName extends SSEEventName<TCustomEvents>>(
		customEvent: SSECustomEvent<TCustomEvents, TName>,
	) {
		if (!this.sseConnection) return;
		const handler = (eventInfo: MessageEvent) => {
			const data = this.parseEventData<TCustomEvents[TName]>(eventInfo.data);
			customEvent.handler(data as TCustomEvents[TName]);
		};
		const currentHandlers = this.customEventHandlers.get(customEvent.name) ?? [];
		currentHandlers.push(handler);
		this.customEventHandlers.set(customEvent.name, currentHandlers);
		this.sseConnection.addEventListener(
			customEvent.name,
			handler as EventListener,
		);
	}

	/**
	 * Attach custom event listeners to the SSE connection
	 */
	private attachCustomEventListeners(
		customEvents:
			| SSECustomEvent<TCustomEvents>
			| SSECustomEvent<TCustomEvents>[],
	) {
		const events = Array.isArray(customEvents) ? customEvents : [customEvents];
		for (const event of events) {
			this.attachCustomEventListener(event);
		}
	}

	/**
	 * Clean up listeners
	 */
	private detachAllEventListeners(connection: EventSource) {
		// defaults
		connection.removeEventListener('message', this.onMessage as EventListener);
		connection.removeEventListener('error', this.onError as EventListener);
		connection.removeEventListener('open', this.onOpen as EventListener);

		// custom events
		for (const [eventName, handlers] of this.customEventHandlers.entries()) {
			for (const handler of handlers) {
				connection.removeEventListener(eventName, handler as EventListener);
			}
		}

		// nullify the custom event array
		this.customEventHandlers.clear();
	}

	/**
	 * One message received
	 */
	onMessage = (event: MessageEvent) => {
		const data = this.parseEventData<TMessage>(event.data);
		this.onMessageCallback?.(data);
	};

	/**
	 * On error event
	 */
	onError = (event: Event) => {
		this.onErrorCallback?.(event);
	};

	/**
	 * On open event
	 */
	onOpen = (event: Event) => {
		this.onOpenCallback?.(event);
	};

	/**
	 * Close the SSE connection and release resources.
	 */
	public close = () => {
		if (!this.sseConnection) return;
		this.detachAllEventListeners(this.sseConnection);
		this.sseConnection.close();
		this.sseConnection = null;
	};
}
