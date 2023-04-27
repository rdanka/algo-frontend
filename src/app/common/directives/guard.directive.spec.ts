import { GuardDirective } from './guard.directive';
import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

describe('GuardDirective', () => {
  let directive: GuardDirective;
  let elementRef: ElementRef;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElementRef]
    });
    elementRef = new ElementRef(document.createElement('div'));
    directive = new GuardDirective(elementRef);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should hide element if neptunId is present in localStorage', () => {
    localStorage.setItem('neptunId', '123');
    expect(elementRef.nativeElement.style.display).toBe('none');
    localStorage.removeItem('neptunId');
  });

  it('should show element if user is present in localStorage', () => {
    localStorage.setItem('user', 'John');
    directive = new GuardDirective(elementRef);
    expect(elementRef.nativeElement.style.display).toBe('flex');
    localStorage.removeItem('user');
  });

  it('should hide element if neither neptunId nor user is present in localStorage', () => {
    expect(elementRef.nativeElement.style.display).toBe('none');
  });
});
