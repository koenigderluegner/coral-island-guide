import { ApplicationRef, Component, ComponentRef, createComponent, EnvironmentInjector, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DatabaseService } from "../shared/services/database.service";
import { Item, Quality } from "@ci/data-types";
import { getQuality } from "@ci/util";
import { FormControl } from "@angular/forms";
import { concat, debounceTime, map, Observable, startWith, take, tap } from "rxjs";
import { DatabaseDetailsComponent } from "./components/database-details/database-details.component";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
    styleUrls: ['./database.component.css'],
})
export class DatabaseComponent implements OnInit {

    protected readonly items: Item[];

    protected searchTermControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
    protected filteredItems$: Observable<Item[]>;
    protected shouldHideImportantNote = false;

    private localStorageHideNoteKey = 'databaseHideImportantNote';
    private filteredAmount = 0;


    constructor(
        private route: ActivatedRoute,
        private database: DatabaseService,
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) {

        this.shouldHideImportantNote = coerceBooleanProperty(localStorage.getItem(this.localStorageHideNoteKey));

        this.items = database.getItems().filter(item => getQuality(item.id) === Quality.BASE);
        const mapToItems = map<string, Item[]>(searchTerm => {
            const items = this.items.filter(item => item.displayName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
            this.filteredAmount = items.length;
            return items
        });
        this.filteredItems$ = concat(
            this.searchTermControl.valueChanges.pipe(startWith(''), mapToItems, take(1)),
            this.searchTermControl.valueChanges.pipe(
                debounceTime(300),
                tap(() => {
                    document.getElementById("database-details")?.remove();
                }),
                mapToItems
            )
        )
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            console.log(params);
        });
    }

    showDetails(itemProcess: Item, index: number) {
        console.log(index, itemProcess);

        document.getElementById("database-details")?.remove();


        const grid = document.getElementById('grid')
        if (!grid) return;
        const gridComputedStyle = window.getComputedStyle(grid);

        // get number of grid rows
        const gridRowCount = gridComputedStyle.getPropertyValue("grid-template-rows").split(" ").length;

// get number of grid columns
        const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

        console.log(gridRowCount, gridColumnCount);
        const clickedRow = Math.floor(index / gridColumnCount);
        const insertAfter = Math.min(this.filteredAmount, (clickedRow + 1) * gridColumnCount);

        console.log(clickedRow, insertAfter);

        const insertAfterElement = document.querySelector(`#grid app-item-icon:nth-of-type(${insertAfter})`) as HTMLElement | null;
        if (!insertAfterElement) return;
        let component = this.createComponent(itemProcess)

        this.insertAfter(component, insertAfterElement);

    }

    insertAfter(newNode: ComponentRef<DatabaseDetailsComponent>, existingNode: HTMLElement) {
        existingNode.parentNode?.insertBefore(newNode.location.nativeElement, existingNode.nextSibling);
        this.appRef.attachView(newNode.hostView);
    }


    createComponent(value: Item): ComponentRef<DatabaseDetailsComponent> {
        const componentRef = createComponent(DatabaseDetailsComponent, {
            environmentInjector: this.injector
        });

        componentRef.setInput('item', value)
        let nativeElement = componentRef.location.nativeElement;

        nativeElement.id = 'database-details';


        return componentRef;

    }

    hideImportantNote() {
        this.shouldHideImportantNote = true;
        localStorage.setItem(this.localStorageHideNoteKey, 'true');
    }
}
