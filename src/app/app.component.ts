import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AboutPage } from '../pages/about/about';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  // rootPage:any = HomePage;
  rootPage:any = TabsPage;

  pages: Array<{title: string, icon: string, component: any}>;
  pushPages: Array<{title: string, icon: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public menu: MenuController,
    public app: App,) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.pages = [
      { title: 'Home', icon: 'home', component: TabsPage },
      { title: 'Forms', icon: 'create', component: TabsPage },
      { title: 'Functionalities', icon: 'code', component: TabsPage }
    ];

    this.pushPages = [
      { title: 'Layouts', icon: 'grid', component: TabsPage },
      { title: 'Settings', icon: 'settings', component: TabsPage }
    ];
  }

goToAbout(params){
    if (!params) params = {};
    this.navCtrl.setRoot(AboutPage);
}
goToHome(params){
  if (!params) params = {};
  this.navCtrl.setRoot(TabsPage);

}

openPage(page) {
  // close the menu when clicking a link from the menu
  this.menu.close();
  // navigate to the new page if it is not the current page
  this.navCtrl.setRoot(page.component);
}

pushPage(page) {
  // close the menu when clicking a link from the menu
  this.menu.close();
  // rootNav is now deprecated (since beta 11) (https://forum.ionicframework.com/t/cant-access-rootnav-after-upgrade-to-beta-11/59889)
  this.app.getRootNav().push(page.component);
}

goToContact(params){
 if (!params) params = {};
  

}}

