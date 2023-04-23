import { ElementRef } from '@angular/core';
import { GuardDirective } from './guard.directive';

describe('GuardDirective', () => {
  it('should create an instance', () => {
    const directive = new GuardDirective(new ElementRef(''));
    expect(directive).toBeTruthy();
  });
});
