import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmQuizComponent } from './algorithm-quiz.component';

describe('AlgorithmQuizComponent', () => {
  let component: AlgorithmQuizComponent;
  let fixture: ComponentFixture<AlgorithmQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlgorithmQuizComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
