import { Injectable } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccommodationType } from "app/accommodation-type/Type.model";
import 'rxjs/Rx';
import { DynamicUrl } from "app/DynamicUrl.model";
@Injectable()
export class TypeServiceService {

  constructor(private http : Http) { }

  createType(type : AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.post(DynamicUrl.socket + 'accommodationType/Create', type, opts);
    }

    getAllTypes() : Observable<any> {
        return this.http.get(DynamicUrl.socket + `accommodationType/ReadAll`);
    }

    getTypeById(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `accommodationType/Read/${id}`);
    }

    getTypeByIdMap(id : number) : Observable<any> {
        return this.http.get(DynamicUrl.socket + `accommodationType/Read/${id}`).map(r => r.json());
    }

    deleteType(id : number) : Observable<any> {
        return this.http.delete(DynamicUrl.socket + `accommodationType/Delete/${id}`);
    }

    editCountry(type: AccommodationType) : Observable<any> {
        let header = new Headers();
        header.append('Content-type', 'application/json');

        let opts = new RequestOptions();
        opts.headers = header;

        return this.http.put(DynamicUrl.socket + `accommodationType/Change`, type, opts);
    }
}
