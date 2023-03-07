import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlgorithmSelectorComponent } from './algorithm-selector/algorithm-selector.component';
import { VisualizationComponent } from './visualization.component';
import { BubbleSortComponent } from './algorithms/bubble-sort/bubble-sort.component';

@NgModule({
  declarations: [
    VisualizationComponent,
    AlgorithmSelectorComponent,
    BubbleSortComponent
  ],
  imports: [
    CommonModule
  ]
})
export class VisualizationModule { }
