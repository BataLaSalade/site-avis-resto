import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MatButtonModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListRestaurantsComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule, MatButtonModule, AgmCoreModule.forRoot({
      apiKey:'AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
