import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { DetailsComponent } from './details/details.component';
import { MapSidebarComponent } from './map-sidebar/map-sidebar.component';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    MapSidebarComponent,
    ListRestaurantsComponent,
    DetailsComponent,
    ReviewDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    //AgmCoreModule.forRoot({apiKey:'AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM'})
  ],
  entryComponents: [
    ReviewDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
