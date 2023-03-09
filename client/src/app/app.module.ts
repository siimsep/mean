import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { PlantsListComponent } from "./plants-list/plants-list.component";
import { PlantFormComponent } from "./plant-form/plant-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { AddPlantComponent } from './add-plant/add-plant.component';
import { EditPlantComponent } from './edit-plant/edit-plant.component';

@NgModule({
  declarations: [AppComponent, PlantsListComponent, PlantFormComponent, AddPlantComponent, EditPlantComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
