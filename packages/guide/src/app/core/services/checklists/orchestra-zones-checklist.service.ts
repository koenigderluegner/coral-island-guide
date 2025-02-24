import { Injectable } from '@angular/core';
import { BaseChecklistService } from "./base-checklist.service";

@Injectable({
  providedIn: 'root'
})
export class OrchestraZonesChecklistService extends BaseChecklistService {

    constructor() {
        super('orchestra-zones')
    }
}
