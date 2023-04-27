import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Result } from '../models/result.model';
import { ResultService } from './result.service';
import { environment } from 'src/enviroment';

describe('ResultService', () => {
  let service: ResultService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ResultService]
    });
    service = TestBed.inject(ResultService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('getResultsByStudentId', () => {
    it('should return an Observable<Result[]>', () => {
      const mockResults: Result[] = [
        { studentId: '1', algorithmName: 'Algorithm A', result: 95 },
        { studentId: '1', algorithmName: 'Algorithm B', result: 80 },
        { studentId: '1', algorithmName: 'Algorithm C', result: 70 }
      ];

      const studentId = '1';
      service.getResultsByStudentId(studentId).subscribe((results) => {
        expect(results).toEqual(mockResults);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/results/getByStudentId?studentId=${studentId}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResults);
    });
  });

  describe('getResultsByClassId', () => {
    it('should return an Observable<Result[]>', () => {
      const mockResults: Result[] = [
        { studentId: '1', algorithmName: 'Algorithm A', result: 95 },
        { studentId: '2', algorithmName: 'Algorithm A', result: 85 },
        { studentId: '3', algorithmName: 'Algorithm A', result: 90 }
      ];

      const className = 'Class A';
      service.getResultsByClassId(className).subscribe((results) => {
        expect(results).toEqual(mockResults);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/results/getByClassId?className=${className}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResults);
    });
  });

  describe('addResult', () => {
    it('should return an Observable<Result>', () => {
      const mockResult: Result = { studentId: '1', algorithmName: 'Algorithm A', result: 95 };

      service.addResult(mockResult).subscribe((result) => {
        expect(result).toEqual(mockResult);
      });

      const req = httpMock.expectOne(`${environment.baseUrl}/results/add`);
      expect(req.request.method).toBe('POST');
      req.flush(mockResult);
    });
  });
});
