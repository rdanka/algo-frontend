import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Quiz } from '../models/quiz.model';
import { QuizService } from './quiz.service';
import { environment } from 'src/enviroment';

describe('QuizService', () => {
  let service: QuizService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuizService]
    });

    service = TestBed.inject(QuizService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getQuizByAlgorithm', () => {
    it('should send a GET request to the API and return the quiz', () => {
      const algorithm = 'test';
      const expectedQuiz: Quiz = {
        algorithm: algorithm,
        questions: []
      };

      service.getQuizByAlgorithm(algorithm).subscribe((quiz) => {
        expect(quiz).toEqual(expectedQuiz);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/quiz/getQuizByAlgorithm?algorithm=${algorithm}`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedQuiz);
    });
  });

  describe('addQuestion', () => {
    it('should send a POST request to the API', () => {
      const question: any = {
        algorithm: 'test',
        questions: [{
          algorithm: 'test',
          array: [],
          question: 'What is the answer?',
          options: ['A', 'B', 'C', 'D'],
          answer: 'A'
        }]
      };

      service.addQuestion(question).subscribe(() => {
        // empty callback, just to make sure the request is sent
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/quiz/addQuestion`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(question);
      req.flush(null);
    });
  });
});
