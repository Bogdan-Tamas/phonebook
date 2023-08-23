import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then(res => res.HomeModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./pages/contact/contact.module').then(res => res.ContactModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(res => res.SearchModule),
  },
  {
		path: '**',
		redirectTo: '/',
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
