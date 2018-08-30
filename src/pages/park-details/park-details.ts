import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-park-details',
  templateUrl: 'park-details.html',
})
export class ParkDetailsPage {

  parkInfo: object;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parkInfo = navParams.data.parkData;
    console.log(JSON.stringify(this.parkInfo));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ParkDetailsPage');
  }

}
