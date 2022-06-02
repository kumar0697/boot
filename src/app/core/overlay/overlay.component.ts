import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { EventBusService, Events } from "../services/event-bus.service";

@Component({
    selector: '',
    templateUrl: './overlay.component.html',
    styleUrls: ['./overlay.component.sass']
})

export class OverlayComponent implements OnInit, OnDestroy{

    httpReqquestSub : Subscription = { } as Subscription;
    httpResponseSub : Subscription = { } as Subscription;
    enabled = false;
    queue : any[] = [];
    timerId : number = 0;
    timerHideId : number = 0;

    @Input() delay = 500;

    constructor(private eventBus : EventBusService) { }

    ngOnInit(): void {
        this.httpReqquestSub = this.eventBus.on(Events.httpRequest, (() => {
            this.queue.push({});
            if(this.queue.length === 1) {
                setTimeout(() => {
                    if( this.queue.length) { this.enabled = true;}
                }, this.delay)
            }
        }));

        this.httpResponseSub = this.eventBus.on(Events.httpResponse, (() => {
            this.queue.pop();
            if (this.queue.length === 0) {
                setTimeout (() => {
                    this.enabled = false;
                },this.delay)
            }
        }));
    }

    ngOnDestroy(): void {
        this.httpReqquestSub.unsubscribe();
        this.httpResponseSub.unsubscribe();
    }

 }