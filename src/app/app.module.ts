import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddNoteComponent } from './components/home/add-note/add-note.component';
import { AddNoteCategoryComponent } from './components/my-note-categories/add-note-category/add-note-category.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { NavComponent } from './components/nav/nav.component';
import { NoteItemComponent } from './components/home/note-item/note-item.component';
import { NotesListComponent } from './components/home/notes-list/notes-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyNoteCategoriesComponent } from './components/my-note-categories/my-note-categories.component';
import { NoteCategoriesListComponent } from './components/my-note-categories/note-categories-list/note-categories-list.component';
import { NoteCategoryItemComponent } from './components/my-note-categories/note-category-item/note-category-item.component';
import { DateGroupComponent } from './components/home/date-group/date-group.component';
import { IncomeExpenseChartComponent } from './components/home/statistics-for-month/income-expense-chart/income-expense-chart.component';
import { ChartModule } from 'primeng/chart';
import { StatisticsForMonthComponent } from './components/home/statistics-for-month/statistics-for-month.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { IncomeExpenseForYearChartComponent } from './components/statistics/income-expense-for-year-chart/income-expense-for-year-chart.component';
import { IncomeExpenseForAllTimeSortedByCategoryChartComponent } from './components/statistics/income-expense-for-all-time-sorted-by-category-chart/income-expense-for-all-time-sorted-by-category-chart.component';
import {ConfigurationService, initConfig} from "./services/configuration.service";

registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    AddNoteComponent,
    AddNoteCategoryComponent,
    HomeComponent,
    LoginComponent,
    LogoutButtonComponent,
    NavComponent,
    NoteItemComponent,
    NotesListComponent,
    PageNotFoundComponent,
    RegisterComponent,
    MyNoteCategoriesComponent,
    NoteCategoriesListComponent,
    NoteCategoryItemComponent,
    DateGroupComponent,
    IncomeExpenseChartComponent,
    StatisticsForMonthComponent,
    StatisticsComponent,
    IncomeExpenseForYearChartComponent,
    IncomeExpenseForAllTimeSortedByCategoryChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initConfig,
      multi: true,
      deps: [ConfigurationService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
