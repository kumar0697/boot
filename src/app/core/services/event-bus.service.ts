import { Injectable } from "@angular/core";
import { filter, map, Subject, Subscription } from "rxjs";

@Injectable()
export class EventBusService {
    
    
    subject = new Subject<any> ();;

    constructor () { }

    on (event: Events, action: any) : Subscription {
        return this.subject
        .pipe(
            filter ((e :EmitEvent) => {
                return e.name === event;
            }),
            map((e : EmitEvent) => {
                return e.value;
            })
        )
        .subscribe();
    }

    emit(event : EmitEvent) {
        this.subject.next(event);
    }

}

export class EmitEvent {
 
    constructor(public name: any, public value?: any) { }

}

export enum Events {
    httpRequest,
    httpResponse
}
