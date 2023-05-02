import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/common/models/question.model';
import { Quiz } from 'src/app/common/models/quiz.model';
import { QuizService } from 'src/app/common/services/quiz.service';
import { ResultService } from 'src/app/common/services/result.service';

@Component({
  selector: 'app-algorithm-quiz',
  templateUrl: './algorithm-quiz.component.html',
  styleUrls: ['./algorithm-quiz.component.scss']
})
export class AlgorithmQuizComponent implements OnInit {
  @Input() selectedAlgorithm = new BehaviorSubject<string>('bubble');
  @Output() onModalClose = new EventEmitter<any>();
  questions: Question[] = [{
    algorithm: '',
    array: [],
    question: '',
    options: [],
    answer: ''
  }];
  currentIndex = 0;
  currentPoints = 0;

  constructor(private readonly quizService: QuizService, private readonly resultService: ResultService, private readonly toastrService: ToastrService) { }

  ngOnInit(): void {
    this.selectedAlgorithm.subscribe((algorithm) => {
      let algorithmName = algorithm.split(' ')[0].toLocaleLowerCase();
      this.quizService.getQuizByAlgorithm(algorithmName).subscribe((res) => {
       this.questions = res.questions;
      });
    });
  }

  checkAnswer(): void {
    const answer = document.querySelector('input[class="answerInput"]:checked') as HTMLInputElement;
    if (answer.value === this.questions[this.currentIndex].answer) {
      this.currentPoints++;
    }
    this.currentIndex++;
  }

  close(): void {
    const answer = document.querySelector('input[class="answerInput"]:checked') as HTMLInputElement;
    if (answer.value === this.questions[this.currentIndex].answer) {
      this.currentPoints++;
    }
     if (localStorage.getItem('neptunId')) {
      this.resultService.addResult({
        studentId: localStorage.getItem('neptunId') || '',
        algorithmName: this.selectedAlgorithm.value,
        result: this.currentPoints / this.questions.length * 100
      }).subscribe(data => {
        if ((this.currentPoints / this.questions.length * 100) >= 50) {
          this.toastrService.success(`You have scored ${this.currentPoints / this.questions.length * 100}%!`, 'You did great!', {
            progressBar: true,
            positionClass: 'toast-bottom-right'
          });

        } else {
          this.toastrService.error(`You have scored ${this.currentPoints / this.questions.length * 100}%!`, 'Why not try again?', {
            progressBar: true,
            positionClass: 'toast-bottom-right'
          });
        }
        this.currentPoints = 0;
      });
    } else {
      this.toastrService.info('You need to be logged in as a student to save the result!', 'Test completed!', {
        progressBar: true,
        positionClass: 'toast-bottom-right'
      });
    }
    this.currentIndex = 0; 
    this.onModalClose.emit();
  }
}