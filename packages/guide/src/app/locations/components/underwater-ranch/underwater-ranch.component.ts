import { Component } from '@angular/core';
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { ProductSizeByMood, ShopItemData, ShopName } from "@ci/data-types";
import { combineLatest, Observable, of, switchMap } from "rxjs";
import { MappedAnimalShopData } from "../../types/mapped-animal-shop-data.type";
import { AsyncPipe } from "@angular/common";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { ShopItemDataDetailsComponent } from "../shop-item-data-details/shop-item-data-details.component";
import { AnimalDetailsComponent } from "../animal-details/animal-details.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { OpeningHoursComponent } from "../opening-hours/opening-hours.component";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { ShopItemDataTableComponent } from "../tables/shop-item-data-table/shop-item-data-table.component";
import { AnimalMoodTableComponent } from "../tables/animal-mood-table/animal-mood-table.component";

@Component({
    selector: 'app-underwater-ranch',
    templateUrl: './underwater-ranch.component.html',
    imports: [AsyncPipe, UiIconComponent, ListDetailContainerComponent, ShopItemDataDetailsComponent, AnimalDetailsComponent, CardComponent, OpeningHoursComponent, DataFilterComponent, ItemIconComponent, ShopItemDataTableComponent, AnimalMoodTableComponent]
})
export class UnderwaterRanchComponent extends BaseShopComponent {

    protected shopName: ShopName = "underwater-ranch";
    protected animalData$: Observable<MappedAnimalShopData[]>;

    protected selectedAnimal?: MappedAnimalShopData
    protected sizeByMood$: Observable<ProductSizeByMood[]>;

    constructor() {
        super();
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
        this.sizeByMood$ = this._database.fetchAnimalMoodData$();
        this.animalData$ = combineLatest([
            this._database.fetchAnimals$(),
            this._database.fetchAnimalShopData$(this.shopName)
        ]).pipe(
            switchMap(([animals, shopData]) => {

                return of(
                    shopData.map(stopEntry => {
                        const {animalKey, ...rest} = stopEntry;
                        return {...rest, animal: animals.find(animal => animal.key === animalKey)}
                    })
                )
            })
        );

    }

    override showDetails(selectedEntry: ShopItemData) {
        super.showDetails(selectedEntry);
        this.selectedAnimal = undefined;
    }

    showAnimal(shopItem: MappedAnimalShopData) {
        this.selectedAnimal = shopItem;
        this.selectedEntity = undefined;
        this.listDetail.open()
    }
}
