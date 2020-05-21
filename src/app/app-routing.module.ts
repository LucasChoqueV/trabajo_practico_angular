import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CursoComponent } from './components/curso/curso.component';
import { AsistenteService } from './servicios/asistente.service';
import { MensajeriaComponent } from './components/mensajeria/mensajeria.component';
import { PasajeComponent } from './components/pasaje/pasaje.component';
import { PalabraComponent } from './components/palabra/palabra.component';
const routes: Routes = [
  { path: 'curso', component: CursoComponent },
  { path: 'mensajeria', component: MensajeriaComponent },
  { path: 'pasaje', component: PasajeComponent },
  { path: 'palabra', component: PalabraComponent },
  { path: '**', pathMatch:'full',redirectTo:'curso' },
  { path: '', pathMatch:'full',redirectTo:'curso' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AsistenteService],
})
export class AppRoutingModule { }
