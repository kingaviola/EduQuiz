import { Component, OnInit, ViewChild } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { UserProfile } from 'src/app/models/user-profile.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: UserProfile = {
    name: "",
    userName: "",
    email: "",
    userImage: null
  }

  constructor (private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUserProfileData()
      .subscribe((data: UserProfile) => {
        this.userData = data;
        this.selectedImage = this.userData.userImage;
        if (this.userData.userImage?.data.startsWith('iVBORw0KGgo=')) { 
          this.imageSrc = 'data:image/png;base64,' + this.userData.userImage?.data;
        } else {
          this.imageSrc = 'data:image/jpeg;base64,' + this.userData.userImage?.data;
        }
        console.log("Profile: ", this.userData);
        console.log("SelectedImage: ", this.selectedImage);
      },
    error => {
      console.error("Error happend during retreiving user data", error);
    });
  }

  @ViewChild('fileInput') fileInput: any;
  selectedImage: Image | null = null;
  imageSrc: string = "";

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        let base64Data = e.target.result as string;
        this.imageSrc = base64Data;
        base64Data = base64Data.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
        this.selectedImage = {
          id: 0,
          name: file.name,
          data: base64Data,
          type: file.type
        };
        this.accountService.uploadImage(this.selectedImage)
          .subscribe(resp => {
            console.log("Image uploaded succesfully");
          }, error => {
            console.error("Error happen during image upload", error);
          });
      };
      reader.readAsDataURL(file);
    }
  }

  downloadJsonTemplate() {
    this.downloadTemplate('assets/templates/template.json', 'template.json');
  }

  downloadXmlTemplate() {
    this.downloadTemplate('assets/templates/template.xml', 'template.xml');
  }

  downloadTemplate(filePath: string, fileName: string) {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
