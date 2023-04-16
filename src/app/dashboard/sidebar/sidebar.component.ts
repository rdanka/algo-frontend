import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClassService } from 'src/app/common/services/class.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  classes: any[];
  @Output() onIdChange = new EventEmitter<string>();
  @Output() onClassChange = new EventEmitter<string>();
  
  constructor(private readonly classService: ClassService) {}

  ngOnInit() {
   this.classService.getAllClasses().subscribe(data => {
    this.classes = data.classes;
    for (let studentClass of this.classes) {
        studentClass.studentIds.sort();
    }
  }) 
  }

  toggleClass(event: Event, className: string) {
    const el: HTMLElement= event.target as HTMLElement; 
     el.closest('li')!.classList.toggle('active-class');
    if (el.closest('li')!.classList.contains('student')) {
      console.log(el.closest('li')!.innerText)
      this.onIdChange.emit(el.closest('li')!.innerText);
    } else {
      this.onClassChange.emit(className);
    }
  }

  changeClass(className: string) {
    console.log(className)
    this.onClassChange.emit(className);
  }

  toggleStudent(studentId: string) {
    this.onIdChange.emit(studentId);
  }
}
