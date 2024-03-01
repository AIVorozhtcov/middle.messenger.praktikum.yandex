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
  /*
  const eventBus = new EventBus();
  
  const handlerEvent1 = (arg1, arg2) => {
    console.log('first', arg1, arg2);
  };
  
  const handlerEvent2 = (arg1, arg2) => {
    console.log('second', arg1, arg2);
  };
  
  try {
      eventBus.emit('common:event-1', 42, 10);
  } catch (error) {
      console.log(error); // Error: Нет события: common:event-1
  } */



   /*
  eventBus.on('common:event-1', handlerEvent1);
  eventBus.on('common:event-1', handlerEvent2);
  
  eventBus.emit('common:event-1', 42, 10);
  eventBus.off('common:event-1', handlerEvent2);
  
  eventBus.emit('common:event-1', 84, 20);
  
 
      * Вывод в консоли должен быть следующий:
  Error: Нет события: common:event-1
  first 42 10
  second 42 10
  first 84 20
  */
