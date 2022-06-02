import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Output, SkipSelf } from "@angular/core";
import { OverlayRequestResponseInterceptor } from "./overlay-request-response.interceptor";
import { OverlayComponent } from "./overlay.component";

@NgModule({
    imports: [CommonModule],
    exports: [OverlayComponent],
    declarations: [OverlayComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: OverlayRequestResponseInterceptor,
            multi : true,
        }
    ],
})
export class OverlayModule extends EnsureModuleLoadedOnceGuard {

    constructor(@Output() @SkipSelf() parentModule: OverlayModule) {
        super(parentModule);
    }
}