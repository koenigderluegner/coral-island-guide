import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyCoralGuideComponent } from './my-coral-guide.component';
import { IndexComponent } from "./components/index/index.component";

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
        ]
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MyCoralGuideRoutingModule {
}
