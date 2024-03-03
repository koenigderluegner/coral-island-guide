import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class CookingRecipesChecklistService extends BaseChecklistService {

    constructor() {
        super('cooking-recipes')
    }
}
