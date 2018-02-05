import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { DetailsPageModule } from '../pages/details/details.module';
import { HomePageModule } from '../pages/home/home.module';
import { TabsPageModule } from '../pages/tabs/tabs.module';
import { ListPageModule } from '../pages/list/list.module';
import { MyApp } from './app.component';
import {AboutPage} from '../pages/about/about';

//pages
// import { HomePage } from '../pages/home/home';
// import { TabsPage } from '../pages/tabs/tabs';
// import { ListPage } from '../pages/list/list';
// import { DetailsPage } from '../pages/details/details';

//services
import { HomeProvider } from '../providers/home/home';

import { Geolocation } from '@ionic-native/geolocation'; 

@NgModule({
  declarations: [
    MyApp,
    AboutPage
    // TabsPage,
    // ListPage,
    // DetailsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    DetailsPageModule,
    HomePageModule,
    TabsPageModule,
    ListPageModule,
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'bottom',
        platforms: {
          android: {
            tabsPlacement: 'top'
          },
          ios: {
            tabsPlacement: 'top'
          }
        }
      })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage
    // TabsPage,
    // ListPage,
    // DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeProvider,
    Geolocation
  ]
})
export class AppModule {}
