import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class MuseumChecklistService extends BaseChecklistService {

    constructor() {
        super('museum')
    }
}
