import { Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ParkDataService {
  data: any = null;

  constructor(public httpClient: HttpClient) {

  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise((resolve, reject) => {
      this.httpClient.get('/assets/data/data.json')
        .subscribe((data: any) => {
          this.data = data;
            console.log(JSON.stringify(this.data));
            resolve(this.data)
          } , (error: any) => {
            console.log(error);
            reject(error);
          });
    });
  }

  getFilteredParks(queryString: string) {

    return this.load().then((parks) =>{
      let filteredParks: any = [];

      for (let park of parks) {
        if (park.name.toLowerCase().indexOf(queryString.toLowerCase()) > -1) {
          console.log("park pushed");
          filteredParks.push(park);
        }
      }

      return filteredParks;
    });

    // getParks(): any {
    //   return this.load().then((parkData) => {
    //     return parkData;
    //   }).catch((e) => {
    //     console.log(e);
    //   });
    // }

  }
}
