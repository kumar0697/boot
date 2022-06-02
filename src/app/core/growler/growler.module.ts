import { CommonModule } from "@angular/common";
import { NgModule, Output, SkipSelf } from "@angular/core";
import { EnsureModuleLoadedOnceGuard } from "../ensure-module-loaded-once.guard";
import { GrowlerComponent } from "./growler.component";
import { GrowlerService } from "./growler.service";

@NgModule({
    imports:[CommonModule],
    declarations:[GrowlerComponent],
    exports:[GrowlerComponent],
    providers:[GrowlerService],
})
export class GrowModule extends EnsureModuleLoadedOnceGuard {


    constructor(@Output() @SkipSelf() parentModule: GrowModule) {
        super(parentModule);
    }
}