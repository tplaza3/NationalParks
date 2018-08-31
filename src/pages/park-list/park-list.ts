import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParkDataService } from "../../providers/ParkDataService";
import { ParkDetailsPage } from "../park-details/park-details";
import { Park } from "../../types/Park";

@Component({
  selector: 'page-park-list',
  templateUrl: 'park-list.html'
})
export class ParkListPage {
  parks: Park[];
  searchQuery: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public parkDataService: ParkDataService) {
    parkDataService.load().then((parksData) => {
      this.parks = parksData;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkListPage');
  }

  goParkDetails(parkData): void {
    console.log("park data " + JSON.stringify(parkData));
    this.navCtrl.push(ParkDetailsPage, {parkData: parkData})
  }


  getParks(event) {

    this.parkDataService.load().then((parksData) => {
      this.parks = parksData;
    });

    let queryString = event.target.value;

    console.log(queryString);
    if (queryString !== undefined) {

      if (queryString.trim() == '') {
        return;
      }

      this.parkDataService.getFilteredParks(queryString).then((parkResults) => {
        this.parks = parkResults;
      });

    }

    console.log("get parks count: " + this.parks.length);
  }

  resetList(event) {
    this.parkDataService.load().then((parksData) => {
      this.parks = parksData;
    });
  }

}
