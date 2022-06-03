import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MapPointComponent } from "./map-point.component";
import { MapComponent } from "./map.component";

@NgModule({
    imports: [CommonModule],
    exports: [MapComponent,MapPointComponent],
    declarations: [MapComponent,MapPointComponent]
})
export class MapModule { }