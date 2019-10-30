import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Task1Component} from './task1/task1.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {ConversationReducer} from 'src/app/store/reducers/conversation.reducers';
import {FormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {ConversationEffects} from 'src/app/store/effects/conversation.effects';
import {Task2Component} from 'src/app/task2/task2.component';
import {Task3Component} from 'src/app/task3/task3.component';
import {Task4Component} from 'src/app/task4/task4.component';
import {Task5Component} from 'src/app/task5/task5.component';
import {Task6Component} from 'src/app/task6/task6.component';

@NgModule({
  declarations: [
    AppComponent,
    Task1Component,
    Task2Component,
    Task3Component,
    Task4Component,
    Task5Component,
    Task6Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({conversations: ConversationReducer}),
    EffectsModule.forRoot([ConversationEffects]),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
