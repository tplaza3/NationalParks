import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkDataService } from "../../providers/ParkDataService";

@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: object[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private parkDataService: ParkDataService) {
    parkDataService.getParks().then((parksData) => {

      this.parks = parksData;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

  goParkDetails(parkData): void {
    console.log("park data " + JSON.stringify(parkData));
  }



}
