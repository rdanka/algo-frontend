import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/common/services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  form: FormGroup;
  answerOptions: any[] = [];
  algorithms = [  { name: 'Bubble Sort', value: 'bubble' },  { name: 'Selection Sort', value: 'selection' },  { name: 'Merge Sort', value: 'merge' },  { name: 'Quick Sort', value: 'quick' }];

  constructor(private readonly toastr: ToastrService, private readonly quizService: QuizService) {
    this.form = new FormGroup({
      algorithm: new FormControl('', [Validators.required]),
      array: new FormControl([]),
      question: new FormControl('', [Validators.required]),
      answer1: new FormControl('', [Validators.required]),
      answer2: new FormControl('', [Validators.required]),
      answer3: new FormControl('', [Validators.required]),
      answer4: new FormControl('', [Validators.required]),
      correctAnswer: new FormControl('', [Validators.required])
    });

    this.form.controls['answer1'].valueChanges.subscribe(() => {
      this.updateAnswerOptions();
    });
    
    this.form.controls['answer2'].valueChanges.subscribe(() => {
      this.updateAnswerOptions();
    });
    
    this.form.controls['answer3'].valueChanges.subscribe(() => {
      this.updateAnswerOptions();
    });
    
    this.form.controls['answer4'].valueChanges.subscribe(() => {
      this.updateAnswerOptions();
    });   
  
  }

  updateAnswerOptions() {
    this.answerOptions = [
      { value: this.form.controls["answer1"].value, label: this.form.controls["answer1"].value },
      { value: this.form.controls['answer2'].value, label: this.form.controls['answer2'].value },
      { value: this.form.controls['answer3'].value, label: this.form.controls['answer3'].value },
      { value: this.form.controls['answer4'].value, label: this.form.controls['answer4'].value }
    ];
  }

  submitQuestion(): void {
    const options = [this.form.value.answer1, this.form.value.answer2, this.form.value.answer3, this.form.value.answer4];
    const answer = this.form.value.correctAnswer;
    this.quizService.addQuestion({
      question: this.form.value.question,
      answer,
      options,
      algorithm: this.form.value.algorithm,
      array: Array.from(this.form.value.array.split(',').map(Number))
    }).subscribe({
      next: () => this.toastr.success('Question was added!', 'Success!'),
      error: (err) => this.toastr.error(`${err.error}`, 'Error!'),
    }); 
  }

  checkArray(input: string): void {
    
    if (input !== '') {
      const array: number[] = Array.from(input.split(',').map(Number));
    
      if (array.some(isNaN) || array.some((num) => num > 100) || array.some((num) => num < 1)) {
        this.form.controls['array'].setErrors({ 'incorrect': true });
      } else {
        this.form.controls['array'].setErrors(null);
      }
    } else {
      this.form.controls['array'].setErrors(null);
    }
  }

}
