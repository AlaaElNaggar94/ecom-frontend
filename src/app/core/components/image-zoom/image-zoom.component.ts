import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-image-zoom',
  templateUrl: './image-zoom.component.html',
  styleUrl: './image-zoom.component.scss',
})
export class ImageZoomComponent {
  @Input() thumbImage: string = '';
  @Input() fullImage: string = '';
}
