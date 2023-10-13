import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class OfferingChecklistService extends BaseChecklistService {

    constructor() {
        super('offerings')
    }
}
