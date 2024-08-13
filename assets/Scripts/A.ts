import { _decorator, Component } from 'cc';
import { EventBinding } from "db://assets/EventBus/EventBinding";
import { PlayerEvent, TestEvent } from "db://assets/EventBus/Events";
import { EventBus } from "db://assets/EventBus/EventBus";

const {ccclass, property} = _decorator;

@ccclass('A')
export class A extends Component {
    playerEventBinding: EventBinding<PlayerEvent>;
    testEventBinding: EventBinding<TestEvent>;

    onLoad() {
        this.playerEventBinding = new EventBinding(PlayerEvent.name, this.HandlePlayerEvent.bind(this));

        this.testEventBinding = new EventBinding(TestEvent.name, () => {
            console.log("Test Event Triggered in A");
        });

        EventBus.Register<PlayerEvent>(this.playerEventBinding);
        EventBus.Register<TestEvent>(this.testEventBinding);
    }

    private HandlePlayerEvent(event: PlayerEvent) {
        console.log(`Triggered in ${this.name}!!!`);
        console.log(`Health: ${event.health}, mana: ${event.mana}`);
    }

    start() {
        setTimeout(() => {
            this.node.destroy();
        }, 2000);
    }

    onDestroy() {
        EventBus.Deregister(this.playerEventBinding);
        EventBus.Deregister(this.testEventBinding);
    }
}


