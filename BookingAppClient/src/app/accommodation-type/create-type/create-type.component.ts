import { Component, OnInit } from '@angular/core';
import { AccommodationType } from "app/accommodation-type/Type.model";
import { TypeServiceService } from "app/accommodation-type/type-service.service";

@Component({
  selector: 'app-create-type',
  templateUrl: './create-type.component.html',
  styleUrls: ['./create-type.component.css'],
  providers: [TypeServiceService]
})
export class CreateTypeComponent implements OnInit {

  Name: string;
  
  constructor(private service : TypeServiceService ) {}

  ngOnInit() {
  }

  onSubmit(){
    if(this.Name == undefined || this.Name == "")
    {
            var doc = document.getElementById("errorMsg");
            doc.innerText = "Some required fields are empty.";   
            doc.className = "show";
            setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
    }
    else 
    {
           this.service.createType(new AccommodationType(0, this.Name)).subscribe(
            e => 
            {
                    var doc = document.getElementById("successMsg");
                    doc.innerText = "Accommodation type successfully added.";   
                    doc.className = "show";
                    setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);  
            },
            error =>
            {
                    var doc = document.getElementById("errorMsg");
                    doc.innerText = error.json().Message;   
                    doc.className = "show";
                    setTimeout(function(){ doc.className = doc.className.replace("show", ""); }, 3000);
            });
    }
   
    this.Name = undefined;
  }
}
