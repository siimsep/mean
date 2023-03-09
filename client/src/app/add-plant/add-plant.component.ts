import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Plant } from "../plant";
import { PlantService } from "../plant.service";

@Component({
  selector: "app-add-plant",
  template: `
    <h2 class="text-center md-5">Add a New Plant</h2>
    <app-plant-form (formSubmitted)="addPlant($event)"></app-plant-form>
  `,
})
export class AddPlantComponent {
  constructor(private router: Router, private plantService: PlantService) {}

  addPlant(plant: Plant) {
    this.plantService.createPlant(plant).subscribe({
      next: () => {
        this.router.navigate(["/plants"]);
      },
      error: (error) => {
        alert("Failed to create plant");
        console.error(error);
      },
    });
  }
}
