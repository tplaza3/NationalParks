import { Park } from "../../types/Park";

export class CustomMapMarker extends google.maps.Marker {
  parkData: Park;

  constructor(parkData: Park) {
    super();
    this.parkData = parkData;
  }


}
