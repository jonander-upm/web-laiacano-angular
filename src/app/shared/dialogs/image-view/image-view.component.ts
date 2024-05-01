import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
})
export class ImageViewComponent implements OnInit {
  @Input() imageSrc: string;

  constructor() { }

  ngOnInit(): void {
  }

}
