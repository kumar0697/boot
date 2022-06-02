import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { ImplicitReceiver } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { catchError, Observable, of, tap } from "rxjs";
import { EmitEvent, EventBusService, Events } from "../services/event-bus.service";

@Injectable()
export class OverlayRequestResponseInterceptor implements HttpInterceptor {


    constructor(private eventBus: EventBusService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const randomTime = this.getRandomIntInclusive(0, 1500);
        const started = Date.now();
        this.eventBus.emit(new EmitEvent(Events.httpResponse));
        return next
            .handle(req)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        const elapsed = Date.now();
                        this.eventBus.emit(new EmitEvent(Events.httpResponse));
                    }
                }),
                catchError(err => {
                    this.eventBus.emit(new EmitEvent(Events.httpResponse));
                    return of({}) as Observable<HttpEvent<any>>;
                })
            );
    }

    getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random()) * (max - min + 1);
    }
}