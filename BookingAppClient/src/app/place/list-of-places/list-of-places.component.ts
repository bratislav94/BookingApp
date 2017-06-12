import { Component, OnInit } from '@angular/core';
import { PlaceService } from "app/place/place.service";
import { Place } from "app/place/Place.model";

@Component({
  selector: 'app-list-of-places',
  templateUrl: './list-of-places.component.html',
  styleUrls: ['./list-of-places.component.css'],
  providers: [PlaceService]
})
export class ListOfPlacesComponent implements OnInit {

  places: Place[];

  constructor(private placeService : PlaceService) {
    this.places = [];
  }

  ngOnInit() {
    this.placeService.getAllPlaces().subscribe(p => this.places = p.json(), error => 
     {
        console.log(error), alert("Unsuccessful fetch operation")
     });
  }

  deletePlace(place: Place)
  {
    this.placeService.deletePlace(place.Id).subscribe();
    var id = this.places.indexOf(place);
    this.places.splice(id, 1);
  }

}
