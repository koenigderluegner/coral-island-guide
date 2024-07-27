import { ToDo } from "./to-do.type";
import { SpecificDate } from "@ci/data-types";

export type UserData = {
    myGuideDate: SpecificDate;
    todos: ToDo[]
}
