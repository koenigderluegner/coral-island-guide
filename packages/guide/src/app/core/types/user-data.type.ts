import { ToDo } from "./to-do.type";
import { SpecificDate } from "@ci/data-types";

export type UserData = {
    name: string;
    myGuideDate: SpecificDate;
    todos: ToDo[]
}
