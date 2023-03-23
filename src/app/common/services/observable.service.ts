import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {

  private subject = new Subject<any>();
  private arraySubject = new Subject<number[]>();
  private sizeAsSubject = new Subject<any>();

  constructor() { }  

  sendClickEvent(shortType: string) {
    this.subject.next(shortType);
  }

  sendSizeChangeEvent(size:number) {
    this.sizeAsSubject.next(size);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  getChangeInSize():Observable<any>{
    return this.sizeAsSubject.asObservable();
  }

  sendAlgorithm(sortType: string) {
    console.log('asd')
    this.subject.next(sortType);
  }

  getAlgorithm(): Observable<any> {
    return this.subject.asObservable();
  }

  sortAlgorithm(sortType: string) {
    console.log('Sort called');
    this.subject.next(sortType);
  }

  getSortAlgorithm(): Observable<any> {
    return this.subject.asObservable();
  }

  sendArray(array: number[]) {
    this.arraySubject.next(array);
  }

  getArray(): Observable<any> {
    return this.arraySubject.asObservable();
  }



}
