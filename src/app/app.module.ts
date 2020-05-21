import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LOCALE_ID } from '@angular/core';
import { NgxDataTableModule} from "angular-9-datatable";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CursoComponent } from './components/curso/curso.component';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import { PasajeComponent } from './components/pasaje/pasaje.component';
import { PalabraComponent } from './components/palabra/palabra.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CursoComponent,
    MensajeriaComponent,
    PasajeComponent,
    PalabraComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxDataTableModule,
    NgbModule,
  ],
  providers: [
   // {provide: LOCALE_ID, useValue:"es"}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
