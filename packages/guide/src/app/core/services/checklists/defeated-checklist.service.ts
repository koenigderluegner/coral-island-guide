import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
    providedIn: 'root'
})
export class DefeatedChecklistService extends BaseChecklistService {

    constructor() {
        super('defeated')
    }
}
