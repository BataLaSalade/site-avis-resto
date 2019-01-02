import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ListRestaurantsComponent } from './list-restaurants/list-restaurants.component';
import { DetailsComponent } from './details/details.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ListRestaurantsComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({apiKey:'AIzaSyDAwcZjZjN-laVyfAhmfdH9vr6MyQWzWqM'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
