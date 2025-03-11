import { Routes } from '@angular/router';

export const routes: Routes = [
    {

        path: '',
        loadComponent: () => import('./journal.component').then(m => m.JournalComponent),
        children: [
            {path: 'caught/:tabName', loadComponent: () => import('./components/caught/caught.component').then(m => m.CaughtComponent), title: 'Caught - Journal'},
            {path: 'found/:tabName', loadComponent: () => import('./components/found/found.component').then(m => m.FoundComponent), title: 'Found - Journal'},
            {path: 'produce/:tabName', loadComponent: () => import('./components/produce/produce.component').then(m => m.ProduceComponent), title: 'Produce - Journal'},
            {path: 'bestiary', loadComponent: () => import('./components/bestiary/bestiary.component').then(m => m.BestiaryComponent), title: 'Bestiary - Journal'},
            {path: 'notes/:tabName', loadComponent: () => import('./components/notes/notes.component').then(m => m.NotesComponent), title: 'Notes - Journal'},
            {path: 'achievements', loadComponent: () => import('./components/achievements/achievements.component').then(m => m.AchievementsComponent), title: 'Achievements - Journal'},
            {path: 'achievements/:achievementId', loadComponent: () => import('./components/achievements/achievements.component').then(m => m.AchievementsComponent), title: 'Achievements - Journal'},
        ]
    },
];
