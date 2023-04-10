import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { PlaceableItemsMap } from "../../registered-planner-items";
import { PlannerService } from "../../services/planner.service";
import { combineLatest } from "rxjs";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { DatabaseService } from "../../../shared/services/database.service";
import { Season } from "@ci/data-types";


interface Tree {
    root: TreeNode;
}

interface TreeNode {
    key: string;
    label?: string;
    children: TreeNode[];
}


@Component({
    selector: 'app-planner-toolbar',
    templateUrl: './planner-toolbar.component.html',
    styleUrls: ['./planner-toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class PlannerToolbarComponent {

    navigation: Tree = {
        root: {
            key: '',
            children: []
        }
    }

    @HostBinding('class.planner-toolbar') private _setClass = true;

    constructor(
        private readonly _plannerService: PlannerService,
        private readonly _db: DatabaseService
    ) {


        combineLatest([
            this._db.fetchCrops$(),
            this._db.fetchFruitPlants$(),
            this._db.fetchFruitTrees$(),
        ]).subscribe({
            next: ([crops, plants, trees]) => {


                const fruitPlantsNode: TreeNode = {
                    key: 'Fruit plants',
                    children: []
                }

                const fruitTreesNode: TreeNode = {
                    key: 'Fruit trees',
                    children: []
                }


                const springCropsNode: TreeNode = {
                    key: 'Spring crops',
                    children: []
                }

                const summerCropsNode: TreeNode = {
                    key: 'Summer crops',
                    children: []
                }

                const fallCropsNode: TreeNode = {
                    key: 'Fall crops',
                    children: []
                }

                const winterCropsNode: TreeNode = {
                    key: 'Winter crops',
                    children: []
                }


                crops.forEach(crop => {
                    const key = crop.dropData[0].itemId;
                    const label = crop.dropData[0].item?.displayName;
                    PlaceableItemsMap.set(crop.dropData[0].itemId, {
                        component: ItemIconComponent,
                        width: crop.size.width,
                        height: crop.size.length,
                        layer: 2,
                        inputs: new Map<string, unknown>([
                            ['itemName', crop.dropData[0].item?.iconName ?? 'placeholder.png']
                        ])
                    });

                    const treeNode = {
                        key,
                        label,
                        children: []
                    };
                    if (crop.growableSeason.includes(Season.SPRING)) {
                        springCropsNode.children.push(treeNode)
                    }
                    if (crop.growableSeason.includes(Season.SUMMER)) {
                        summerCropsNode.children.push(treeNode)
                    }
                    if (crop.growableSeason.includes(Season.FALL)) {
                        fallCropsNode.children.push(treeNode)
                    }
                    if (crop.growableSeason.includes(Season.WINTER)) {
                        winterCropsNode.children.push(treeNode)
                    }


                });

                plants.forEach(crop => {
                    const key = crop.dropData[0].itemId;
                    const label = crop.dropData[0].item?.displayName;
                    PlaceableItemsMap.set(crop.dropData[0].itemId, {
                        component: ItemIconComponent,
                        width: crop.size.width,
                        height: crop.size.length,
                        layer: 2,
                        inputs: new Map<string, unknown>([
                            ['itemName', crop.dropData[0].item?.iconName ?? 'placeholder.png']
                        ])
                    });

                    fruitPlantsNode.children.push({
                        key,
                        label,
                        children: []
                    })

                });


                trees.forEach(crop => {

                    const key = crop.dropData[0].itemId;
                    const label = crop.dropData[0].item?.displayName;
                    PlaceableItemsMap.set(key, {
                        component: ItemIconComponent,
                        width: crop.size.width,
                        height: crop.size.length,
                        layer: 2,
                        inputs: new Map<string, unknown>([
                            ['itemName', crop.dropData[0].item?.iconName ?? 'placeholder.png']
                        ])
                    });

                    fruitTreesNode.children.push({
                        key,
                        label,
                        children: []
                    })


                });

                const produceNode: TreeNode = {
                    key: '',
                    label: 'Produce',
                    children: []
                }

                produceNode.children.push(springCropsNode);
                produceNode.children.push(summerCropsNode);
                produceNode.children.push(fallCropsNode);
                produceNode.children.push(winterCropsNode);

                produceNode.children.push(fruitPlantsNode);
                produceNode.children.push(fruitTreesNode);


                this.navigation.root.children.push(produceNode);

                this.createPlaceableList()

            }
        })
    }

    treeNodeToUl(treeNodes: TreeNode[]): HTMLUListElement {
        const secondLevelList = document.createElement('ul');

        treeNodes.forEach(tn => {
            const key = tn.key


            const secondLevelListItem = document.createElement('li');


            const value = PlaceableItemsMap.get(key);
            if (value) {
                const componentRef = this._plannerService.createComponent(value);
                this._plannerService.attachComponent(secondLevelListItem, componentRef);
            }
            if (!tn.children.length)
                secondLevelListItem.addEventListener('click', () =>
                    this._plannerService.updateSelectedItemKey(key)
                );


            const textNode = document.createTextNode(tn.label ?? tn.key)

            secondLevelListItem.appendChild(textNode)

            if (tn.children.length) {
                const childList = this.treeNodeToUl(tn.children);
                secondLevelListItem.appendChild(childList);
            }

            secondLevelList.appendChild(secondLevelListItem)


        })

        return secondLevelList
    }

    private createPlaceableList() {

        const topLevelList = document.createElement('ul');
        this.navigation.root.children.forEach(treeNode => {

            const topLevelListItem = document.createElement('li');
            const textNode = document.createTextNode(treeNode.label ?? treeNode.key)
            topLevelListItem.appendChild(textNode)

            const secondLevelList = this.treeNodeToUl(treeNode.children);

            topLevelListItem.appendChild(secondLevelList);
            topLevelList.appendChild(topLevelListItem);

        });

        const elementById = document.querySelector('.planner-toolbar');
        if (!elementById) return;
        elementById.innerHTML = ''
        elementById.appendChild(topLevelList)


    }

}
