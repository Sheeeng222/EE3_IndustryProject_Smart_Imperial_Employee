import { Geoposition } from '@ionic-native/geolocation';
//import { LaunchNavigator, LaunchNavigatorOptions } from './../../../plugins/uk.co.workingedge.phonegap.plugin.launchnavigator/uk.co.workingedge.phonegap.plugin.launchnavigator.d';
import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GoogleMaps,GoogleMap, GoogleMapOptions } from '@ionic-native/google-maps';
import { FindValueSubscriber } from 'rxjs/operators/find';
import { InfoWindowManager } from '@agm/core';
import { Store } from '@ngrx/store';
import { LaunchNavigator } from '@ionic-native/launch-navigator';

declare var google:any;

@IonicPage({
  defaultHistory:['HomePage']
})
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  map:any;
  // position:string;
  site:any;
  @ViewChild('map') mapRef:ElementRef;
  markers: Array<Marker> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public store: Store<any>,
    public LaunchNavigator: LaunchNavigator,
    public _ngZone:NgZone
    ) {

    this.store.select('appReducer').subscribe(state => {
      this.markers = state.map_info
    });

  }

  ionViewDidEnter(){
    //console.log('ionViewDidLoad MapsPage');
    this.displayMap();
  }

  displayMap(){
    var position;
    const location = new google.maps.LatLng(51.5074,0.1278);
    const options = {
      center:location,
      zoom:10,
      streetViewControl: false,
      mayTypeId:'hybrid'
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement,options);

    var infowindow = new google.maps.InfoWindow();

    for(var i=0;i<this.markers.length;i++){
      var contentstring = '<h4><b>Charging Information</b></h4>' + '<p><b>Slow Connectors</b>: ' + this.markers[i].slow +
      '    <b>Available</b>: ' + this.markers[i].slowA +'</p>'
      +'<p><b>Fast Connectors</b>: ' + this.markers[i].fast +
      '    <b>Available</b>: ' + this.markers[i].fastA +'</p>'
      +'<p><b>Rapid Connectors</b>: ' + this.markers[i].rapid +
      '    <b>Available</b>: ' + this.markers[i].rapidA +'</p>'+
      '<button id = "tap">Navigate to here</button>';


      const mark = new google.maps.LatLng(this.markers[i].lat,this.markers[i].lng);
      // if(i==1){console.log(marker.getPosition());}


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
      // let s = this.markers[i].lat + "," + this.markers[i].lng;

      google.maps.event.addListener(marker, 'click', function(){
        position = this.position.lat()+','+this.position.lng();
        infowindow.setContent(this.info);
        infowindow.open(this.map,this);
      })

      google.maps.event.addListener(infowindow, 'domready', () => {
        document.getElementById('tap').addEventListener('click', () => {
          // alert(this.position);
          this.navigate(position);
        });
      });
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

  navigate(i){
    // console.log("navigate: ",this.site);
    this.LaunchNavigator.navigate(i, {
      start:"51.496969,0.107444"
    }).then(
          success => alert('Launched navigator'),
          error => alert('Error launching navigator: ' + error)
    );
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


