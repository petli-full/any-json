const assert = require('assert');

import { sanitizeXMLNames } from '../lib/utils';

describe('XML name sanitize', function () {
    it('should not modify anything', function () {
        const input = {
            'apple': 1,
            'bannana': 2
        };
        const output = {
            'apple': 1,
            'bannana': 2
        };
        assert.deepEqual(sanitizeXMLNames(input), output);
    });

    it('should modify object keys', function () {
        const input = {
            'apple/juice': 1,
            'bannana': { 'bannana/slice': 2 }
        };
        const output = {
            'apple&#47;juice': 1,
            'bannana': { 'bannana&#47;slice': 2 }
        };
        assert.deepEqual(sanitizeXMLNames(input), output);
    });

    it('should modify object keys in an array', function () {
        const input = {
            'apple': [
                {
                    pear: 1,
                    orange: [
                        { grape: 2 },
                        { 'white/peach': 3 },
                    ],
                    'bannana': { 'bannana/slice': 2 }
                }
            ]
        };
        const output = {
            'apple': [
                {
                    pear: 1,
                    orange: [
                        { grape: 2 },
                        { 'white&#47;peach': 3 },
                    ],
                    'bannana': { 'bannana&#47;slice': 2 }
                }
            ]
        };
        assert.deepEqual(sanitizeXMLNames(input), output);
    });
});
