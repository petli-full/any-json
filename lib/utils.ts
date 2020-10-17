import { forOwn, isArray, isPlainObject } from 'lodash';

export const deepTraverseKeys = (value: any, trans: (key: string) => string): any => {
    if (isArray(value)) {
        value.forEach((item, idx) => {
            value[idx] = deepTraverseKeys(item, trans);
        });
    } else if (isPlainObject(value)) {
        forOwn(value, (item, key) => {
            delete value[key];
            const newKey = trans(key);
            value[newKey] = deepTraverseKeys(item, trans);
        });
    }

    return value;
};

export const sanitizeXMLNames = (value: any): any => {
    return deepTraverseKeys(value, (key: string) => {
        return key.replace(/[\/@]/g, (m: string) => {
            const escapes: { [key: string]: string } = {
                '/': '_x002F_',
                '@': '_x0040_',
            };
            return escapes[m];
        });
    });
};