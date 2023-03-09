import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Plant } from "../plant";
import { PlantService } from "../plant.service";

@Component({
  selector: "app-edit-plant.component.ts",
  template: `
    <h2 class="text-center m-5">Edit a Plant</h2>
    <app-plant-form
      [initialState]="plant"
      (formSubmitted)="editPlant($event)"
    ></app-plant-form>
  `,
})
export class EditPlantComponent implements OnInit {
  plant: BehaviorSubject<Plant> = new BehaviorSubject({});

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private plantService: PlantService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      alert("No id provided");
    }
    this.plantService.getPlant(id!).subscribe((plant) => {
      this.plant.next(plant);
    });
  }

  editPlant(plant: Plant) {
    this.plantService.updatePlant(this.plant.value._id || "", plant).subscribe({
      next: () => {
        this.router.navigate(["/plants"]);
      },
      error: (error) => {
        alert("Failed to update plant");
        console.error(error);
      },
    });
  }
}
// The only notable difference from the AddPlantComponent is that we're getting the plant ID from the URL,
// fetching the plant from the API, and then passing it to the form in the ngOnInit() method.
