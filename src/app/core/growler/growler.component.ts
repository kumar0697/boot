import { Component, Input, OnInit } from "@angular/core";
import { LoggerService } from "../services/logger.service";
import { GrowlerMessageType, GrowlerService } from "./growler.service";

@Component({
    selector: 'app-growler',
    template: `
    <div [ngClass]="position" class="growler" >
      <div *ngFor=" let growl of growls" [ngClass]= "{active: growl.enabled}"
        class="growl alert {{ growl.messageType}}">
        <span class="growl-message">{{growl.message}}</span>
      </div>
    </div>
      `,
    styleUrls:['growler.component.sass']
})
export class GrowlerComponent implements OnInit {

    private growlCount = 0;
    growls : Growl[] = [];

    @Input() position = 'bottom- right';
    @Input() timeOut = 3000;

    constructor(
        private growlerService : GrowlerService,
        private logger: LoggerService) {
        growlerService.growl = this.growl.bind(this);
    }

    ngOnInit () {}

    growl (message: string, growlType: GrowlerMessageType):number {
        this.growlCount++;
        const bootstrapAlertType = GrowlerMessageType[growlType].toLowerCase();
        const messageType = `alert - ${ bootstrapAlertType}`;

        const growl = new Growl (this.growlCount, message, messageType, this.timeOut, this);
        this.growls.push(growl);
        return growl.id;
    }

    removeGrowl(id : number) {
        this.growls.forEach((growl: Growl, index: number) => {
            if(growl.id === id) {
                this.growls.splice(index,1);
                this.growlCount--;
                this.logger.log('removed' + id);
            }
        });
    }
}

class Growl {
    enabled : boolean = false;
    timeoutId: number = 0;

    constructor(public id : number,
                public message: string,
                public messageType:string,
                private timeout : number,
                private growlerContainer : GrowlerComponent ) {
                    this.show();
                }

                show () {
                    window.setTimeout(() => {
                        this.enabled = true ;
                        this.setTimeOut();
                    },0);
                }

                setTimeOut(){
                window.setTimeout(() => {
                    this.hide();
                }, this.timeout);
            }

            hide() {
                this.enabled = false;
                window.setTimeout(() => {
                    this.growlerContainer.removeGrowl(this.id);
                }, this.timeout);
            }
}