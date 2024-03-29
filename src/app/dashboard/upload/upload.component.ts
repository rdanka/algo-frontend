import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from 'src/app/common/services/class.service';
import { StudentService } from 'src/app/common/services/student.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  selectedFile: File | null;
  studentList: string[] = [];
  allValid = true;

  classForm = new FormGroup({
    className: new FormControl('', [Validators.required]),
    studentList: new FormControl<string[]>([], [Validators.required])
  });
  
  constructor(private readonly classService: ClassService, private readonly toastService: ToastrService, private readonly studentService: StudentService) {}


  public onChange(event: Event): void {
      const target = event.target as HTMLInputElement;
      const file: File = (target.files as FileList)[0];
      if (!file) {
        return;
      }
      if (file.type !== "text/csv" && file.type !== "text/plain") {
        this.toastService.error('Invalid file type. Please select a CSV or TXT file.', 'Error!');
        return;
      }
      let fileReader: FileReader = new FileReader();
      fileReader.onloadend = () => {
      const result = fileReader.result as string;

      if (result) {
        this.studentList = result.split( /;|,|[\r\n]+/);
        if(this.studentList.length && this.studentList[this.studentList.length - 1] === ''){
          this.studentList.pop();
       }

       for (let student of this.studentList) {
        this.studentService.isStudentRegistered(student).subscribe({
          next: (res) => {
            this.toastService.error(`Student ${student} is already registered!`, 'Error!');
            this.classForm.controls.studentList.setErrors({invalid: true});
            this.allValid = false;
          }, error: (err) => {
          }
        });
      }
      if (this.hasDuplicates(this.studentList)) {
        this.toastService.error('Student list contains duplicates!', 'Error!');
        this.classForm.controls.studentList.setErrors({invalid: true});
      } else {
        this.classForm.controls.studentList.setValue(this.studentList);
      }
      }
    }
    fileReader.readAsText(file);
  }

  addStudent(studentId: string): void {
    if (studentId === '') {
      this.toastService.error('Student ID is required!', 'Error!');
      return;
    }
    if (this.studentList.includes(studentId)) {
      this.toastService.error('Student ID is already in the list!', 'Error!');
      return;
    }
    this.studentService.isStudentRegistered(studentId).subscribe({
      next: (res) => {
        this.toastService.error(`Student ${studentId} is already registered!`, 'Error!');
      }, error: (err) => {
        this.studentList.push(studentId);
        this.classForm.controls.studentList.setValue(this.studentList);
        this.setValidity();
      }
    });
  }

  removeStudent(index: number): void {
    this.studentList.splice(index, 1);
    this.classForm.controls.studentList.setValue(this.studentList);
    this.checkStudentList();
  }
  
  checkStudentList(): void {
    this.allValid = true;
    if (this.classForm.controls.studentList.invalid) {
      this.toastService.error('Student list is required!', 'Error!');
      return;
    }
    if (this.hasDuplicates(this.studentList)) {
      this.toastService.error('Student list contains duplicates!', 'Error!');
      this.classForm.controls.studentList.setErrors({invalid: true});
    }

    let checked: boolean[] = [...Array(this.studentList.length).fill(false)];
    for (let i = 0; i < this.studentList.length; i++) {
      let student = this.studentList[i];
      let invalid = false;
      this.studentService.isStudentRegistered(student).subscribe({
        next: (res) => {
          invalid = true;
          checked[i] = true;
          this.updateValidity(invalid, student);
          if(checked.every(Boolean)){
            this.setValidity();
          }
        }, error: (err) => {
          invalid = false;
          checked[i] = true;
          this.updateValidity(invalid, student);
          if(checked.every(Boolean)){
            this.setValidity();
          }
        }
      });
    }
    
  }

  updateValidity(invalid: boolean, student:string): void {
    this.allValid = this.allValid && !invalid;
    if (invalid) {
      
      this.classForm.controls.studentList.setErrors({invalid: true});
    } else {
      this.classForm.controls.studentList.setValue(this.studentList);
    }
   
  }

  setValidity(): void {
    if(this.allValid){
      this.classForm.controls.studentList.setErrors(null);
    }else{
      this.classForm.controls.studentList.setErrors({invalid: true});
    }

  }

  hasDuplicates(array: string[]) {
    return (new Set(array)).size !== array.length;
  }

  submit(): void {
    if (this.classForm.controls.className.invalid) {
      this.toastService.error('Class name is required!', 'Error!');
      return;
    }
    if (this.classForm.controls.studentList.invalid) {
      this.toastService.error('Student list is required!', 'Error!');
      return;
    }
     this.classService.createClass(this.classForm.value).subscribe({
      next: () => this.toastService.success('Class was added!', 'Succes!'),
      error: (err) => this.toastService.error(`${err.error}`, 'Error!'),
    })
  }
}
