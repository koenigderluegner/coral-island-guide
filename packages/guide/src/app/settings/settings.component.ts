import { Component } from '@angular/core';
import { SettingsService } from "../shared/services/settings.service";
import { FormControl, FormGroup } from "@angular/forms";
import { Settings } from "../shared/interfaces/settings.interface";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
})
export class SettingsComponent {

    settingsForm: FormGroup<{ useBeta: FormControl<boolean> }>
    protected reloadRequired = false;

    constructor(private readonly _settingsService: SettingsService) {
        this.settingsForm = new FormGroup<{ useBeta: FormControl<boolean> }>({
            useBeta: new FormControl<boolean>(false, {nonNullable: true})
        });

        const settings = this._settingsService.getSettings();
        this.settingsForm.patchValue(settings);

        this.settingsForm.valueChanges.subscribe({
            next: formValues => {
                this.reloadRequired = settings.useBeta !== formValues.useBeta
            }
        })
    }

    saveSettings(): void {
        const settings: Partial<Settings> = this.settingsForm.value;

        this._settingsService.saveSettings(settings);

        if (this.reloadRequired) {
            location.reload();
        }

    }
}
