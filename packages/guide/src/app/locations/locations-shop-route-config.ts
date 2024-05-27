import { ShopName } from "@ci/data-types";
import { Type } from "@angular/core";
import { BlacksmithComponent } from "./components/shops/blacksmith/blacksmith.component";
import { LabComponent } from "./components/shops/lab/lab.component";
import { GeneralStoreComponent } from "./components/shops/general-store/general-store.component";
import { CarpenterComponent } from "./components/shops/carpenter/carpenter.component";
import { MerfolkGeneralStoreComponent } from "./components/shops/merfolk-general-store/merfolk-general-store.component";
import { MerfolkOracleTailStoreComponent } from "./components/shops/merfolk-oracle-tail-store/merfolk-oracle-tail-store.component";
import { PetShopComponent } from "./components/pet-shop/pet-shop.component";
import { RanchComponent } from "./components/ranch/ranch.component";
import { BeachShackComponent } from "./components/shops/beach-shack/beach-shack.component";
import { ConcernedMonkeyComponent } from "./components/shops/concerned-monkey/concerned-monkey.component";
import { BosComponent } from "./components/shops/bos/bos.component";
import { BensCaravanComponent } from "./components/shops/bens-caravan/bens-caravan.component";
import { SocketAndPanComponent } from "./components/shops/socket-and-pan/socket-and-pan.component";
import { WhiteFlamingoComponent } from "./components/shops/white-flamingo/white-flamingo.component";
import { CoffeeComponent } from "./components/shops/coffee/coffee.component";
import { TavernComponent } from "./components/shops/tavern/tavern.component";
import { Route } from "@angular/router";

export const shopRouteConfig: ({ name: ShopName, betaOnly?: true } & ({ component: Type<any>, } | {
    loadComponent: Route['loadComponent']
}))[] = [
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
        name: 'bos',
        component: BosComponent,
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
        name: 'bens-caravan',
        component: BensCaravanComponent,
    },
    {
        name: 'socket-and-pan',
        component: SocketAndPanComponent,
    },
    {
        name: 'beach-shack',
        component: BeachShackComponent,
    },
    {
        name: 'concerned-monkey',
        component: ConcernedMonkeyComponent,
    },
    {
        name: 'merfolk-general-store',
        component: MerfolkGeneralStoreComponent,
    },
    {
        name: 'merfolk-oracle-tail-store',
        component: MerfolkOracleTailStoreComponent,
    },
    {
        name: 'tidal-threads',
        loadComponent: () => import('./components/shops/tidal-threads.component').then(c => c.TidalThreadsComponent),
        betaOnly: true
    },
    {
        name: 'underwater-ranch',
        loadComponent: () => import('./components/underwater-ranch/underwater-ranch.component').then(c => c.UnderwaterRanchComponent),
        betaOnly: true
    },
    {
        name: 'taco-truck',
        loadComponent: () => import('./components/shops/taco-truck.component').then(c => c.TacoTruckComponent),
        betaOnly: true
    },
    {
        name: 'ramen-shop',
        loadComponent: () => import('./components/shops/ramen-shop.component').then(c => c.RamenShopComponent),
        betaOnly: true
    },
    {
        name: 'sales-cart-stall',
        loadComponent: () => import('./components/shops/sales-cart-stall.component').then(c => c.SalesCartStallComponent),
        betaOnly: true
    },
    {
        name: 'furniture-store',
        loadComponent: () => import('./components/shops/furniture-store.component').then(c => c.FurnitureStoreComponent),
    },
    {
        name: 'white-flamingo',
        component: WhiteFlamingoComponent,
    },
    {
        name: 'tavern',
        component: TavernComponent,
    },
    {
        name: 'coffee',
        component: CoffeeComponent,
    },
]
