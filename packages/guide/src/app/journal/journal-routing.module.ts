import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './journal.component';
import { CaughtComponent } from './components/caught/caught.component';
import { FoundComponent } from './components/found/found.component';
import { ProduceComponent } from './components/produce/produce.component';
import { AchievementsComponent } from "./components/achievements/achievements.component";
import { NotesComponent } from "./components/notes/notes.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'produce'
    },
    {

        path: '',
        component: JournalComponent,
        children: [
            {path: 'caught', redirectTo: 'caught/', pathMatch: 'full'},
            {path: 'caught/:tabName', component: CaughtComponent, title: 'Caught - Journal'},
            {path: 'found', redirectTo: 'found/', pathMatch: 'full'},
            {path: 'found/:tabName', component: FoundComponent, title: 'Found - Journal'},
            {path: 'produce', redirectTo: 'produce/', pathMatch: 'full'},
            {path: 'produce/:tabName', component: ProduceComponent, title: 'Produce - Journal'},
            {path: 'notes', redirectTo: 'notes/', pathMatch: 'full'},
            {path: 'notes/:tabName', component: NotesComponent, title: 'Notes - Journal'},
            {path: 'achievements', redirectTo: 'achievements/', pathMatch: 'full'},
            {path: 'achievements/:achievementId', component: AchievementsComponent, title: 'Achievements - Journal'},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class JournalRoutingModule {
}
