import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'cs-ngbd-carousel-basic',
  templateUrl: './ngbd-carousel-basic.component.html',
  styleUrls: ['./ngbd-carousel-basic.component.scss']
})
export class NgbdCarouselBasicComponent {

  images: string[] = ['assets/mockImage.jpg', 'assets/mockImage2.jpg', 'assets/mockImage3.jpg'];
}
