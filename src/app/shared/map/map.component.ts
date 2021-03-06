import { AfterContentInit, ChangeDetectionStrategy, Component, ContentChildren, ElementRef, Input,  OnInit, QueryList, ViewChild } from "@angular/core";
import { title } from "process";
import { debounceTime } from "rxjs";
import { IMapDataPoint } from "../interfaces";
import { MapPointComponent } from "./map-point.component";

@Component({
    selector: 'app-map',
    template: ` <div #mapContainer [style.height]="mapHeight" [style.width]="mapWidth">Map Loading.....</div> `,

    changeDetection : ChangeDetectionStrategy.OnPush
})
export class MapComponent implements OnInit, AfterContentInit {

    private isEnabled: boolean = false;
    private loadingScript: boolean = false;
    private map: google.maps.Map = {} as google.maps.Map;
    private markers: google.maps.Marker[] = [];
    mapHeight: string | null = null;
    mapWidth: string | null = null;


    @Input() height: number = 0;
    @Input() width: number = 0;
    @Input() latitude = 34.5133;
    @Input() longitude = 94.1629;
    @Input() markerText = 'Your Location';
    @Input() zoom = 8;

    private _dataPoints: IMapDataPoint[] = [];
    @Input() public get dataPoints() {
        return this._dataPoints as IMapDataPoint[];
    }

    public set dataPoints(value: any[]) {
        this._dataPoints = value;
        this.renderMapPoints();
    }

    @Input() get enabled(): boolean {
        return this.isEnabled;
    }

    set enabled(isEnabled: boolean) {
        this.isEnabled = isEnabled;
        this.init();
    }

    @ViewChild('mapContainer', { static: true }) mapDiv: ElementRef = {} as ElementRef;
    @ContentChildren(MapPointComponent) mapPoints: QueryList<MapPointComponent> = {} as QueryList<MapPointComponent>;


    constructor() { }




    ngOnInit() {
        if (this.latitude && this.longitude) {
            if (this.mapHeight && this.mapWidth) {
                this.mapHeight = this.height + 'px';
                this.mapWidth = this.width + 'px';
            } else {
                const hw = this.getWindowHeightWidth(this.mapDiv.nativeElement.ownerDocument);
                this.mapHeight = hw.height / 2 + 'px';
                this.mapWidth = hw.width + 'px';
            }
        }

    }


    ngAfterContentInit() {
        this.mapPoints.changes
            .pipe(
                debounceTime(500)
            )
            .subscribe(() => {
                if (this.enabled) {
                    this.renderMapPoints();
                }
            });
    }

    init() {

        setTimeout(() => {
            this.ensureScript();
        }, 200)
    }

    private getWindowHeightWidth(document: Document) {
        let width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;

        const height = window.innerHeight
            || document.documentElement.clientHeight
            || document.body.clientHeight;

        if (width > 900) { width = 900 }
        return { height: height, width: width }


    }

    private ensureScript() {
        this.loadingScript = true;
        const document = this.mapDiv.nativeElement.ownerDocument;
        const script = <HTMLScriptElement>document.querySelector('script[id = "googlemaps"]');
        if (script) {
            if (this.isEnabled) { this.renderMap(); }
        } else {
            const mapsScript = document.createElement('script');
            mapsScript.id = 'googlemaps';
            mapsScript.type = 'text/javascript';
            mapsScript.async = true;
            mapsScript.defer = true;
            mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCG1KDldeF_2GzaTXrEHR0l6cyCS7AnmBw'
            mapsScript.onload = () => {
                this.loadingScript = false;
                if (this.isEnabled) { this.renderMap(); }
            };
            document.body.appendChild(mapsScript);
        }
    }

    private renderMap() {
        const latlng = this.createLatLong(this.latitude, this.longitude) as google.maps.LatLng
        const options = {
            zoom: this.zoom,
            center: latlng,
            mapTypeControl: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        } as google.maps.MapOptions;

        this.map = new google.maps.Map(this.mapDiv.nativeElement, options);

        if ((this.mapPoints && this.mapPoints.length) || (this.dataPoints && this.dataPoints.length)) {
            this.renderMapPoints();
        } else {
            this.createMarker(latlng, this.markerText);
        }
    }

    private createLatLong(latitude: number,
        longitude: number) {
        return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
    }

    private renderMapPoints () {
        if (this.map && this.isEnabled) {
            this.clearMapPoints();
        }
    }

    const mapPoints = (this.mapPoints && this.mapPoints.length) ? this.mapPoints : this.dataPoints;


    if(mapPoints) {
        for(const point of mapPoints) {
            let markerText = ( point.markerText) ? point.markerText: `<h3>${point.firstName}${point.lastName}</h3>`;
            const mapPointLatlng = this.createLatLong(point.latitude , point.longitude) as google.maps.LatLng;
            this.createMarker(mapPointLatlng, markerText);
        }
    }

    private clearMapPoints() {
        this.markers.forEach((marker: google.maps.Marker) => {
            marker.setMap(null);
        });
        this.markers = [];
    }

    const marker = new google.maps.marker({
        position: position,
        map: this.map,
        title: title,
        animation: google.maps.Animation.DROP
    });

    this.markers.push(marker);

    marker.addListener('click' , () => {
        info.window.open(this.map, marker);
    });
}

