import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, inject, Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { GridPlaceable } from "../interfaces/grid-placeable.interface";

@Injectable({
    providedIn: 'root'
})
export class PlannerService {

    cellSize = 28;
    private readonly _selectedItemKey: Subject<string> = new Subject<string>()
    private injector: EnvironmentInjector = inject(EnvironmentInjector);
    private appRef: ApplicationRef = inject(ApplicationRef);

    getSelectedItemKey(): Observable<string> {
        return this._selectedItemKey.asObservable()
    }

    updateSelectedItemKey(itemKey: string): void {
        this._selectedItemKey.next(itemKey)
    }

    createComponent<T>(value: GridPlaceable<T>): ComponentRef<T> {
        const componentRef = createComponent(value.component, {
            environmentInjector: this.injector
        });


        for (let inputName of value.inputs.keys()) {
            componentRef.setInput(inputName, value.inputs.get(inputName));
        }
        let nativeElement = componentRef.location.nativeElement;
        nativeElement.style.width = value.width * this.cellSize + 1 + 'px';
        nativeElement.style.height = value.height * this.cellSize + 1 + 'px';


        return componentRef;

    }

    attachComponent(query: string | Element | null, component: ComponentRef<any>): void {
        (typeof query === "string" ? document.querySelector(query) : query)?.appendChild(component.location.nativeElement);
        this.appRef.attachView(component.hostView);
    }

}
