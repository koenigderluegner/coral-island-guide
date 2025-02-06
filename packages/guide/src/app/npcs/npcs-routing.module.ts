import { Routes } from '@angular/router';





export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
    },
    {

        path: '',
        loadComponent: () => import('./npcs.component').then(m => m.NPCsComponent),
        children: [
            {path: 'gifting', loadComponent: () => import('./components/gifting/gifting.component').then(m => m.GiftingComponent), title: 'Gifting - NPCs'},
            {path: 'overview', loadComponent: () => import('./components/npc-list/npc-list.component').then(m => m.NpcListComponent), title: 'Overview - NPCs'},
            {path: ':npcKey', loadComponent: () => import('./components/npc/npc.component').then(m => m.NpcComponent)},
        ]
    },
];
