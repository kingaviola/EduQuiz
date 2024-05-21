import { Component, ViewChild } from '@angular/core';
import { Image } from 'src/app/models/image.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  @ViewChild('fileInput') fileInput: any;
  selectedImage: Image | null = null;

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      console.log(this.selectedImage);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = {
          id: 0,
          name: file.name,
          data: e.target.result,
          type: file.type
        };
      };
      reader.readAsDataURL(file);
    }
  }
}
