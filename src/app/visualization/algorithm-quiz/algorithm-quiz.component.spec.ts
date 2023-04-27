import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlgorithmQuizComponent } from './algorithm-quiz.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

describe('AlgorithmQuizComponent', () => {
  let component: AlgorithmQuizComponent;
  let fixture: ComponentFixture<AlgorithmQuizComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ AlgorithmQuizComponent ],
      providers: [ToastrService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmQuizComponent);
    component = fixture.componentInstance;
    component.selectedAlgorithm = new BehaviorSubject<string>('bubble');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
