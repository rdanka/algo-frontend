import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { RegisterResponse } from '../models/register-response.model';
import { AuthenticateResponse } from '../models/authenticate-response.model';
import { environment } from 'src/enviroment.prod';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a user', () => {
    const user: User = { username: 'testuser', password: 'testpassword' };
    const response: RegisterResponse = { success: true, msg: 'User registered successfully!' };

    service.register(user).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/register`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should authenticate a user', () => {
    const user: User = { username: 'testuser', password: 'testpassword' };
    const response: AuthenticateResponse = { accessToken: '123456', user: user, success: true };

    service.authenticate(user).subscribe(res => {
      expect(res).toEqual(response);
    });

    const req = httpMock.expectOne(`${environment.baseUrl}/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush(response);
  });

  it('should store user data', () => {
    const user: User = { username: 'testuser', password: 'testpassword' };
    const accessToken = '123456';

    service.storeUserData(accessToken, user);

    expect(localStorage.getItem('id_token')).toBe(accessToken);
    expect(localStorage.getItem('user')).toBe(JSON.stringify(user));
    service.logout();
  });

  it('should store student data', () => {
    const neptunId = 'AB1234';

    service.storeStudentData(neptunId);

    expect(localStorage.getItem('neptunId')).toBe(neptunId);
    service.logout();
  });

  it('should logout', () => {
    service.logout();

    expect(localStorage.getItem('id_token')).toBeNull();
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('neptunId')).toBeNull();
  });
});
