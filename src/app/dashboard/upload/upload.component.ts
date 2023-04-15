import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from 'src/app/common/services/class.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent {

  selectedFile: File | null;
  studentList: string[];

  classForm = new FormGroup({
    className: new FormControl(''),
    studentList: new FormControl<string[]>([])
  });

  constructor(private readonly classService: ClassService, private readonly toastService: ToastrService) {}

  

  public onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    let fileReader: FileReader = new FileReader();
    fileReader.onloadend = () => {
      const result = fileReader.result as string;

      if (result) {
        this.studentList = result.split( /;|,|[\r\n]+/);
        if(this.studentList.length && this.studentList[this.studentList.length - 1] === ''){
          this.studentList.pop();
       }
       this.classForm.controls.studentList.setValue(this.studentList);
      }
    }
    fileReader.readAsText(file);
  }

  submit(): void {
    console.log(this.classForm.value)
    this.classService.createClass(this.classForm.value).subscribe({
      next: () => this.toastService.success('Class was added!', 'Succes!'),
      error: (err) => this.toastService.error(`${err.error}`, 'Error!'),
    })
  }
}
