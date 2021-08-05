import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HommeComponent } from './homme/homme.component';

const routes: Routes = [
  { path: '', component: HommeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
