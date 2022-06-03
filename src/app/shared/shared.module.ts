import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { SortByDirective } from "./directives/sortby.directive";
import { FilterTextboxModule } from "./filter-textbox/filter-textbox.module";
import { PaginationModule } from "./pagination/pagination.module";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import { TrimPipe } from "./pipes/trim.pipe";

@NgModule ({
    imports : [CommonModule,FilterTextboxModule,PaginationModule],
    exports: [CommonModule,FormsModule,CapitalizePipe,TrimPipe,SortByDirective,FilterTextboxModule,PaginationModule],
    declarations: [TrimPipe,CapitalizePipe,SortByDirective],

})
export class SharedModule { }