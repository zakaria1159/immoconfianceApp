import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; 

//pages
import { DetailsPage } from '../details/details';

//services
import { HomeProvider } from '../../providers/home/home';

declare var google: any;


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  latLng: any;
    @ViewChild('map') mapElement: ElementRef;
    
    public map: any;
    public agentList:any = [];
    constructor(public navCtrl: NavController, public homeProvider:HomeProvider, public geolocation:Geolocation) {
      this.latLng = new google.maps.LatLng(33.0398851,-6.6339503);
        
    }

    ionViewDidLoad() {
        this.loadMap();
    }

    loadMap(){
        let latLng = new google.maps.LatLng(33.0398851,-6.6339503);
        let mapOptions = {
          center: latLng,
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.agentLists();
    }

     getLocation(){

        this.geolocation.getCurrentPosition().then((resp) => {

          this.latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

       let mapOptions = {
         center: this.latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }

       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        let marker = new google.maps.Marker({
         map: this.map,
         animation: google.maps.Animation.DROP,
         position: this.latLng
       });
        marker.setMap(this.map);
   //   this.map.setCenter(this.latLng);
      this.agentLists();
    
     


      

       let content = "<h4>Current Location</h4>";
        

      // this.addInfoWindow(marker, content);



    }).catch((error) => {
      console.log('Error getting location', error);
    });


  }

    agentLists(){
        console.log("agentLists")
        this.homeProvider.agentLists()
          .subscribe(res => {
            console.log("res",res);
            this.agentList = res;
            console.log('agentList',this.agentList);
            this.loadMarkers(this.agentList);
          },(error) => {
            console.log("error",error);
          })
    }


    loadMarkers(markers){
        console.log('markers',markers);
        var map = this.map;
        var bounds = new google.maps.LatLngBounds();
        var mapOptions = { mapTypeId: 'roadmap' };
        var infoWindow = new google.maps.InfoWindow(), marker, i;
        for(i = 0; i < markers.length; i++ ) {
            if(markers[i].lat != "" || markers[i].lon != ""){
            var position = new google.maps.LatLng(markers[i].lat, markers[i].lon);

         //   bounds.extend(position);
            var icon = {
              path: "M27.648-41.399q0-3.816-2.7-6.516t-6.516-2.7-6.516 2.7-2.7 6.516 2.7 6.516 6.516 2.7 6.516-2.7 2.7-6.516zm9.216 0q0 3.924-1.188 6.444l-13.104 27.864q-.576 1.188-1.71 1.872t-2.43.684-2.43-.684-1.674-1.872l-13.14-27.864q-1.188-2.52-1.188-6.444 0-7.632 5.4-13.032t13.032-5.4 13.032 5.4 5.4 13.032z",
              fillColor: markers[i].color,
              fillOpacity: 1,
              strokeWeight: 0,
            }
            var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
            marker = new google.maps.Marker({
                position: position,
                map: map,
                title: "ImmoConfiance",
                icon: iconBase + 'info-i_maps.png',
                details:markers[i]
            })

            google.maps.event.addListener(marker, 'click', ((marker, i)=> {
              return ()=> {
                  // console.log(marker)
                  var agentDetails = {
                      "details":marker.details
                  }
                  this.navCtrl.push(DetailsPage,agentDetails)
              }
            })(marker, i));
              
             map.setCenter(33.9427466,6.8737259);
          //   map.fitBounds(bounds);



         
            //map.panToBounds(bounds);
        }
        var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
            
            google.maps.event.removeListener(boundsListener);
        });
      }
    }

}
