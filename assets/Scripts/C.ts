import { _decorator, Component, Node } from 'cc';
import { EventBinding } from "db://assets/EventBus/EventBinding";
import { PlayerEvent } from "db://assets/EventBus/Events";
import { EventBus } from "db://assets/EventBus/EventBus";

const {ccclass, property} = _decorator;

@ccclass('C')
export class C extends Component {
    playerEventBinding: EventBinding<PlayerEvent>;

    onLoad() {
        this.playerEventBinding = new EventBinding(PlayerEvent.name, (event: PlayerEvent) => {
            console.log("Triggered in C!!!");
            console.log(`Health: ${event.health}, mana: ${event.mana}`);
        });

        EventBus.Register<PlayerEvent>(this.playerEventBinding);
    }

    onDestroy() {
        EventBus.Deregister<PlayerEvent>(this.playerEventBinding);
    }
}


