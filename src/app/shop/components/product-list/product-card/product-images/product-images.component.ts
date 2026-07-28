import { Component, Input } from '@angular/core';
import { IPhoto } from '../../../../../shared/models/photo';
import { environment } from '../../../../../../environments/environment';

// export interface IProductPhoto {
//   id: number;
//   imageUrl: string;
// }

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss'],
})
export class ProductImagesComponent {
  @Input() photos: IPhoto[] | null | undefined = [];

  @Input() productName = '';

  // @Input() baseUrl = 'http://localhost:4321';
  @Input() baseUrl = environment.baseUrl;

  selectedIndex = 0;

  selectPhoto(index: number): void {
    this.selectedIndex = index;
  }

  get currentImage(): string {
    if (!this.photos?.length) {
      return 'assets/images/placeholder.png';
    }

    const index = Math.min(this.selectedIndex, this.photos.length - 1);

    return this.baseUrl + this.photos[index].imageUrl;
  }
}
