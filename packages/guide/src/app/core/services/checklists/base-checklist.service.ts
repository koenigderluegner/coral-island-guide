import { inject, Injectable } from '@angular/core';
import { SettingsService } from "../../../shared/services/settings.service";
import { Checklist } from "../../interfaces/checklist.interface";

@Injectable()
export abstract class BaseChecklistService {

    protected static _CURRENT_TO_DO_VERSION = 1
    protected static _TO_DO_STORE_KEY = 'checklist_'

    protected readonly versionSuffix = inject(SettingsService).getSettings().useBeta ? '_beta' : '_live';

    protected checklists: Checklist[] = []
    protected currentChecklistIndex = 0;

    protected constructor(protected checklistName: string) {
        if (checklistName.trim() === '') throw new Error(`checklistName can't be empty!`)
        this.read();
    }

    read(): void {
        const toDos = localStorage.getItem(this.getChecklistStorageKey());
        if (toDos) {
            this.checklists = JSON.parse(toDos);
        } else {
            this.checklists.push(this._createEmptyChecklist())
            this.save();
        }
    }

    save(): void {
        localStorage.setItem(this.getChecklistStorageKey(), JSON.stringify(this.checklists));
    }

    getCurrentChecklist(): Checklist {
        let checklist = this.checklists[this.currentChecklistIndex];
        if (!checklist) {
            this.currentChecklistIndex = 0;
            checklist = this.checklists[this.currentChecklistIndex]
        }

        if (!checklist) {
            this.checklists.push(this._createEmptyChecklist());
            checklist = this.checklists[this.currentChecklistIndex];
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
        localStorage.setItem(BaseChecklistService._TO_DO_STORE_KEY + this.checklistName + '_live', JSON.stringify([this._createEmptyChecklist()]));
        this.read();
    }

    resetBetaChecklist(): void {
        localStorage.setItem(BaseChecklistService._TO_DO_STORE_KEY + this.checklistName + '_beta', JSON.stringify([this._createEmptyChecklist()]));
        this.read()
    }

    protected _createEmptyChecklist(): Checklist {
        return {
            version: BaseChecklistService._CURRENT_TO_DO_VERSION,
            entries: []
        } satisfies Checklist
    }
}
