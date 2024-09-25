import { Routes } from '@angular/router';
import { RegisterUserComponent } from './register-user/register-user.component';
import { SessionComponent } from './session/session.component';
import { CalendarComponent } from './calendar/calendar.component';

// ui


export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ajouter',
        component: RegisterUserComponent,
      },
      {
        path: 'session',
        component: SessionComponent,
      },
      {
        path: 'calendrier',
        component: CalendarComponent,
      }
    ],
  },
];
