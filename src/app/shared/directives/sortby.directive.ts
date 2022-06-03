import { Directive, EventEmitter, HostListener, Input, Output } from "@angular/core";

@Directive ({
    selector: '[appSortBy]'
})
export class SortByDirective {
    private sortProperty : string = '';

    @Output () 
    sorted : EventEmitter<string> = new EventEmitter<string>();


    constructor () { }

    @Input('appSortBy')
    set sortBy(value : string) {
        this.sortProperty =value;
    }

    @HostListener('click', ['$event'])
    onClick(e: Event) {
        e.preventDefault();
        this.sorted.next(this.sortProperty);
    }
}