export type EventCallback<T = any> = (payload: T) => void;

export class EventEmitter<T extends Record<string, any>> {
  private listeners: { [K in keyof T]?: EventCallback<T[K]>[] } = {};

  /**
   * Alias for addEventListener
   * @param event The event name
   * @param callback The callback to register
   */
  public on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    this.addEventListener(event, callback);
  }

  /**
   * Alias for removeEventListener
   * @param event The event name
   * @param callback The callback to remove
   */
  public off<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    this.removeEventListener(event, callback);
  }

  /**
   * Add a listener for a specific event
   * @param event The event name
   * @param callback The callback to register
   */
  public addEventListener<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  /**
   * Remove a specific listener for an event
   * @param event The event name
   * @param callback The callback to remove
   */
  public removeEventListener<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event]!.filter((cb) => cb !== callback);
  }

  /**
   * Add a one-time listener for an event
   * @param event The event name
   * @param callback The callback to register
   */
  public once<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    const wrapper = (payload: T[K]) => {
      callback(payload); // Call the original callback
      this.removeEventListener(event, wrapper); // Remove the wrapper after invocation
    };
    this.addEventListener(event, wrapper);
  }

  /**
   * Trigger an event with a payload
   * @param event The event name
   * @param payload The data to pass to the event listeners
   */
  public emit<K extends keyof T>(event: K, payload: T[K]): void {
    if (!this.listeners[event]) return;
    this.listeners[event]!.forEach((callback) => callback(payload));
  }
}
