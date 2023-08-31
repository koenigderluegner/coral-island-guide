import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NPCsComponent } from './npcs.component';
import { GiftingComponent } from './components/gifting/gifting.component';
import { NpcListComponent } from "./components/npc-list/npc-list.component";
import { NpcComponent } from "./components/npc/npc.component";
import { onlyInBetaGuard } from "../core/guards/only-in-beta.guard";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'gifting'
    },
    {

        path: '',
        component: NPCsComponent,
        children: [
            {path: 'gifting', component: GiftingComponent, title: 'Gifting - NPCs'},
            {path: 'overview', component: NpcListComponent, title: 'Overview - NPCs', canActivate: [onlyInBetaGuard]},
            {path: ':npcKey', component: NpcComponent, canActivate: [onlyInBetaGuard]},
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NPCsRoutingModule {
}
