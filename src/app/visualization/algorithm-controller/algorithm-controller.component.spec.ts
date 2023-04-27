import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlgorithmControllerComponent } from './algorithm-controller.component';

describe('AlgorithmControllerComponent', () => {
  let component: AlgorithmControllerComponent;
  let fixture: ComponentFixture<AlgorithmControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ AlgorithmControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
