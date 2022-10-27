import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal.component';
import { CaughtComponent } from './components/caught/caught.component';
import { FoundComponent } from './components/found/found.component';
import { ProduceComponent } from './components/produce/produce.component';

const routes: Routes = [

    {

        path: '',
        component: JournalComponent,
        children: [
            {path: 'caught', component: CaughtComponent},
            {path: 'found', component: FoundComponent},
            {path: 'produce', component: ProduceComponent},
        ]
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'caught'
    },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JournalRoutingModule {
}
