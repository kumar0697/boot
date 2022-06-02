import { CommonModule } from "@angular/common";
import { NgModule, Output, SkipSelf } from "@angular/core";
import { ModalComponent } from "./modal.component";
import { ModalService } from "./modal.service";

@NgModule({
    imports: [CommonModule],
    exports: [ModalComponent],
    providers: [ModalService],
    declarations: [ModalComponent]
})
export class ModalModule extends EnsureModuleLoadedOnceGuard {
   
    constructor( @Output() @SkipSelf() parentModule : ModalModule) {
        super ( parentModule);
    }
}