import { ObjectPath } from '../types/object-path.type';

export interface Frame {
    Type: string;
    Name: string;
    Properties: {
        BakedSourceUV: {
            X: number;
            Y: number;
        };
        BakedSourceDimension: {
            X: number;
            Y: number;
        };
        BakedSourceTexture?: ObjectPath;
        BodySetup?: ObjectPath;
    };
}
