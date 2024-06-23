import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SpinnerComponent } from './components/spinner/spinner.component';



@NgModule({
  declarations: [SpinnerComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [CommonModule, FormsModule, RouterModule, SpinnerComponent]
})
export class SharedModule { }
