// src/app/shop/components/product-list/product-card/product-images/product-images.component.ts
import { Component, Input, OnInit } from '@angular/core';

export interface ProductPhoto {
  id?: number | string;
  imageUrl: string;
  largeImageUrl?: string;
}

@Component({
  selector: 'app-product-images',
  templateUrl: './product-images.component.html',
  styleUrls: ['./product-images.component.scss']
})
export class ProductImagesComponent implements OnInit {
  @Input() photos: ProductPhoto[] = [];
  @Input() baseUrl: string = '';
  @Input() productName: string = '';
  @Input() useZoom: boolean = false;

  selectedIndex: number = 0;
  currentImage: string = '';

  // 👈 يجب تعريف المتغيرين هنا لحل خطأ Property 'fullImage' / 'thumbImage'
  thumbImage: string = '';
  fullImage: string = '';

  ngOnInit(): void {
    if (this.photos && this.photos.length > 0) {
      this.selectPhoto(0);
    }
  }

  selectPhoto(index: number): void {
    this.selectedIndex = index;
    const selected = this.photos[index];

    if (selected) {
      const fullPath = this.baseUrl + selected.imageUrl;
      const largePath = selected.largeImageUrl 
        ? this.baseUrl + selected.largeImageUrl 
        : fullPath;

      this.currentImage = fullPath;
      this.thumbImage = fullPath;
      this.fullImage = largePath;
    }
  }
}