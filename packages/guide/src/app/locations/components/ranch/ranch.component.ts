import { Component, computed } from '@angular/core';
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { ProductSizeByMood, ShopItemData, ShopName } from "@ci/data-types";
import { Observable } from "rxjs";
import { MappedAnimalShopData } from "../../types/mapped-animal-shop-data.type";
import { ShopItemDataDetailsComponent } from "../shop-item-data-details/shop-item-data-details.component";
import { ListDetailContainerComponent } from "../../../shared/components/list-detail-container/list-detail-container.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { UiIconComponent } from "../../../shared/components/ui-icon/ui-icon.component";
import { AsyncPipe } from "@angular/common";
import { OpeningHoursComponent } from "../opening-hours/opening-hours.component";
import { DataFilterComponent } from "../../../shared/components/data-filter/data-filter.component";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { ShopItemDataTableComponent } from "../tables/shop-item-data-table/shop-item-data-table.component";
import { AnimalMoodTableComponent } from "../tables/animal-mood-table/animal-mood-table.component";
import { AnimalDetailsComponent } from "../animal-details/animal-details.component";
import { merge } from "../../../shared/util/http-resource-merge";

@Component({
    selector: 'app-ranch',
    templateUrl: './ranch.component.html',

    imports: [
        ShopItemDataDetailsComponent,
        ListDetailContainerComponent,
        CardComponent,
        UiIconComponent,
        AsyncPipe,
        OpeningHoursComponent,
        DataFilterComponent,
        ItemIconComponent,
        ShopItemDataTableComponent,
        AnimalMoodTableComponent,
        AnimalDetailsComponent
    ]
})
export class RanchComponent extends BaseShopComponent {

    protected shopName: ShopName = "ranch";
    #animalRequests = merge(this._database.fetchAnimals(), this._database.fetchAnimalShopData(this.shopName))
    animalData = computed<MappedAnimalShopData[] | null>(() => {
        const values = this.#animalRequests.values();
        if (!values) return null;
        const [animals, shopData] = values;

        return shopData.map(stopEntry => {
            const {animalKey, ...rest} = stopEntry;
            return {...rest, animal: animals.find(animal => animal.key === animalKey)}
        });
    })
    protected selectedAnimal?: MappedAnimalShopData
    protected sizeByMood$: Observable<ProductSizeByMood[]>;

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
        this.openingHours$ = this._database.fetchOpeningHours$(this.shopName);
        this.sizeByMood$ = this._database.fetchAnimalMoodData$();

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
