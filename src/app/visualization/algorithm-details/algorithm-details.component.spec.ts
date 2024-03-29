import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlgorithmDetailsComponent } from './algorithm-details.component';

describe('AlgorithmDetailsComponent', () => {
  let component: AlgorithmDetailsComponent;
  let fixture: ComponentFixture<AlgorithmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      declarations: [ AlgorithmDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
