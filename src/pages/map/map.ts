//import { LaunchNavigator, LaunchNavigatorOptions } from './../../../plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/uk.co.workingedge.phonegap.plugin.launchnavigator.d';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps,GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { FindValueSubscriber } from 'rxjs/operators/find';
import { InfoWindowManager } from '@agm/core';
// import { LaunchNavigator, LaunchNavigatorOptions} from '@ionic-native/launch-navigator';
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
  markers: Array<Marker> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private launchNavigator: LaunchNavigator
    ) {
    let data = this.navParams.get("data");
    // this.current = data.current;
    this.markers = data.markers || [];
    console.log('Markers received', data);
  }
  navMap(address){
    // this.launchNavigator.navigate(address);
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
      var contentstring = '<h2><b>Charging Information</b></h2>' + '<p><b>Slow Connectors</b>: ' + this.markers[i].slow +
      '    <b>Available</b>: ' + this.markers[i].slowA +'</p>'
      +'<p><b>Fast Connectors</b>: ' + this.markers[i].fast +
      '    <b>Available</b>: ' + this.markers[i].fastA +'</p>'
      +'<p><b>Rapid Connectors</b>: ' + this.markers[i].rapid +
      '    <b>Available</b>: ' + this.markers[i].rapidA +'</p>';

      const mark = new google.maps.LatLng(this.markers[i].lat,this.markers[i].lng);
      var infowindow = new google.maps.InfoWindow({
        content: contentstring,
      })

      var colour;
      if(this.markers[i].slow!=this.markers[i].slowA||
        this.markers[i].fast!=this.markers[i].fastA||
        this.markers[i].rapid!=this.markers[i].rapidA){
        colour = "blue";
      }
      else{
        colour = "green";
      }

      var marker = this.addMarker(mark,this.map,contentstring,colour);
      google.maps.event.addListener(marker, 'click', function(){

        infowindow.setContent(this.info);
        infowindow.open(this.map, this);
      })

    }
  }

  addMarker(position,map,content,colour){
    let url = "http://maps.google.com/mapfiles/ms/icons/";
    url += colour + "-dot.png";

    return new google.maps.Marker({
      position,
      map,
      info: content,
      icon: url
    })
  }

}

export interface Marker {
  lat?: number,
  lng?: number,
  slow?: number,
  fast?: number,
  rapid?: number,
  slowA?: number,
  fastA?: number,
  rapidA?: number,
}

