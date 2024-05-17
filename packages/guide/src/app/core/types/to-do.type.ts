import { ToDoContext } from "./to-do-context.type";
import { ItemEntry } from "../../shared/types/item-entry.type";
import { Quality } from "@ci/data-types";

export type ToDo = {
    itemEntry: ItemEntry
    amount?: number;
    quality?: Quality;
    context?: ToDoContext;
}
