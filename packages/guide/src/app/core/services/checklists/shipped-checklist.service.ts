import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class ShippedChecklistService extends BaseChecklistService {

    constructor() {
        super('shipped')
    }
}
