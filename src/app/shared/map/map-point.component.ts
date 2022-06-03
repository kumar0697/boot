import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: 'app-map-point',
    template:``
})
export class MapPointComponent implements OnInit {
   
    @Input() longitude : number = 0 ;
    @Input() latitude : number = 0 ;
    @Input() markerText : string = '' ;
    
    
    constructor() { }

    ngOnInit(): void {
        
    }

}