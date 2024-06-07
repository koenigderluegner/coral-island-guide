import { booleanAttribute, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemProcessing } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";
import { DatabaseService } from "../../../services/database.service";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-processing',
    standalone: true,
    imports: [CommonModule, SharedModule, AddSpacesToPascalCasePipe, RouterLink],
    templateUrl: './processing.component.html'
})
export class ProcessingComponent {
    @Input({required: true}) itemProcessing!: ItemProcessing;
    @Input({transform: booleanAttribute}) hideMaschine = false;
    protected processorMapping = inject(DatabaseService).getProcessorMapping();

}
