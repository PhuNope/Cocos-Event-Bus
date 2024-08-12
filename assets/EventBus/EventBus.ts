import { IEventBinding } from "db://assets/EventBus/EventBinding";
import { IEvent } from "db://assets/EventBus/Events";

export class EventBus<T extends IEvent> {
    private static bindings = new Set<IEventBinding<any>>();

    public static Register<T>(binding: IEventBinding<T>): void {
        this.bindings.add(binding);
    }

    public static Deregister<T>(binding: IEventBinding<T>): void {
        this.bindings.delete(binding);
    }

    public static Raise<T>(event: T): void {
        for (const binding of this.bindings) {
            binding.onEvent?.(event);
            binding.onEventNoArgs?.();
        }
    }

    public static Clear(): void {
        console.log(`Clearing bindings`);
        this.bindings.clear();
    }
}