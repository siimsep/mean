import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Plant } from "../plant";
import { PlantService } from "../plant.service";
// @Component decorator is used to indicate that this class is a component.
@Component({
  selector: "app-plants-list", //selector property is used to specify the HTML tag that will be used to display this component.
  template: `
    <h2 class="text-center m-5">Plant List</h2>

    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Memo</th>
          <th>Type</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        <tr *ngFor="let plant of plants$ | async">
          <td>{{ plant.name }}</td>
          <td>{{ plant.memo }}</td>
          <td>{{ plant.type }}</td>
          <td>
            <button
              class="btn btn-primary me-1"
              [routerLink]="['edit/', plant._id]"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              (click)="deletePlant(plant._id || '')"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="btn btn-primary mt-3" [routerLink]="['new']">
      Add a New Plant
    </button>
  `,
})
export class PlantsListComponent implements OnInit {
  plants$: Observable<Plant[]> = new Observable();

  constructor(private plantsService: PlantService) {}
  // ngOnInit() method is called when the component is rendered on the page. It's a good place to fetch the list
  ngOnInit(): void {
    this.fetchPlants();
  }
  deletePlant(id: string): void {
    this.plantsService.deletePlant(id).subscribe({
      next: () => this.fetchPlants(),
    });
  }
  private fetchPlants(): void {
    this.plants$ = this.plantsService.getPlants(); //  returns an observable.
  }
}
