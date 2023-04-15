import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMergeComponent } from './class-merge.component';

describe('ClassMergeComponent', () => {
  let component: ClassMergeComponent;
  let fixture: ComponentFixture<ClassMergeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassMergeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClassMergeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
