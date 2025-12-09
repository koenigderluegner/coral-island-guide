import { SourceString } from '../../types/source-string.type';
import { ObjectPath } from '../../types/object-path.type';

export interface RawSpecialItem {
    id: string;
    advancedVariant: string[];
    name: SourceString;
    description: SourceString;
    icon: ObjectPath;
}
