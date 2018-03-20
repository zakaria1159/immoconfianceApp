import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; 

//services
import { HomeProvider } from '../../providers/home/home';

//pages
import { DetailsPage } from '../details/details';

declare var google: any;
/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  latLng: any;
  @ViewChild('myElement') myElement: ElementRef;

    public searchCity = '';
    public agentList:any = [];
    public allList:any = [];
    public distance:any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public homeProvider:HomeProvider, public geolocation:Geolocation) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ListPage');
      this.agentLists();
      this.AfficheDistance();
      
    }

    agentLists(){
      this.homeProvider.agentLists()
        .subscribe(res => {
          console.log("res",res);
          this.agentList = res;
          this.allList = res;
          console.log('agentList',this.agentList);
        },(error) => {
          console.log("error",error);
        })
    }

    onDetailsPage(agent){
      var agentDetails = {
        "details":agent
      }
      this.navCtrl.push(DetailsPage,agentDetails);
    }

    // filterItems(event: any){
    //     // this.agentLists();
    //     let val = event.target.value;
    //     console.log("val",val);

    //     if (val && val.trim() !== '') {
    //       this.agentList = this.agentList.filter(function(item) {
    //         console.log("item",item);
    //         return item.city.name.toLowerCase().includes(val.toLowerCase());
    //       });
    //     }
    // }

    filterItems(event){
      
      this.agentList = this.allList;
      let val = event.target.value;

      // if the value is an empty string don't filter the items
      // if (val && val.trim() == '') {
      //   return;
      // }
      if (val && val.trim() !== '') {
        this.agentList = this.agentList.filter((v) => {
          // console.log('v',v);
          if (v.city.name.toLowerCase().indexOf(val.toLowerCase()) > -1) {
              console.log('v.city.name',v.city.name);
              return true;
          }
          return false;
        })
      }

  }

  onCancel(event){
    this.searchCity = '';
  }
   
  deg2rad(deg) {
    return deg * (Math.PI/180)
   }

  distanceCalcule(agentlat,agentlon){
  
    
   this.geolocation.getCurrentPosition().then((resp) => {

          this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

       let mapOptions = {
         center: this.latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

 var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(resp.coords.latitude-agentlat);  // deg2rad below
    var dLon = this.deg2rad(resp.coords.longitude-agentlon); 
  
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(resp.coords.latitude)) * Math.cos(this.deg2rad(agentlat)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;



       }).catch((error) => {
      console.log('Error getting location', error);
    });



   
  }

  AfficheDistance(){
  for (let agent of this.agentList) {
    this.distance = this.distanceCalcule(2,4);
  }
   


  }


}


