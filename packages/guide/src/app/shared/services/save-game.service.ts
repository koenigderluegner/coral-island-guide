import { Injectable } from '@angular/core';
import { Buffer } from 'buffer';
// @ts-ignore
import { Gvas, NodeSerializer, PropertyFactory } from 'uesavetool';
import { from, map, Observable } from 'rxjs';

// TODO clean up :D
type Tuple = { Type: 'Tuple', Properties: Property[] };
type ArrayProperty = { Type: 'ArrayProperty', "StoredPropertyType": "StructProperty", Property: Property & { Properties: Property[] } };
type StructProperty = { Type: 'StructProperty', "StoredPropertyType": string, Properties: Tuple[] };
type StrProperty = { Type: 'StrProperty', Property: string };
type EnumProperty = { Type: 'EnumProperty', Property: string; EnumType: string; };
type IntProperty = { Type: 'IntProperty', Property: [number, number] };
type Int64Property = { Type: 'Int64Property', Property: [number, number] };
type Property =
    (Tuple | ArrayProperty | StructProperty | StrProperty | IntProperty | EnumProperty | Int64Property)
    & {
    Name: string
    Type: string
}

interface SaveGame {
    "Slots": {
        "Version": number,
        "originalVersion": number,
        "slotIndex": number,
        "playerName": string,
        "farmName": string,
        "gameDate": {
            "day": number,
            "season": string,
            "year": number
        },
        "gold": number,
        "lastSaved": number
    }[];
}


@Injectable({
    providedIn: 'root'
})
export class SaveGameService {
    private _file$?: Observable<SaveGame>;

    loadFile(file: File): Observable<SaveGame> {

        this._file$ = from(file.arrayBuffer())
            .pipe(
                map(buffer => {

                        const buf = Buffer.from(buffer);
                        const serializer = new NodeSerializer(buf);
                        const gvas = new Gvas(serializer);

                        let deserializedFile;

                        try {

                            deserializedFile = gvas.deserialize();

                            (this._removeNullBytes(deserializedFile.Properties));

                            deserializedFile = (this._parseProperties(deserializedFile.Properties));
                        } catch (e) {
                            throw (new Error('Cannot parse file. Make sure to load a Coral Island save file.'));
                        }
                        if (!deserializedFile['Slots']?.length)
                            throw (new Error('Wrong file format.'));

                        return deserializedFile as SaveGame;

                    }
                )
            );

        return this._file$;
    }

    _removeNullBytes<T>(obj: T): T {
        for (const k in obj) {
            if (typeof obj[k] == "object" && obj[k] !== null)
                this._removeNullBytes(obj[k]);
            else {
                if (typeof obj[k] === 'string') {
                    // @ts-ignore
                    obj[k] = (obj[k] as unknown as string).replaceAll('\x00', '');
                }
            }
        }

        return obj;
    }


    _parseProperties(Properties: Property): Record<string, any> {

        let result: Record<string, any> = {};
        switch (Properties.Type) {
            case 'Tuple':
                Properties.Properties.forEach(p => result = {...result, ...this._parseProperties(p)});
                break;
            case 'StructProperty':
                result[Properties.Name] = {};
                Properties.Properties.forEach(t => t.Properties.forEach(p => result[Properties.Name] = {...result[Properties.Name], ...this._parseProperties(p)}));
                break;
            case 'ArrayProperty':
                result[Properties.Name] = Properties.Property;
                result[Properties.Name] = Properties.Property.Properties.map(p => this._parseProperties(p));
                break;
            case 'StrProperty':
                result[Properties.Name] = Properties.Property;

                break;
            case 'EnumProperty':
                result[Properties.Name] = Properties.Property.replace(Properties.EnumType + '::', '');

                break;
            case 'IntProperty':
            case 'Int64Property':
                result[Properties.Name] = Properties.Property[1];
                break;
        }
        return result;
    }

}
