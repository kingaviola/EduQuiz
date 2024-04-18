import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupCard } from 'src/app/models/qroup-card.model';


@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.scss']
})
export class CreateGroupDialogComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    thirdCtrl: [''],
  });
  isEditable = true;

  //get users with a service
  allMembers: string[] = ['John#12345', 'Jane#54321', 'Britney#13579', 'Michael#63748', 'David#51632'];
  member: any = '';
  filteredMembers: string[] = [];
  groupMembers: string[] = [];

  constructor (public dialogRef: MatDialogRef<CreateGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { group: GroupCard }, private _formBuilder: FormBuilder) {
    this.filteredMembers = this.allMembers.slice();
  }

  addMember(): void {
    this.member = this.thirdFormGroup.get('thirdCtrl')?.value;
    const value = this.member.trim();
    if (value && !this.groupMembers.includes(value)) {
      this.groupMembers.push(value);
    }
    this.member = '';
  }

  filterMembers(event: any): void {
    const value = event.target.value.toLowerCase();
    this.filteredMembers = this.allMembers.filter(member =>
      member.toLowerCase().includes(value)
    );
  }

  //handle added users
  onClose(): void {
    //tempoprary data saving
    let name = this.firstFormGroup.get('firstCtrl')?.value;
    let desc = this.secondFormGroup.get('secondCtrl')?.value;
    let num = this.groupMembers.length;
    let code = "TODO"
    if (name) this.data.group.name = name;
    if (desc) this.data.group.desc = desc;
    this.data.group.membersNum = num;
    this.data.group.joinCode = code;

    this.dialogRef.close(this.data.group);
  }

}
