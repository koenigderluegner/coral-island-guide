import { inject, Injectable } from '@angular/core';
import { SettingsService } from "../../../shared/services/settings.service";
import { Checklist } from "../../interfaces/checklist.interface";
import { UserDataService } from "../user-data.service";
import { LocalStorageService } from "../../local-storage/local-storage.service";

@Injectable()
export abstract class BaseChecklistService {

    protected static _TO_DO_STORE_KEY = 'checklist_'
    localStorage = inject(LocalStorageService);
    protected readonly versionSuffix = inject(SettingsService).getSettings().useBeta ? '_beta' : '_live';
    protected readonly userData = inject(UserDataService);

    protected constructor(protected checklistName: string) {
        if (checklistName.trim() === '') throw new Error(`checklistName can't be empty!`)
        this.read();
    }

    /**
     * @deprecated Only used to migrate existing data. To read checklists see UserDataService.
     * @see UserDataService
     */
    read(): void {
        const toDos = this.localStorage.getItem(this.getChecklistStorageKey());
        if (toDos && !this.userData.getCurrentData().checklists[this.checklistName]) {

            const checklists: Checklist[] = JSON.parse(toDos);

            this.userData.getCurrentData().checklists[this.checklistName] = checklists[0] ?? [];
            this.userData.save();
            this.localStorage.removeItem(this.getChecklistStorageKey())
        }
    }

    save(): void {
        this.userData.save()
    }

    getCurrentChecklist(): Checklist {
        let checklist = this.userData.getCurrentData().checklists[this.checklistName]

        if (!checklist) {
            this.userData.getCurrentData().checklists[this.checklistName] = this._createEmptyChecklist();
            checklist = this.userData.getCurrentData().checklists[this.checklistName]

        }
        return checklist;
    }

    set(entry: string | string[]): void {
        this.getCurrentChecklist().entries = [...new Set([
            ...(Array.isArray(entry) ? entry : [entry])
        ])]
        this.save();
    }

    add(entry: string | string[]): void {
        this.getCurrentChecklist().entries = [...new Set([
            ...this.getCurrentChecklist().entries,
            ...(Array.isArray(entry) ? entry : [entry])
        ])]
        this.save();
    }

    remove(entry: string | string[]): void {

        if (!Array.isArray(entry)) {
            entry = [entry]
        }

        this.getCurrentChecklist().entries = this.getCurrentChecklist().entries.filter(e => !entry.includes(e))
        this.save();
    }

    isChecked(value: string): boolean {
        return this.getCurrentChecklist().entries.includes(value)
    }

    getChecklistStorageKey(): string {
        return BaseChecklistService._TO_DO_STORE_KEY + this.checklistName + this.versionSuffix
    }

    resetLiveChecklist(): void {
        this.localStorage.setItem(BaseChecklistService._TO_DO_STORE_KEY + this.checklistName + '_live', JSON.stringify([this._createEmptyChecklist()]));
        this.read();
    }

    resetBetaChecklist(): void {
        this.localStorage.setItem(BaseChecklistService._TO_DO_STORE_KEY + this.checklistName + '_beta', JSON.stringify([this._createEmptyChecklist()]));
        this.read()
    }

    protected _createEmptyChecklist(): Checklist {
        return {
            version: 1,
            entries: []
        } satisfies Checklist
    }
}
