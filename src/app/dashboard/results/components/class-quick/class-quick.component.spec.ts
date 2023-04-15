import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassQuickComponent } from './class-quick.component';

describe('ClassQuickComponent', () => {
  let component: ClassQuickComponent;
  let fixture: ComponentFixture<ClassQuickComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassQuickComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassQuickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
