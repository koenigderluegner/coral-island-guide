import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class BoughtChecklistService extends BaseChecklistService {

    constructor() {
        super('bought')
    }
}
