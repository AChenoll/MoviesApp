import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    Error404PageComponent
  ],
  exports: [
    Error404PageComponent
  ],
  imports: [
    RouterModule,
    MaterialModule
  ]
})

export class SharedModule { }
