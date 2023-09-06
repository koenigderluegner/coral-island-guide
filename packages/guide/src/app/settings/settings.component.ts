import { Component, inject } from '@angular/core';
import { SettingsService } from "../shared/services/settings.service";
import { FormControl, FormGroup } from "@angular/forms";
import { ChecklistService } from "../core/services/checklist.service";
import { BETA_CODE } from "../core/injection-tokens/beta-code.injection-token";
import { UiIcon } from "../shared/enums/ui-icon.enum";

type SettingsFormGroup = {
    useBeta: FormControl<boolean>;
    resetLiveChecklist: FormControl<boolean>;
    resetBetaChecklist: FormControl<boolean>;
};

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {

    settingsForm: FormGroup<SettingsFormGroup>
    protected reloadRequired = false;
    protected uiIcon = UiIcon;

    protected readonly BETA_CODE = inject(BETA_CODE, {optional: true});


    constructor(
        private readonly _settingsService: SettingsService,
        private _checkList: ChecklistService) {
        this.settingsForm = new FormGroup<SettingsFormGroup>({
            useBeta: new FormControl<boolean>(false, {nonNullable: true}),
            resetLiveChecklist: new FormControl<boolean>(false, {nonNullable: true}),
            resetBetaChecklist: new FormControl<boolean>(false, {nonNullable: true}),
        });

        if (!this.BETA_CODE) {
            this.settingsForm.get('useBeta')?.disable()
        }

        const settings = this._settingsService.getSettings();
        this.settingsForm.patchValue(settings);

        this.settingsForm.valueChanges.subscribe({
            next: formValues => {
                this.reloadRequired = settings.useBeta !== formValues.useBeta
            }
        })
    }

    saveSettings(): void {
        const settings = {...this.settingsForm.value};

        if (settings.resetLiveChecklist) {
            this._checkList.resetLiveChecklist()
        }

        if (settings.resetBetaChecklist) {
            this._checkList.resetBetaChecklist()
        }

        delete settings.resetBetaChecklist;
        delete settings.resetLiveChecklist;

        this._settingsService.saveSettings(settings);

        if (this.reloadRequired) {
            location.reload();
        }

    }
}
