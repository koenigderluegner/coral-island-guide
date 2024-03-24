import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class HeartEventsChecklistService extends BaseChecklistService {

    constructor() {
        super('heart-events')
    }
}
