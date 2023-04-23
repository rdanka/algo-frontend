import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appGuard]'
})
export class GuardDirective {
  constructor(private el: ElementRef) {
      if (localStorage.getItem('neptunId')) {
        this.el.nativeElement.style.display = 'none';
      } else if (localStorage.getItem('user')) {
        this.el.nativeElement.style.display = 'flex';
      } else {
        this.el.nativeElement.style.display = 'none';
      }
  }
}
