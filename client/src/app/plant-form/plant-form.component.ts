import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { Plant } from "../plant";

@Component({
  selector: "app-plant-form",
  template: `<form
    class="plant-form"
    autocomplete="off"
    [formGroup]="plantForm"
    (ngSubmit)="submitForm()"
  >
    <div class="form-floating mb-3">
      <input
        class="form-control"
        type="text"
        id="name"
        formControlName="name"
        placeholder="Name"
        required
      />
      <label for="name">Name</label>
    </div>

    <div
      *ngIf="name.invalid && (name.dirty || name.touched)"
      class="alert alert-danger"
    >
      <div *ngIf="name.errors?.['required']">Name is required.</div>
      <div *ngIf="name.errors?.['minlength']">
        Name must be at least 3 characters long.
      </div>
    </div>

    <div class="form-floating mb-3">
      <input
        class="form-control"
        type="text"
        formControlName="memo"
        placeholder="Memo"
        required
      />
      <label for="memo">Memo</label>
    </div>

    <div
      *ngIf="memo.invalid && (memo.dirty || memo.touched)"
      class="alert alert-danger"
    >
      <div *ngIf="memo.errors?.['required']">Memo is required.</div>
      <div *ngIf="memo.errors?.['minlength']">
        Memo must be at least 5 characters long.
      </div>
    </div>

    <div class="mb-3">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          formControlName="type"
          name="type"
          id="type-1y"
          value="üheaastane"
          required
        />
        <label class="form-check-label" for="type-1y">Üheaastane</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          formControlName="type"
          name="type"
          id="type-2y"
          value="kaheaastane"
        />
        <label class="form-check-label" for="type-2y">Kaheaastane</label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          formControlName="type"
          name="type"
          id="type-3y"
          value="püsik"
        />
        <label class="form-check-label" for="type-3y">Püsik</label>
      </div>
    </div>

    <button
      class="btn btn-primary"
      type="submit"
      [disabled]="plantForm.invalid"
    >
      Add
    </button>
  </form>`,
  styles: [
    `
      .plant-form {
        max-width: 560px;
        margin-left: auto;
        margin-right: auto;
      }
    `,
  ],
})
export class PlantFormComponent implements OnInit {
  //  using an @Input() to pass in the initial state of the form from the parent component.
  // For example, the parent component might fetch the plant data from an API and pass it into the form. The child component will get notified when new data is available.
  @Input()
  initialState: BehaviorSubject<Plant> = new BehaviorSubject({});
  //  The type of the @Input() is BehaviorSubject<Plant> because we might pass async data into the form.

  @Output()
  formValuesChanged = new EventEmitter<Plant>();

  @Output()
  formSubmitted = new EventEmitter<Plant>();
  // The @Output() is an event emitter that will emit the form values whenever the form is submitted. The parent will handle the submission and send an API call.
  plantForm: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder) {}

  get name() {
    return this.plantForm.get("name")!;
  }
  get memo() {
    return this.plantForm.get("memo")!;
  }
  get type() {
    return this.plantForm.get("type")!;
  }

  ngOnInit() {
    this.initialState.subscribe((plant) => {
      this.plantForm = this.fb.group({
        name: [plant.name, [Validators.required]],
        memo: [plant.memo, [Validators.required, Validators.minLength(5)]],
        type: [plant.type, [Validators.required]],
      });
    });

    this.plantForm.valueChanges.subscribe((val) => {
      this.formValuesChanged.emit(val);
    });
  }
  submitForm() {
    this.formSubmitted.emit(this.plantForm.value);
  }
}
