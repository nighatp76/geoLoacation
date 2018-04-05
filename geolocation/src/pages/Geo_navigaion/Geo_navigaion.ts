import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GeoAutoFinder } from '../../pages/GeoAutoFinder/GeoAutoFinder';
import { Platform } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-Geonavigaion',
  templateUrl: 'Geo_navigaion.html'
})
export class Geonavigaion {


    @ViewChild('map') mapElement: ElementRef;
    map: any;
    start = 'chicago, il';
    end = 'chicago, il';
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
  
    constructor(public navCtrl: NavController, platform: Platform) {

        platform.ready().then(() => {

            platform.registerBackButtonAction(() => {
              this.searchAutoComplete();           
             });
          });

    }
  
    ionViewDidLoad(){
      this.initMap();
    }
  
    initMap() {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
      });
  
      this.directionsDisplay.setMap(this.map);
    }
  
    calculateAndDisplayRoute() {
      this.directionsService.route({
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING'
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    searchAutoComplete(){

        this.navCtrl.setRoot(GeoAutoFinder);

    }
}
