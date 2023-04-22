import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Question } from 'src/app/common/models/question.model';
import { Quiz } from 'src/app/common/models/quiz.model';
import { QuizService } from 'src/app/common/services/quiz.service';

@Component({
  selector: 'app-algorithm-quiz',
  templateUrl: './algorithm-quiz.component.html',
  styleUrls: ['./algorithm-quiz.component.scss']
})
export class AlgorithmQuizComponent implements OnInit {
  @Input() selectedAlgorithm: BehaviorSubject<string>;
  @Output() onModalClose = new EventEmitter<any>();
  questions: Question[];
  currentIndex = 0;
  currentPoints = 0;

  constructor(private readonly quizService: QuizService) { }

  ngOnInit(): void {
    this.selectedAlgorithm.subscribe((res) => {
      this.quizService.getQuizByAlgorithm(res).subscribe((res) => {
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
    this.currentIndex = 0;  
    this.onModalClose.emit();
  }
}
