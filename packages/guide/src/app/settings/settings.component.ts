import { Component, inject } from '@angular/core';
import { SettingsService } from "../shared/services/settings.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ToDoService } from "../core/services/to-do.service";
import { BETA_CODE } from "../core/injection-tokens/beta-code.injection-token";
import { UiIcon } from "../shared/enums/ui-icon.enum";
import { AvailableLanguage, AvailableLanguageDisplayName, AvailableLanguages } from "@ci/data-types";
import { OfferingChecklistService } from "../core/services/checklists/offering-checklist.service";
import { CookingRecipesChecklistService } from "../core/services/checklists/cooking-recipes-checklist.service";
import { MuseumChecklistService } from "../core/services/checklists/museum-checklist.service";

type SettingsFormGroup = {
    useBeta: FormControl<boolean>;
    resetLiveToDo: FormControl<boolean>;
    resetBetaToDo: FormControl<boolean>;
    resetLiveChecklists: FormControl<boolean>;
    resetBetaChecklists: FormControl<boolean>;
    language: FormControl<AvailableLanguage>
};

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {

    settingsForm: FormGroup<SettingsFormGroup>
    protected reloadRequired = false;
    protected uiIcon = UiIcon;

    protected availableLanguages = AvailableLanguages;
    protected availableLanguageDisplayName = AvailableLanguageDisplayName;

    protected readonly BETA_CODE = inject(BETA_CODE, {optional: true});
    private readonly _checklistOfferings = inject(OfferingChecklistService)
    private readonly _checklistCooking = inject(CookingRecipesChecklistService)
    private readonly _checklistMuseum = inject(MuseumChecklistService)

    constructor(
        private readonly _settingsService: SettingsService,
        private _toDo: ToDoService) {
        this.settingsForm = new FormGroup<SettingsFormGroup>({
            useBeta: new FormControl<boolean>(false, {nonNullable: true}),
            resetLiveToDo: new FormControl<boolean>(false, {nonNullable: true}),
            resetBetaToDo: new FormControl<boolean>(false, {nonNullable: true}),
            resetLiveChecklists: new FormControl<boolean>(false, {nonNullable: true}),
            resetBetaChecklists: new FormControl<boolean>(false, {nonNullable: true}),
            language: new FormControl<AvailableLanguage>('en', {nonNullable: true}),
        });

        if (!this.BETA_CODE) {
            this.settingsForm.get('useBeta')?.disable()
        }

        const settings = this._settingsService.getSettings();
        this.settingsForm.patchValue(settings);

        this.settingsForm.valueChanges.subscribe({
            next: formValues => {
                this.reloadRequired = settings.useBeta !== formValues.useBeta || settings.language !== formValues.language
            }
        })
    }

    saveSettings(): void {
        const settings = {...this.settingsForm.value};

        if (settings.resetLiveChecklists) {
            this._checklistMuseum.resetLiveChecklist()
            this._checklistOfferings.resetLiveChecklist()
            this._checklistCooking.resetLiveChecklist()
        }

        if (settings.resetBetaChecklists) {
            this._checklistMuseum.resetBetaChecklist()
            this._checklistOfferings.resetBetaChecklist()
            this._checklistCooking.resetBetaChecklist()
        }

        if (settings.resetLiveToDo) {
            this._toDo.resetLiveToDo()
        }

        if (settings.resetBetaToDo) {
            this._toDo.resetBetaToDo()
        }

        delete settings.resetBetaToDo;
        delete settings.resetLiveToDo;
        delete settings.resetBetaChecklists;
        delete settings.resetLiveChecklists;

        this._settingsService.saveSettings(settings);

        if (this.reloadRequired) {
            location.reload();
        }

    }
}
