import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, tap } from "rxjs";
import { Plant } from "./plant";

@Injectable({
  providedIn: "root",
})
export class PlantService {
  private url = "http://localhost:5200";
  private plants$: Subject<Plant[]> = new Subject();

  constructor(private httpClient: HttpClient) {}

  private refreshPlants() {
    this.httpClient.get<Plant[]>(`${this.url}/plants`).subscribe((plants) => {
      this.plants$.next(plants);
    });
  }
  getPlants(): Subject<Plant[]> {
    this.refreshPlants();
    return this.plants$;
  }
  getPlant(id: string): Observable<Plant> {
    return this.httpClient.get<Plant>(`${this.url}/plants/${id}`);
  }
  createPlant(plant: Plant): Observable<string> {
    return this.httpClient.post(`${this.url}/plants`, plant, {
      responseType: "text",
    });
  }
  updatePlant(id: string, plant: Plant): Observable<string> {
    return this.httpClient.put(`${this.url}/plants/${id}`, plant, {
      responseType: "text",
    });
  }
  deletePlant(id: string): Observable<string> {
    return this.httpClient.delete(`${this.url}/plants/${id}`, {
      responseType: "text",
    });
  }
}
