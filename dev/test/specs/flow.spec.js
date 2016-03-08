import test from '../gentester'
import lib from '../../../src/codegen/'

let F = lib.F

describe("The flow commands",()=>{
    test(F.endgame,'the endgame func',{
        'when gamedef has no endgame at all': {
            arg: {},
            expected: undefined
        },
        'when no conditions are fulfilled': {
            options: {},
            arg: {
                endgame: {
                    foo: { condition: ['false'] },
                    bar: { condition: ['false'] }
                }
            },
            expected: undefined
        },
        'when a conditions is fulfilled with no specified `who`': {
            options: {player:666},
            arg: {
                endgame: {
                    woo: { condition: ['false'] },
                    foo: { condition: ['true'] }
                }
            },
            expected: ['foo',666]
        },
        'when a conditions is fulfilled with specified player': {
            options: {player:666},
            arg: {
                endgame: {
                    woo: { condition: ['false'] },
                    foo: { condition: ['true'], who: 5 }
                }
            },
            expected: ['foo',5]
        }
    });
    test(F.preventendturn,'the preventendturn func',{
        'when gamedef has no unless at all': {
            arg: {},
            expected: undefined
        },
        'when no conditions are fulfilled': {
            arg: {
                unless: {
                    foo: ['false'],
                    bar: ['false']
                }
            },
            expected: undefined
        },
        'when a conditions is fulfilled': {
            options: {player:666},
            arg: {
                unless: {
                    foo: ['false'],
                    bar: ['true']
                }
            },
            expected: 'bar'
        }
    });
});
