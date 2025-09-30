import { Component } from '@angular/core';
import { NpcSortValues, sortOptions } from "../npc-sort-options.const";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { MatOption } from "@angular/material/autocomplete";
import { MatSelect } from "@angular/material/select";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
    selector: 'app-npc-filter',
    imports: [MatFormField, MatInput, MatLabel, MatOption, MatSelect, ReactiveFormsModule],
    templateUrl: './npc-filter.component.html'
})
export class NpcFilterComponent {
    searchControl: FormControl<string> = new FormControl<string>('', {nonNullable: true})
    sortControl: FormControl<NpcSortValues> = new FormControl<NpcSortValues>('default', {nonNullable: true})
    sortOrderControl: FormControl<'asc' | 'desc'> = new FormControl<'asc' | 'desc'>('asc', {nonNullable: true})
    searchValueChanges = toSignal(this.searchControl.valueChanges, {initialValue: ''})
    sortValueChanges = toSignal(this.sortControl.valueChanges, {initialValue: 'default'})
    sortOrderValueChanges = toSignal(this.sortOrderControl.valueChanges, {initialValue: 'asc'})
    protected readonly npcSortOptions = sortOptions;
}
