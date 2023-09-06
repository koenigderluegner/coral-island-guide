import { ShopName } from "@ci/data-types";
import { Type } from "@angular/core";
import { BlacksmithComponent } from "./components/shops/blacksmith/blacksmith.component";
import { LabComponent } from "./components/shops/lab/lab.component";
import { GeneralStoreComponent } from "./components/shops/general-store/general-store.component";
import { CarpenterComponent } from "./components/shops/carpenter/carpenter.component";
import { MerfolkGeneralStoreComponent } from "./components/shops/merfolk-general-store/merfolk-general-store.component";
import { MerfolkOracleTailStoreComponent } from "./components/shops/merfolk-oracle-tail-store/merfolk-oracle-tail-store.component";
import { PetShopComponent } from "./components/pet-shop/pet-shop.component";
import { RanchComponent } from "./components/shops/ranch/ranch.component";
import { BeachShackComponent } from "./components/shops/beach-shack/beach-shack.component";

export const shopRouteConfig: { name: ShopName, component: Type<any>, betaOnly?: true }[] = [
    {
        name: 'general-store',
        component: GeneralStoreComponent,
    }, {
        name: 'blacksmith',
        component: BlacksmithComponent
    },
    {
        name: 'lab',
        component: LabComponent,
    },
    {
        name: 'carpenter',
        component: CarpenterComponent,
    },
    {
        name: 'ranch',
        component: RanchComponent,
    },
    {
        name: 'pet-shop',
        component: PetShopComponent,
    },
    {
        name: 'beach-shack',
        component: BeachShackComponent,
    },
    {
        name: 'merfolk-general-store',
        component: MerfolkGeneralStoreComponent,
    },
    {
        name: 'merfolk-oracle-tail-store',
        component: MerfolkOracleTailStoreComponent,
    },
]
