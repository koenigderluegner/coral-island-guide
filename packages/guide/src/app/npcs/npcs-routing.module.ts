import { Routes } from '@angular/router';
import { NPCsComponent } from './npcs.component';
import { GiftingComponent } from './components/gifting/gifting.component';
import { NpcListComponent } from "./components/npc-list/npc-list.component";
import { NpcComponent } from "./components/npc/npc.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'overview'
    },
    {

        path: '',
        component: NPCsComponent,
        children: [
            {path: 'gifting', component: GiftingComponent, title: 'Gifting - NPCs'},
            {path: 'overview', component: NpcListComponent, title: 'Overview - NPCs'},
            {path: ':npcKey', component: NpcComponent},
        ]
    },
];
