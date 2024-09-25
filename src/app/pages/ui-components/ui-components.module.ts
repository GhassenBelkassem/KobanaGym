import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { UiComponentsRoutes } from './ui-components.routing';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { MatNativeDateModule } from '@angular/material/core';
import { RegisterUserComponent } from './register-user/register-user.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SessionComponent } from './session/session.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FlatpickrModule } from 'angularx-flatpickr';
import { AddSeanceComponent } from './add-seance/add-seance.component';
import { ScheduleSessionComponent } from './schedule-session/schedule-session.component';
import { UpdateSesionComponent } from './update-sesion/update-sesion.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UiComponentsRoutes),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
    ToastModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    FlatpickrModule.forRoot()
  ],
  declarations: [
    RegisterUserComponent,
    SessionComponent,
    CalendarComponent,
    AddSeanceComponent,
    ScheduleSessionComponent,
    UpdateSesionComponent
  ],
  providers: [MessageService]
})
export class UicomponentsModule {}
