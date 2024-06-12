import { Routes } from '@angular/router';
import { NpmChatComponent } from './views';

export const routes: Routes = [
  {
    path: '',
    component: NpmChatComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
