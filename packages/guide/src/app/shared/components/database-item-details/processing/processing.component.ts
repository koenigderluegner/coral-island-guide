import { booleanAttribute, Component, inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemProcessing } from "@ci/data-types";
import { SharedModule } from "../../../shared.module";
import { DatabaseService } from "../../../services/database.service";
import { AddSpacesToPascalCasePipe } from "../../../pipes/add-spaces-to-pascal-case.pipe";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-processing',
    imports: [CommonModule, SharedModule, AddSpacesToPascalCasePipe, RouterLink],
    templateUrl: './processing.component.html'
})
export class ProcessingComponent {
 readonly itemProcessing = input.required<ItemProcessing>();
    readonly hideMaschine = input(false, { transform: booleanAttribute });
    protected processorMapping = inject(DatabaseService).getProcessorMapping();

}
