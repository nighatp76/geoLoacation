import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Geonavigaion } from '../../pages/Geo_navigaion/Geo_navigaion';
import { Platform } from 'ionic-angular';

declare var google;
declare var $;
@Component({
  selector: 'page-GeoAutoFinder',
  templateUrl: 'GeoAutoFinder.html'
})
export class GeoAutoFinder {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  public currentLocation;
  public currentlatitude;
  public currentlongitude;
  constructor(public navCtrl: NavController,private geolocation: Geolocation, platform: Platform) {

    platform.ready().then(() => {
      
                  platform.registerBackButtonAction(() => {
                    navigator['app'].exitApp();           
                   });
                });
  }

  // ionViewDidLoad(){
  //   this.initMap();
  // }

  ionViewDidLoad() {
    setTimeout(this.initMap.bind(this), 1000);
  }

  initMap() {
    
      this.geolocation.getCurrentPosition().then((position) => {
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.currentlatitude= position.coords.latitude;
        this.currentlongitude = position.coords.longitude
        console.log(this.currentlatitude);
        var geocoder = geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'latLng': latLng }, function (results, status) {
          console.log(results)
          console.log(status)
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              this.currentLocation=results[0].formatted_address;
             // $('#pac-input').val(this.currentLocation);
              // localStorage.setItem('setCurrent_location',this.currentLocation);
                console.log(this.currentLocation);
            }
          }
        });
      });
    var map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -33.8688, lng: 151.2195},
      zoom: 13
    });

    var input = document.getElementById('pac-input');

    var autocomplete = new google.maps.places.Autocomplete( input, {placeIdOnly: true});
    autocomplete.bindTo('bounds', map);

    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var geocoder = new google.maps.Geocoder;
    var marker = new google.maps.Marker({
      map: map
    });
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      var place = autocomplete.getPlace();

      if (!place.place_id) {
        return;
      }
      geocoder.geocode({'placeId': place.place_id}, function(results, status) {

        if (status !== 'OK') {
          window.alert('Geocoder failed due to: ' + status);
          return;
        }
        map.setZoom(11);
        map.setCenter(results[0].geometry.location);
        // Set the position of the marker using the place ID and location.
        marker.setPlace({
          placeId: place.place_id,
          location: results[0].geometry.location
        });
        marker.setVisible(true);
        infowindowContent.children['place-name'].textContent = place.name;
        infowindowContent.children['place-id'].textContent = place.place_id;
        infowindowContent.children['place-address'].textContent =
            results[0].formatted_address;
        infowindow.open(map, marker);
      });
    });


  }

       getRoute(){
    
            this.navCtrl.setRoot(Geonavigaion);
    
        }



}
