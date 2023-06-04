import { App } from 'vue'
import EventEmitter from "eventemitter3"
const eventEmitter = new EventEmitter();
class EventBus {
    install(app: App) {
        app.provide("listener", (eventName: string, callback: (...args: any[]) => void) => {
            eventEmitter.addListener(eventName, callback)
        });
        app.provide("trigger", (eventName: string, ...payload: any[]) => {
            eventEmitter.emit(eventName, ...payload)
        })
    }
    event_emitter: EventEmitter = eventEmitter
}

export default EventBus