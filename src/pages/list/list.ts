import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//services
import { HomeProvider } from '../../providers/home/home';

//pages
import { DetailsPage } from '../details/details';

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

    public searchCity = '';
    public agentList:any = [];
    public allList:any = [];

    constructor(public navCtrl: NavController, public navParams: NavParams, public homeProvider:HomeProvider) {
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ListPage');
      this.agentLists();
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


}
