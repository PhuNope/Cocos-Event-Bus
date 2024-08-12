import { _decorator, Component } from 'cc';
import { EventBinding } from "db://assets/EventBus/EventBinding";
import { PlayerEvent } from "db://assets/EventBus/Events";
import { EventBus } from "db://assets/EventBus/EventBus";

const {ccclass, property} = _decorator;

@ccclass('A')
export class A extends Component {
    playerEventBinding: EventBinding<PlayerEvent>;

    onLoad() {
        this.playerEventBinding = new EventBinding<PlayerEvent>((event: PlayerEvent) => {
            console.log("Triggered in A!!!");
            console.log(`Health: ${event.health}, mana: ${event.mana}`);
        });

        EventBus.Register(this.playerEventBinding);
    }

    start() {
        setTimeout(() => {
            this.node.destroy();
        }, 2000);
    }

    onDestroy() {
        EventBus.Deregister(this.playerEventBinding);
    }
}


