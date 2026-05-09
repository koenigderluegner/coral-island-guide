import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class CraftedChecklistService extends BaseChecklistService {

    constructor() {
        super('crafted')
    }
}
