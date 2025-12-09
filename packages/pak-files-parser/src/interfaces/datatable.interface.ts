import { ObjectPath } from '../types/object-path.type';

export interface Datatable<T> {
    Type: string;
    Name: string;
    Properties: {
        RowStruct: ObjectPath;
    };
    Rows: {
        [key: string]: T;
    };
}
