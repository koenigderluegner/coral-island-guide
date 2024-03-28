import { ApplicationRef, Component, ComponentRef, createComponent, EnvironmentInjector } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DatabaseService } from "../shared/services/database.service";
import { Item, Quality } from "@ci/data-types";
import { getQuality } from "@ci/util";
import { FormControl } from "@angular/forms";
import { concat, debounceTime, map, Observable, take, tap } from "rxjs";
import { DatabaseDetailsComponent } from "./components/database-details/database-details.component";
import { coerceBooleanProperty } from "@angular/cdk/coercion";
import { Title } from "@angular/platform-browser";

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
    protected selectedItem?: Item;
    private _localStorageHideNoteKey = 'databaseHideImportantNote';
    private _didInitialLoad = false;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _database: DatabaseService,
        private _appRef: ApplicationRef,
        private _injector: EnvironmentInjector,
        private _title: Title,
    ) {

        this.shouldHideImportantNote = coerceBooleanProperty(localStorage.getItem(this._localStorageHideNoteKey));

        this.items = _database.getItems().filter(item => getQuality(item.id) === Quality.BASE);
        const mapToItems = map<string, Item[]>(searchTerm => {

            const regex = /tag:(?<tag>[a-zA-Z.]+)/gm;
            const match = regex.exec(searchTerm);

            const tag: string | undefined = match?.groups?.['tag'].replace('tag:', '').toLocaleLowerCase() ?? ''


            const searchString = searchTerm.replace('tag:' + tag, '').toLocaleLowerCase().trim();
            const items = this.items.filter(item => {
                let tagMatch = true;
                if (tag)
                    tagMatch = !!item.tags?.some(s => s.toLocaleLowerCase().includes(tag));

                if (!tagMatch) return false;

                return item.displayName.toLocaleLowerCase().includes(searchString) || (searchString.startsWith('item_') && item.id.startsWith(searchString))
            });

            this.filteredItems = items;
            return items
        });


        this.filteredItems$ =
            concat(
                this._route.queryParams.pipe(map(params => {
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


    showDetails(item: Item, index: number, scrollIntoView = false) {

        this.updateRouteParam(item.id);

        this.selectedItem = undefined;
        document.getElementById("database-details")?.remove();


        const grid = document.getElementById('grid')
        if (!grid) return;
        const gridComputedStyle = window.getComputedStyle(grid);

        // get number of grid columns
        const gridColumnCount = gridComputedStyle.getPropertyValue("grid-template-columns").split(" ").length;

        const clickedRow = Math.floor(index / gridColumnCount);
        const insertAfter = Math.min(this.filteredItems.length, (clickedRow + 1) * gridColumnCount);


        const insertAfterElement = document.querySelector(`#grid app-item-icon:nth-of-type(${insertAfter})`) as HTMLElement | null;
        if (!insertAfterElement) return;
        const component = this.createComponent(item)

        this.insertAfter(component, insertAfterElement);

        this.selectedItem = item;

        if (scrollIntoView)
            setTimeout(() => document.getElementById("database-details")?.scrollIntoView(true), 0)

    }

    insertAfter(newNode: ComponentRef<DatabaseDetailsComponent>, existingNode: HTMLElement) {
        existingNode.parentNode?.insertBefore(newNode.location.nativeElement, existingNode.nextSibling);
        this._appRef.attachView(newNode.hostView);
    }


    createComponent(value: Item): ComponentRef<DatabaseDetailsComponent> {
        const componentRef = createComponent(DatabaseDetailsComponent, {
            environmentInjector: this._injector
        });

        componentRef.setInput('item', value)
        const nativeElement = componentRef.location.nativeElement;

        nativeElement.id = 'database-details';


        return componentRef;

    }

    hideImportantNote() {
        this.shouldHideImportantNote = true;
        localStorage.setItem(this._localStorageHideNoteKey, 'true');
    }

    public updateQueryParam(searchTerm: string) {


        this._router.navigate(
            [],
            {
                relativeTo: this._route,
                queryParams: {q: searchTerm},
                queryParamsHandling: 'merge',
                replaceUrl: true
            });
    }

    public updateRouteParam(itemId: string) {

        this._router.navigate(
            ['..', itemId],
            {
                relativeTo: this._route,
                replaceUrl: true,
                queryParamsHandling: "preserve"
            }).then(() => !!this.selectedItem && this.updateTitle(this.selectedItem.displayName));
    }

    initialItemLoad(): void {
        if (this._didInitialLoad) return;
        this._route.params.pipe(
            tap(params => {
                const itemId = params['itemId'];
                this._didInitialLoad = true;
                if (!itemId) return;
                const indexOfFilteredItem = this.filteredItems.findIndex(item => item.id === itemId);

                if (indexOfFilteredItem > -1) {
                    this.showDetails(this.filteredItems[indexOfFilteredItem], indexOfFilteredItem, true);
                } else if (this.filteredItems.length === 0) {
                    const indexOfItem = this.items.findIndex(item => item.id === itemId);
                    if (indexOfItem > -1) {
                        const item = this.items[indexOfItem];
                        this._setGridContent(item);

                    }

                }

            }),
            take(1)
        ).subscribe()
    }

    private _setGridContent(item: Item) {
        const component = this.createComponent(item);
        document.getElementById('grid')?.appendChild(component.location.nativeElement)
        this._appRef.attachView(component.hostView);
        this.selectedItem = item;
    }

    trackById<T extends { id: string }>(index: number, item: T): string {
        return item.id;
    }

    protected updateTitle(itemName: string) {
        const title = this._title.getTitle();
        if (title) {
            this._title.setTitle(`${itemName} - ${title}`)
        }
    }

    prefetchItem(item: Item) {
        this._database.fetchDatabaseItem$(item.id).pipe(take(1)).subscribe();
    }
}
