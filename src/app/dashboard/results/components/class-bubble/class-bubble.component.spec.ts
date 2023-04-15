import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassBubbleComponent } from './class-bubble.component';

describe('ClassBubbleComponent', () => {
  let component: ClassBubbleComponent;
  let fixture: ComponentFixture<ClassBubbleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassBubbleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassBubbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
