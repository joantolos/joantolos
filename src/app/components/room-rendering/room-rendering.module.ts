import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RoomRenderingComponent } from './room-rendering.component';

@NgModule({
  declarations: [RoomRenderingComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild([
    { path: '', component: RoomRenderingComponent }
  ])]
})
export class RoomRenderingModule {}
