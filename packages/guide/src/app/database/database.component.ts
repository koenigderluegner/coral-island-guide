import { ApplicationRef, Component, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from "../shared/services/database.service";
import { Item, Quality } from "@ci/data-types";
import { getQuality } from "@ci/util";
import { FormControl } from "@angular/forms";
import { concat, debounceTime, map, Observable, take, tap } from "rxjs";
import { DatabaseDetailsComponent } from "./components/database-details/database-details.component";
import { coerceBooleanProperty } from "@angular/cdk/coercion";

@Component({
    selector: 'app-database',
    templateUrl: './database.component.html',
})
export class DatabaseComponent {

    protected readonly items: Item[];
    protected searchTermControl: FormControl<string> = new FormControl<string>('', {nonNullable: true});
    protected filteredItems$: Observable<Item[]>;
    protected shouldHideImportantNote = false;
    protected filteredItems: Item[] = [];
    protected allPrefetched = false;

    private _localStorageHideNoteKey = 'databaseHideImportantNote';
    private _didInitialLoad = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private database: DatabaseService,
        private appRef: ApplicationRef,
        private injector: EnvironmentInjector
    ) {
        this.database.getDatabaseDetails().pipe(
            tap(() => this.allPrefetched = true),
            take(1)
        ).subscribe();
        this.shouldHideImportantNote = coerceBooleanProperty(localStorage.getItem(this._localStorageHideNoteKey));

        this.items = database.getItems().filter(item => getQuality(item.id) === Quality.BASE);
        const mapToItems = map<string, Item[]>(searchTerm => {
            const items = this.items.filter(item => item.displayName.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
            this.filteredItems = items;
            return items
        });


        this.filteredItems$ =
            concat(
                this.route.queryParams.pipe(map(params => {
                        const value = params['q'] ?? '';
                        this.searchTermControl.setValue(value, {emitEvent: false});
                        return value;
                    }), mapToItems,

                    take(1)),
                this.searchTermControl.valueChanges.pipe(
                    debounceTime(300),
                    tap((searchTerm) => {
                        this.updateQueryParam(searchTerm);
                        document.getElementById("database-details")?.remove();
                    }),
                    mapToItems,
                )
            )
    }


    showDetails(itemProcess: Item, index: number, scrollIntoView = false) {
        console.log(index, itemProcess);

        this.updateRouteParam(itemProcess.id);

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
        const insertAfter = Math.min(this.filteredItems.length, (clickedRow + 1) * gridColumnCount);

        console.log(clickedRow, insertAfter);

        const insertAfterElement = document.querySelector(`#grid app-item-icon:nth-of-type(${insertAfter})`) as HTMLElement | null;
        if (!insertAfterElement) return;
        let component = this.createComponent(itemProcess)

        this.insertAfter(component, insertAfterElement);

        if (scrollIntoView)
            setTimeout(() => document.getElementById("database-details")?.scrollIntoView(true), 0)

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
        localStorage.setItem(this._localStorageHideNoteKey, 'true');
    }

    public updateQueryParam(searchTerm: string) {


        this.router.navigate(
            [],
            {
                relativeTo: this.route,
                queryParams: {q: searchTerm},
                queryParamsHandling: 'merge',
                replaceUrl: true
            });
    }

    public updateRouteParam(itemId: string) {

        this.router.navigate(
            ['..', itemId],
            {
                relativeTo: this.route,
                replaceUrl: true,
                queryParamsHandling: "preserve"
            });
    }

    initialItemLoad(): void {
        if (this._didInitialLoad) return;
        this.route.params.pipe(
            tap(params => {
                const itemId = params['itemId'];
                this._didInitialLoad = true;
                if (!itemId) return;
                const indexOfItem = this.filteredItems.findIndex(item => item.id === itemId);

                if (indexOfItem > -1) {
                    this.showDetails(this.filteredItems[indexOfItem], indexOfItem, true);
                }

            }),
            take(1)
        ).subscribe()
    }
}
