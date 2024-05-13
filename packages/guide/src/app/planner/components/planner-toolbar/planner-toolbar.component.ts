import { Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { PlaceableItemsMap } from "../../registered-planner-items";
import { PlannerService } from "../../services/planner.service";
import { combineLatest } from "rxjs";
import { ItemIconComponent } from "../../../shared/components/item-icon/item-icon.component";
import { DatabaseService } from "../../../shared/services/database.service";
import { Crop, FruitPlant, FruitTree } from "@ci/data-types";


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

                const produceNode = this._registerProduces(crops, plants, trees);
                this.navigation.root.children.push(produceNode);

                const buildingsNode = this._registerBuildings();
                this.navigation.root.children.push(buildingsNode);

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

    private _registerBuildings(): TreeNode {
        // core /hismcmanager/farmbuilding
        const buildingsNode: TreeNode = {
            key: 'Buildings',
            children: []
        }

        const buildings: {
            key: string;
            label: string;
            size: { width: number; length: number },
            iconName: string
        }[] = [];

        [
            {itemKey: 'item_110001', size: {width: 8, length: 5}},  // barn level 1
            {itemKey: 'item_110004', size: {width: 7, length: 4}},  // coop level 1
            {itemKey: 'item_110007', size: {width: 4, length: 3}},  // mill
            {itemKey: 'item_110008', size: {width: 9, length: 8}},  // shed
            {itemKey: 'item_110009', size: {width: 15, length: 12}},  // large shed
            {itemKey: 'item_110010', size: {width: 3, length: 3}},  // silo
            {itemKey: 'item_110011', size: {width: 4, length: 3}},  // stable
            {itemKey: 'item_110012', size: {width: 3, length: 3}},  // well
            {itemKey: 'item_110013', size: {width: 1, length: 1}},  // shipping bin
            {itemKey: 'item_110014', size: {width: 1, length: 1}},  // pet house
            {itemKey: 'item_110023', size: {width: 5, length: 5}},  // fish pond
            {itemKey: 'item_65444', size: {width: 5, length: 5}},  // insect house
        ].forEach(({itemKey, size}) => {
            const item = this._db.getItems().find(item => item.id === itemKey);
            if (item) {
                buildings.push({
                    key: itemKey,
                    label: item.displayName,
                    iconName: item.iconName ?? 'placeholder.png',
                    size
                })
            }
        })


        buildings.forEach(building => {
            const key = building.key;
            const label = building.label;
            PlaceableItemsMap.set(building.key, {
                component: ItemIconComponent,
                width: building.size.width,
                height: building.size.length,
                layer: 2,
                inputs: new Map<string, unknown>([
                    ['itemName', building.iconName]
                ])
            });

            const treeNode: TreeNode = {
                key, label, children: []
            }
            buildingsNode.children.push(treeNode);
        })


        return buildingsNode

    }

    private _registerProduces(crops: Crop[], plants: FruitPlant[], trees: FruitTree[]): TreeNode {
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
            if (!crop.dropData.length) return;

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
            if (crop.growableSeason.includes("Spring")) {
                springCropsNode.children.push(treeNode)
            }
            if (crop.growableSeason.includes("Summer")) {
                summerCropsNode.children.push(treeNode)
            }
            if (crop.growableSeason.includes("Fall")) {
                fallCropsNode.children.push(treeNode)
            }
            if (crop.growableSeason.includes("Winter")) {
                winterCropsNode.children.push(treeNode)
            }


        });

        plants.forEach(crop => {
            const dropData = crop.dropData[0];
            if (!dropData) return;
            const key = dropData?.itemId;
            const label = dropData.item?.displayName;
            PlaceableItemsMap.set(dropData.itemId, {
                component: ItemIconComponent,
                width: crop.size.width,
                height: crop.size.length,
                layer: 2,
                inputs: new Map<string, unknown>([
                    ['itemName', dropData.item?.iconName ?? 'placeholder.png']
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
        return produceNode;
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
