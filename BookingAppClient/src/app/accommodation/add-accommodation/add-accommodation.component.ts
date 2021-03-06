import { Component, OnInit } from '@angular/core';
import { Accommodation } from "app/accommodation/accommodation.model";
import { Place } from "app/place/place.model";
import { AccommodationType } from "app/accommodation-type/Type.model";
import { AccommodationService } from "app/accommodation/accommodation.service"
import { PlaceService } from "app/place/place.service"
import { TypeServiceService } from "app/accommodation-type/type-service.service";
import { NgForm } from '@angular/forms';
import { Region } from "app/region/region.model";
import { Country }  from "app/country/country.model";
import { CountryService } from "app/country/country.service";
import { RegionService } from "app/region/region.service";
import { LocalEnum } from "app/localEnum.model";
import { Map } from "app/map/angular-map.model";

@Component({
  selector: 'app-add-accommodation',
  templateUrl: './add-accommodation.component.html',
  styleUrls: ['./add-accommodation.component.css'],
  providers: [AccommodationService, TypeServiceService, PlaceService, RegionService, CountryService],
   styles: ['agm-map {height: 300px; width: 500px;}']
})
export class AddAccommodationComponent implements OnInit {

    map: Map;
    file: File;

    Id: number;
    Name: string;
    Description: string;
    Address: string;
    AvrageGrade: number;
    Latitude: number;
    Longitude: number;
    ImageUrl: File;
    Approved: boolean;
    PlaceId: number;
    AccommodationTypeId: number;
    UserId: number;
    Place: Place;
    AccommodationType: AccommodationType;

    Region: Region;
    RegionId: number;
    Country: Country;
    CountryId: number;

    types: AccommodationType[];
    places: Place[];
    countries: Country[];
    regions: Region[];

    lat: number = 45.242268;
    lng: number = 19.842954;
    clickedLat: number;
    clickedLong: number;

  constructor(private accommodationService: AccommodationService, private placeService: PlaceService,
              private countryService: CountryService, private typeService: TypeServiceService,
               private regionService : RegionService) {
                  this.places = [];
                  this.types = [];
                  this.regions = [];
                  this.countries = [];
                  this.map = {} as Map;
             }

  ngOnInit() {

    this.getTypesAndCountries();
    this.Place = null;
    this.Country = null;
    this.Region = null;
    this.AccommodationType = null;
  }

  getTypesAndCountries()
  {
    this.typeService.getAllTypes().subscribe(t => this.types = t.json(), error => 
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
    this.countryService.getAllCountries().subscribe(c => this.countries = c.json(), error =>
    {
        console.log(error), alert("Unsuccessful fetch operation")
    });
  }

  onClick(res: any)
  {
    this.clickedLat = res.coords.lat;
    this.clickedLong = res.coords.lng;
  }

  onSubmit(form: NgForm){
    console.log("usao");
    
    if (this.file == undefined || this.Name == "" || this.Name == undefined || this.Address == undefined || this.Address == "" ||
        this.clickedLat == undefined || this.clickedLong == undefined ||
        this.AccommodationTypeId == undefined)
    {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Some required fields are empty.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
    }
    else
    {                            
              this.accommodationService.addAccommodation(new Accommodation(0, this.Name, this.Description, this.Address, false,
                      "", this.clickedLat, this.clickedLong, this.PlaceId, this.AccommodationTypeId, 
                      parseInt(localStorage.getItem(LocalEnum.Id.toString()))), this.file).subscribe(
          x => 
          {
              var doc = document.getElementById("successMsg");
              doc.innerText = "Accommodation successfully added.";   
              doc.className = "show";
              setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
            },
            error => 
          {
              var doc = document.getElementById("errorMsg");
              doc.innerText = error.json().Message;
              doc.className = "show";
              setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000); 
          }
        ); 
    }

    // this.Name = undefined;
    // this.Address = undefined;
    // this.clickedLat = undefined;
    // this.clickedLong = undefined;
  }

  resetForm()
  {
    this.Name = "";
    this.Description = "";
    this.Address = "";
    this.Latitude = null;
    this.Longitude = null;
    this.ImageUrl = null;
    this.Place = null;
    this.Country = null;
    this.Region = null;
    this.AccommodationType = null;
    this.ImageUrl = null;
    this.Place = null;
    this.Country = null;
    this.Region = null;
    this.AccommodationType = null;
    this.file = null;
  }

   countrySelected()
  {
    this.countryService.getCountryByIdMap(this.CountryId).subscribe(
      c => {
        this.Country = c[0] as Country; 
        this.regions = this.Country.Regions;
      });
  }

  regionSelected()
  {
    this.regionService.getRegionByIdMap(this.RegionId).subscribe(
      r => {
        this.Region = r[0] as Region; 
        this.places = this.Region.Places;
      });
  }

  isSelectedCountry() : boolean
  {
    return this.Country != null;
  }

  isSelectedRegion() : boolean
  {
    return this.Region != null;
  }

  onChange(event: EventTarget) {
      let eventObj: MSInputMethodContext = <MSInputMethodContext> event;
      let target: HTMLInputElement = <HTMLInputElement> eventObj.target;
      let files: FileList = target.files;
      this.file = files[0];
    }
}
