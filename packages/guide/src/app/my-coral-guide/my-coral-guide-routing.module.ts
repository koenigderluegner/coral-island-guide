import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from "./components/index/index.component";
import { MuseumChecklistComponent } from "./components/museum-checklist/museum-checklist.component";
import { CookingRecipesChecklistComponent } from "./components/cooking-recipes-checklist/cooking-recipes-checklist.component";
import { OfferingsChecklistComponent } from "./components/offerings-checklist/offerings-checklist.component";

const routes: Routes = [
    {
        path: '',
        component: MyCoralGuideComponent,
        children: [
            {
                path: '', component: IndexComponent
            },
            {
                path: 'to-do',
                loadChildren: () => import('../to-do/to-do.module').then(m => m.ToDoModule)
            },

            {
                path: 'museum-checklist',
                redirectTo: 'museum-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'museum-checklist/:tabName',
                component: MuseumChecklistComponent,
                title: 'Museum checklist - My Guide'
            },
            {
                path: 'cooking-recipes-checklist',
                redirectTo: 'cooking-recipes-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'cooking-recipes-checklist/:tabName',
                component: CookingRecipesChecklistComponent,
                title: 'Cooking recipes checklist - My Guide'
            },
            {
                path: 'offerings-checklist',
                redirectTo: 'offerings-checklist/',
                pathMatch: 'full'
            },
            {
                path: 'offerings-checklist/:tabName',
                component: OfferingsChecklistComponent,
                title: 'Offerings checklist - My Guide'
            },

        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyCoralGuideRoutingModule {
}
