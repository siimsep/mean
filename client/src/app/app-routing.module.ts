import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlantsListComponent } from "./plants-list/plants-list.component";
import { AddPlantComponent } from "./add-plant/add-plant.component";
import { EditPlantComponent } from "./edit-plant/edit-plant.component";

const routes: Routes = [
  { path: "", redirectTo: "plants", pathMatch: "full" },
  { path: "plants", component: PlantsListComponent },
  { path: "plants/new", component: AddPlantComponent },
  { path: "plants/edit/:id", component: EditPlantComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
