import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Park } from "../../types/Park";
import { ParkDataService } from "../../providers/ParkDataService";
import {CustomMapMarker} from "./CustomMapMarker";
import {ParkDetailsPage} from "../park-details/park-details";

@Component({
  selector: 'page-park-map',
  templateUrl: 'park-map.html'
})
export class ParkMapPage {
  map: google.maps.Map;
  parks: Park[];

  constructor(public navCtrl: NavController, public platform: Platform, private parkService: ParkDataService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkMapPage');
    this.platform.ready().then(() => {
      this.initializeMap();
    }).catch((e) =>{
      console.log(e);
    });
  }

  initializeMap() {
    let minZoomLevel = 3;
    let image = 'assets/img/nps_arrowhead.png';

    this.map = new google.maps.Map(document.getElementById('mapCanvas'), {
      zoom: minZoomLevel,
      center: new google.maps.LatLng(39.833, -98.583),
      mapTypeControl: false,
      streetViewControl: false,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });


    this.parkService.getParks().then((parkData) => {
      this.parks = parkData;

      for (let park of this.parks) {
        let parkPos:google.maps.LatLng = new google.maps.LatLng(park.lat, park.long);
        let parkMarker:google.maps.Marker = new CustomMapMarker(park);

        parkMarker.setPosition(parkPos);
        parkMarker.setMap(this.map);
        parkMarker.setIcon(image);

        google.maps.event.addListener(parkMarker, 'click', () => {
          let selectedMarker:any = parkMarker;

          this.navCtrl.push(ParkDetailsPage, {
            parkData: selectedMarker.parkData
          });
        });

        // new google.maps.Marker({
        //   position: {lat: park.lat, lng: park.long},
        //   map: this.map,
        //   icon: image
        // });



      }

    });


  }
}
