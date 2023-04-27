import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ClassService } from './class.service';
import { environment } from '../../../enviroment';

describe('ClassService', () => {
  let service: ClassService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClassService]
    });
    service = TestBed.inject(ClassService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call createClass API', () => {
    const params = { name: 'Test Class' };
    const expectedResponse = { message: 'Class created successfully' };

    service.createClass(params).subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/addClass`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(params);
    req.flush(expectedResponse);
  });

  it('should call getAllClasses API', () => {
    const expectedResponse = { classes: [{ name: 'Class A' }, { name: 'Class B' }] };

    service.getAllClasses().subscribe((response) => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/getAllClasses`);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });
});
