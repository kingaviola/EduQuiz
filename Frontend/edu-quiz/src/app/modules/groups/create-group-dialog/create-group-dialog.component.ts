import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Group } from 'src/app/models/group.model';
import { UserBasicData } from 'src/app/models/user-basic-data.model';
import { UserService } from 'src/app/services/user.service';


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

  allMembers: UserBasicData[] = [];
  member: any = '';
  filteredMembers: UserBasicData[] = [];
  groupMembers: UserBasicData[] = [];
  newJoinCode: string = this.generateCode();

  constructor (public dialogRef: MatDialogRef<CreateGroupDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { group: Group }, private _formBuilder: FormBuilder, private userService: UserService) {
    this.filteredMembers = this.allMembers.slice();
  }

  generateCode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';

    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return code;
  }

  addMember(): void {
    this.member = this.thirdFormGroup.get('thirdCtrl')?.value;
    const value = this.member;
    if (value && !this.groupMembers.includes(value)) {
      this.groupMembers.push(value);
    }
    this.member = '';
    if (this.thirdFormGroup.get('thirdCtrl')?.value){
      this.thirdFormGroup.get('thirdCtrl')?.reset('');
    }
  }

  async filterMembers(event: any): Promise<void> {
    const value = event.target.value.toLowerCase();
    if (value.length === 2) {
      try {
        await this.getUsers(value);

      } catch (error) {
        console.error("error fetching users: ", error);
      }
    }
    this.filteredMembers = this.allMembers.filter(member =>
      member.userName.toLowerCase().includes(value)
    );
  }

  getUsers(prefix: string) {
    return new Promise<void>((resolve, reject) => {
      this.userService.getUsersByPrefix(prefix)
        .subscribe((users) => {
          this.allMembers = users;
          resolve();
        },
      (error) => {
        reject(error);
      });
    });
  }

  onClose(): void {
    let name = this.firstFormGroup.get('firstCtrl')?.value;
    let desc = this.secondFormGroup.get('secondCtrl')?.value;
    let code = this.newJoinCode;
    if (name) this.data.group.name = name;
    if (desc) this.data.group.description = desc;
    let userIds: number[] = [];
    this.groupMembers.forEach(member => {
      userIds.push(member.id);
    })
    this.data.group.memberIds = userIds;
    this.data.group.joinCode = code;

    this.dialogRef.close(this.data.group);
  }

}
