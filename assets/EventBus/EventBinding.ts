import { IEvent } from "db://assets/EventBus/Events";

export interface IEventBinding<T extends IEvent> {
    onEvent?: (event: T) => void;
    onEventNoArgs?: () => void;
}

export class EventBinding<T extends IEvent> implements IEventBinding<T> {
    public onEvent: (event: T) => void = () => {
    };
    public onEventNoArgs: () => void = () => {
    };

    constructor(onEvent?: (event: T) => void);
    constructor(onEventNoArgs?: () => void);
    constructor(onEventOrNoArgs?: ((event: T) => void) | (() => void)) {
        if (onEventOrNoArgs) {
            if (onEventOrNoArgs.length === 0) {
                this.onEventNoArgs = onEventOrNoArgs as () => void;
            } else {
                this.onEvent = onEventOrNoArgs as (event: T) => void;
            }
        }
    }

    public add(onEvent: () => void): void;
    public add(onEvent: (event: T) => void): void;
    public add(onEventOrNoArgs: ((event: T) => void) | (() => void)): void {
        if (onEventOrNoArgs.length === 0) {
            this.onEventNoArgs = onEventOrNoArgs as () => void;
        } else {
            this.onEvent = onEventOrNoArgs as (event: T) => void;
        }
    }

    public remove(onEvent: () => void): void;
    public remove(onEvent: (event: T) => void): void;
    public remove(onEventOrNoArgs: ((event: T) => void) | (() => void)): void {
        if (onEventOrNoArgs.length === 0) {
            this.onEventNoArgs = () => {
            };
        } else {
            this.onEvent = () => {
            };
        }
    }
}