export class BaseEvent<T> {
    entityName: string;
    data: T;
    userId: string;
    eventName: string;

    constructor(entityName: string, eventName : string, userId: string, data: T, ) {
        this.entityName = entityName,
        this.eventName = eventName,
        this.data = data,
        this.userId = userId
    }
}