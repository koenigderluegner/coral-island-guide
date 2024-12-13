import { Component, computed, effect, inject, linkedSignal, untracked } from '@angular/core';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatOption, MatSelect } from "@angular/material/select";
import { UserDataService } from "../../core/services/user-data.service";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-user-data-actions',
    imports: [
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        FormsModule
    ],
    templateUrl: './user-data-actions.component.html'
})
export class UserDataActionsComponent {
    readonly #userDataService = inject(UserDataService);

    protected options = computed(() => this.#userDataService.userData().data);
    protected selectedIndex = linkedSignal(() => this.#userDataService.userData().currentIndex);

    constructor() {
        effect(() => {
            const selectedIndex = this.selectedIndex();
            this.#userDataService.currentIndex.set(selectedIndex);
            untracked(() => {

                this.#userDataService.save();
            })
        });
    }

}
