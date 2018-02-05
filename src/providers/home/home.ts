import { Http,RequestOptions,Headers,Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
//config
import { AppSettings } from '../../config/config';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

    public apiUrl:string = AppSettings.ApiUrl;

    constructor(public http: Http) {
      console.log('Hello HomeProvider Provider');
    }

    private handleError(error: Response | any) {
	    // console.log(error);
	    var err = JSON.parse(error._body)
	      // return Observable.throw(err);	
	    if (error.status == 401 && err.msg == 'Invalid token') {
	        localStorage.clear();
	    	return Observable.throw(err);
	    }
	    else if (error.status == 401 && err.msg == 'Invalid credentials!') {
	        localStorage.clear();
	        return Observable.throw(err);
	    } else {
	        return Observable.throw(err);
	    }
  	}

    // agent-lists
    agentLists(){
        let header = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
        let option = new RequestOptions({headers:header})
        return this.http.get(this.apiUrl + 'agent-lists',option)
            .map((res:Response)=>res.json())
            .catch(this.handleError)
    }

}
