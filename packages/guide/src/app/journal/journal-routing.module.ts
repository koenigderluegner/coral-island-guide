import { Routes } from '@angular/router';








export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'produce'
    },
    {

        path: '',
        loadComponent: () => import('./journal.component').then(m => m.JournalComponent),
        children: [
            {path: 'caught', redirectTo: 'caught/', pathMatch: 'full'},
            {path: 'caught/:tabName', loadComponent: () => import('./components/caught/caught.component').then(m => m.CaughtComponent), title: 'Caught - Journal'},
            {path: 'found', redirectTo: 'found/', pathMatch: 'full'},
            {path: 'found/:tabName', loadComponent: () => import('./components/found/found.component').then(m => m.FoundComponent), title: 'Found - Journal'},
            {path: 'produce', redirectTo: 'produce/', pathMatch: 'full'},
            {path: 'produce/:tabName', loadComponent: () => import('./components/produce/produce.component').then(m => m.ProduceComponent), title: 'Produce - Journal'},
            {path: 'bestiary', loadComponent: () => import('./components/bestiary/bestiary.component').then(m => m.BestiaryComponent), title: 'Bestiary - Journal'},
            {path: 'notes', redirectTo: 'notes/', pathMatch: 'full'},
            {path: 'notes/:tabName', loadComponent: () => import('./components/notes/notes.component').then(m => m.NotesComponent), title: 'Notes - Journal'},
            {path: 'achievements', redirectTo: 'achievements/', pathMatch: 'full'},
            {path: 'achievements/:achievementId', loadComponent: () => import('./components/achievements/achievements.component').then(m => m.AchievementsComponent), title: 'Achievements - Journal'},
        ]
    },
];
