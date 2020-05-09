import { Component, ViewChild, OnInit } from "@angular/core";
import { IFlash } from "./flash.model";
import { NgForm } from "@angular/forms";
import { FlashService } from "./flash.service";
import { Observable } from "rxjs";

function getRandomNumber() {
  return Math.floor(Math.random() * 1000);
}

function generateId() {}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  flashs;

  flash$: Observable<IFlash[]>;

  constructor(private flashService: FlashService) {
    this.flashs = this.flashService.flashs;
  }

  ngOnInit() {
    this.flash$ = this.flashService.flashs$;
  }

  @ViewChild("flashForm", { static: true }) flashForm: NgForm;

  editing = false;
  editingId: number;

  flash = {
    question: "",
    answer: "",
  };

  trackByFlashId(index, flash) {
    return flash.id;
  }
  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }
  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }
  handleEdit(id: number): void {
    this.flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
  }
  handleRememberedChange({ id, flag }) {
    this.flashService.rememberedChange(id, flag);
  }
  handleSubmit(): void {
    this.flashService.addFlash(this.flash);
    this.handleClear();
  }
  handleClear() {
    this.flash = {
      question: "",
      answer: "",
    };
    this.flashForm.reset();
  }
  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.flash);
    this.handleCancel();
  }
  handleCancel() {
    this.editing = false;
    this.editingId = undefined;
    this.handleClear();
  }
}
