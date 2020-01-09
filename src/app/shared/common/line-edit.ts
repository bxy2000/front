// import {FormGroup} from "@angular/forms";

export class LineEdit {
  status = 0;
  currentId = -1;
  // data: FormGroup = null;

  browseStatus() {
    this.status = 0;
    this.currentId = -1;
    // this.data = null;
  }

  createStatus(id: number) {
    this.status = 1;
    this.currentId = id;
  }

  editStatus(id: number) {
    this.status = 2;
    this.currentId = id;
  }

  isBrowse(): boolean {
    return this.status == 0;
  }

  isCreating(): boolean {
    return this.status == 1;
  }

  isEditing(): boolean {
    return this.status == 2;
  }
}
