import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload/upload.component';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ResultsComponent } from './results/results.component';
import { StudentChartComponent } from './results/components/student-chart/student-chart.component';
import { ClassBubbleComponent } from './results/components/class-bubble/class-bubble.component';
import { ClassQuickComponent } from './results/components/class-quick/class-quick.component';
import { ClassSelectionComponent } from './results/components/class-selection/class-selection.component';
import { ClassMergeComponent } from './results/components/class-merge/class-merge.component';


@NgModule({
  declarations: [
    DashboardComponent,
    UploadComponent,
    SidebarComponent,
    ResultsComponent,
    StudentChartComponent,
    ClassBubbleComponent,
    ClassQuickComponent,
    ClassSelectionComponent,
    ClassMergeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
