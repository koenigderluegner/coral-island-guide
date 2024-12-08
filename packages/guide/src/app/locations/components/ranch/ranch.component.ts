import { Component } from '@angular/core';
import { BaseShopComponent } from "../base-shop/base-shop.component";
import { ProductSizeByMood, ShopItemData, ShopName } from "@ci/data-types";
import { combineLatest, Observable, of, switchMap } from "rxjs";
import { MappedAnimalShopData } from "../../types/mapped-animal-shop-data.type";

@Component({
    selector: 'app-ranch',
    templateUrl: './ranch.component.html',
    standalone: false
})
export class RanchComponent extends BaseShopComponent {

    protected shopName: ShopName = "ranch";
    protected animalData$: Observable<MappedAnimalShopData[]>;

    protected selectedAnimal?: MappedAnimalShopData
    protected sizeByMood$: Observable<ProductSizeByMood[]>;

    constructor() {
        super();
        this.shopItemData$ = this._database.fetchShopItemData$(this.shopName);
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
