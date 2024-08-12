import { _decorator, Component, Node } from 'cc';
import { EventBinding } from "db://assets/EventBus/EventBinding";
import { PlayerEvent } from "db://assets/EventBus/Events";
import { EventBus } from "db://assets/EventBus/EventBus";

const {ccclass, property} = _decorator;

@ccclass('B')
export class B extends Component {
    playerEventBinding: EventBinding<PlayerEvent>;

    onLoad() {
        this.playerEventBinding = new EventBinding<PlayerEvent>((event: PlayerEvent) => {
            console.log("Triggered in B!!!");
            console.log(`Health: ${event.health}, mana: ${event.mana}`);
        });

        EventBus.Register<PlayerEvent>(this.playerEventBinding);
    }

    start() {
        EventBus.Raise<PlayerEvent>(new PlayerEvent(100, 100));

        setTimeout(() => {
            EventBus.Raise<PlayerEvent>(new PlayerEvent(100, 100));
        }, 3000);
    }

    onDestroy() {
        EventBus.Deregister<PlayerEvent>(this.playerEventBinding);
    }
}


