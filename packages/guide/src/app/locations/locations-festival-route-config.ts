import { Type } from "@angular/core";
import { GenericFestivalComponent } from "./components/generic-festival/generic-festival.component";
import { FestivalRouteData } from "./types/festival-route-data.type";

export const festivalRouteConfig: {
    component: Type<any>,
    betaOnly?: true,
    data: FestivalRouteData
}[] = [
    {
        component: GenericFestivalComponent,
        data: {
            name: "winter-fair",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "cherry-blossom",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "animal",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "beach-clean-up",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "harvest",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "spooky",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "new-year-eve",
        }
    },
    {
        component: GenericFestivalComponent,
        data: {
            name: "tree-planting",
        }
    },
]
