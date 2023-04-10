import { Component, OnInit } from '@angular/core';
import { OfferingAltar } from "@ci/data-types";
import { BaseDatabaseDetailPartComponent } from "../base-database-detail-part.component";
import { nonNullable } from "@ci/util";

@Component({
    selector: 'app-database-offerings',
    templateUrl: './database-offerings.component.html',
})
export class DatabaseOfferingsComponent extends BaseDatabaseDetailPartComponent implements OnInit {
    protected isRewardIn: OfferingAltar[] = []
    protected requiredAsOffering: OfferingAltar[] = [];

    ngOnInit(): void {
        if (!this.item) return;
        const recipes = this.database.getOfferings();

        this.isRewardIn = recipes.map(altar => {
            const offerings = altar.offerings.filter(offering => offering.rewards.items.find(reward => reward.item.id === this.item?.id) || offering.rewards.recipes.find(reward => reward.item.id === this.item?.id));
            if (!offerings.length) return null;
            return {...altar, offerings}
        }).filter(nonNullable);

        this.requiredAsOffering = recipes.map(altar => {
            const offerings = altar.offerings.filter(offering => offering.requiredItems.find(reward => reward.item.id === this.item?.id));
            if (!offerings.length) return null;
            return {...altar, offerings}
        }).filter(nonNullable);

    }

}
