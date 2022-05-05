import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TODOComponent } from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: TODOComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
