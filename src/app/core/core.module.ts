import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule, Output, SkipSelf } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EnsureModuleLoadedOnceGuard } from "./ensure-module-loaded-once.guard";
import { GrowModule } from "./growler/growler.module";
import { AuthInterceptor } from "./interceptors/auth.interceptors";
import { ModalModule } from "./modal/modal.module";
import { NavbarComponent } from "./navbar/navbar.component";
import { OverlayModule } from "./overlay/overlay.module";
import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { DialogService } from "./services/dialog.service";
import { EventBusService } from "./services/event-bus.service";
import { FilterService } from "./services/filter.service";
import { SorterService } from "./services/sorter.service";
import { TrackByService } from "./services/trackby.service";

@NgModule({

    imports: [CommonModule,RouterModule,HttpClientModule,GrowModule,ModalModule,OverlayModule],
    exports : [NavbarComponent,RouterModule,HttpClientModule,GrowModule,ModalModule,OverlayModule],
    declarations: [NavbarComponent],
    providers: [ SorterService, FilterService, DataService, TrackByService,
        DialogService, AuthService, EventBusService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass : AuthInterceptor,
            multi : true,
        },
        {
            provide: 'Window', useFactory : () => window }
    ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {

    constructor( @Output() @SkipSelf() parentModule: CoreModule) {
        super( parentModule);
    }
} 