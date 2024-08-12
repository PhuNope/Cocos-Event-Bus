export interface IEvent {
}

export class TestEvent implements IEvent {
}

export class PlayerEvent implements IEvent {
    constructor(public health: number, public mana: number) {
    }
}