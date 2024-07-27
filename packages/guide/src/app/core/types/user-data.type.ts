import { ToDo } from "./to-do.type";
import { SpecificDate } from "@ci/data-types";
import { Checklist } from "../interfaces/checklist.interface";

export type UserData = {
    name: string;
    myGuideDate: SpecificDate;
    todos: ToDo[];
    checklists: Record<string, Checklist>;
}
