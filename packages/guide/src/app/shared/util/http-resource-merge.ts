import { computed, Signal } from '@angular/core';
import { HttpResourceRef } from '@angular/common/http';


export function merge<T extends HttpResourceRef<any>[]>(
    ...signals: T
): {
    isLoading: Signal<boolean>;
    values: Signal<{ [K in keyof T]: T[K] extends HttpResourceRef<infer U> ? Exclude<U, undefined> : never } | null>
} {

    return {
        isLoading: computed(() => {
            const values = signals.map(s => s.isLoading());
            return values.some(s => s)
        }),
        values: computed(() => {

            const values = signals.map(s => s.hasValue());

            if (values.some(signal => !signal)) return null;

            return signals.map(signal => signal.value()) as any;
        })
    };

}
