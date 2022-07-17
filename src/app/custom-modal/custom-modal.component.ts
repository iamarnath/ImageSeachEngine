import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss'],
})
export class CustomModalComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {}
  // close() {
  //   this.el.nativeElement.classList.remove('sshow');
  //   this.el.nativeElement.classList.add('hhidden');
  // }
}
