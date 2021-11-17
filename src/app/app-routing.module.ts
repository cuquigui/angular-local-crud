import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ListCostumersComponent } from './pages/list-costumers/list-costumers.component';
import { NewCostumerComponent } from './pages/new-costumer/new-costumer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomePageComponent },
  { path: 'list-costumers', component: ListCostumersComponent },
  { path: 'new-costumer', component: NewCostumerComponent },
  { path: 'new-costumer/:index', component: NewCostumerComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
