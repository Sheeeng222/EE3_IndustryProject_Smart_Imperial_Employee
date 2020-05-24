import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps,GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { FindValueSubscriber } from 'rxjs/operators/find';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map:any;
  @ViewChild('map') mapRef:ElementRef;
  current: Marker;
  markers: Array<Marker> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get("data");
    this.current = data.current;
    this.markers = data.markers || [];
    console.log('Markers received', data);
    console.log('Current',this.current);
  }

  ionViewDidEnter(){
    //console.log('ionViewDidLoad MapsPage');
    this.displayMap();
  }

  displayMap(){
    const location = new google.maps.LatLng(51.5074,0.1278);
    const options = {
      center:location,
      zoom:10,
      streetViewControl: false,
      mayTypeId:'hybrid'

    };

     this.map = new google.maps.Map(this.mapRef.nativeElement,options);
    // this.map = GoogleMaps.create('map_canvas', mapOptions);
    for(var i=0;i<this.markers.length;i++){
      const mark = new google.maps.LatLng(this.markers[i].lat,this.markers[i].lng);
      this.addMarker(mark,this.map);

    }
  }

  addMarker(position,map){
    return new google.maps.Marker({
      position,
      map
    })
  }

}

export interface Marker {
  lat?: number,
  lng?: number,
  label?: string
}

