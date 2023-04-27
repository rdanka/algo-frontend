import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlgorithmSelectorComponent } from './algorithm-selector.component';

describe('AlgorithmSelectorComponent', () => {
  let component: AlgorithmSelectorComponent;
  let fixture: ComponentFixture<AlgorithmSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AlgorithmSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlgorithmSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
