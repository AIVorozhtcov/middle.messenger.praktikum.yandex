type EventCallback<T> = T extends (...args: infer P) => any ? (...args: P) => void : never;
type DefaultEventMap = Record<string, (...args: any[]) => void>;

interface EventMap {
  [event: string]: (...args: any[]) => void;
}

class EventBus<T extends EventMap = DefaultEventMap> {
  private listeners: { [K in keyof T]?: EventCallback<T[K]>[] } = {};

  on<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<K extends keyof T>(event: K, callback: EventCallback<T[K]>): void {
    if (!this.listeners[event]) {
      throw new Error(`No such event: ${String(event)}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(
      listener => listener !== callback
    );
  }

  emit<K extends keyof T>(event: K, ...args: Parameters<T[K]>): void {
    if (!this.listeners[event]) {
      throw new Error(`No such event: ${String(event)}`);
    }
    this.listeners[event]!.forEach(listener => {
      listener(...args);
    });
  }
}

export default EventBus;
  
