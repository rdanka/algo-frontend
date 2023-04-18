import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmSelectorComponent } from './algorithm-selector/algorithm-selector.component';
import { VisualizationComponent } from './visualization.component';
import { AlgorithmDetailsComponent } from './algorithm-details/algorithm-details.component';
import { AlgorithmControllerComponent } from './algorithm-controller/algorithm-controller.component';
import { AlgorithmQuizComponent } from './algorithm-quiz/algorithm-quiz.component';

@NgModule({
  declarations: [
    VisualizationComponent,
    AlgorithmSelectorComponent,
    AlgorithmDetailsComponent,
    AlgorithmControllerComponent,
    AlgorithmQuizComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VisualizationModule { }
