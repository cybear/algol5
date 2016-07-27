import test from '../gentester'
import lib from '../../../src/codegen/'

let C = lib

describe('the core funcs',()=>{
    test(C,'prop', {
        'the is cmnd when evals to true': {
            args: [ ['is',['sum',2,5]], 'someprop'],
            scope: {filterobj:{someprop:7}},
            expected: true
        },
        'the is cmnd when evals to false': {
            args: [ ['is',['sum',2,5]], 'someprop'],
            scope: {filterobj:{someprop:5}},
            expected: false
        },
        'the isnt cmnd when evals to true': {
            args: [ ['isnt',['sum',2,5]], 'someprop'],
            scope: {filterobj:{someprop:7}},
            expected: false
        },
        'the ismt cmnd when evals to false': {
            args: [ ['isnt',['sum',2,5]], 'someprop'],
            scope: {filterobj:{someprop:5}},
            expected: true
        }
    });
    test(C,'list', {
        'the regular list cmnd': {
            arg: ['list',[111,222,['value',333]]],
            expected: [111,222,333]
        },
        'when given a straight list': {
            arg: [11,22,33],
            expected: [11,22,33]
        }
    });
    test(C, 'boolean', {
        'the morethan cmnd when true': {
            arg: ['morethan',3,2],
            expected: true
        },
        'the morethan cmnd when false': {
            arg: ['morethan',['value',2],2],
            expected: false
        },
        'the isempty cmnd for non-empty layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { ARTIFACTS: {somelayer: {foo:'bar'}} },
            expected: false
        },
        'the isempty cmnd for empty layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { ARTIFACTS: {somelayer: {}} },
            expected: true
        },
        'the isempty cmnd for nonexisting layer': {
            arg: ['isempty',['layer','somelayer']],
            scope: { ARTIFACTS: {} },
            expected: true
        },
        'the notempty cmnd for non-empty layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { ARTIFACTS: {somelayer: {foo:'bar'}} },
            expected: true
        },
        'the notempty cmnd for empty layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { ARTIFACTS: {somelayer: {}} },
            expected: false
        },
        'the notempty cmnd for nonexisting layer': {
            arg: ['notempty',['layer','somelayer']],
            scope: { ARTIFACTS: {} },
            expected: false
        },
        'the overlaps cmnd when given two overlapping ARTIFACTS': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { ARTIFACTS: {l1: {a:[]}, l2: {a:[]}}},
            expected: true
        },
        'the overlaps cmnd when given two non-overlapping ARTIFACTS': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { ARTIFACTS: {l1: {a:[]}, l2: {b:[]}}},
            expected: false
        },
        'the overlaps cmnd when given unexisting ARTIFACTS': {
            arg: ['overlaps',['layer','l1'],['layer','l2']],
            scope: { ARTIFACTS: {} },
            expected: false
        },
        'the anyat cmnd when pointing to layer with that pos': {
            arg: ['anyat','mylayer',['pos','a1']],
            scope: {ARTIFACTS:{mylayer:{a1:[]}}},
            expected: true
        },
        'the anyat cmnd when pointing to layer without pos': {
            arg: ['anyat','mylayer',['pos','a1']],
            scope: {ARTIFACTS:{mylayer:{}}},
            expected: false
        },
        'the noneat cmnd when pointing to layer with that pos': {
            arg: ['noneat','mylayer',['pos','a1']],
            scope: {ARTIFACTS:{mylayer:{a1:[]}}},
            expected: false
        },
        'the noneat cmnd when pointing to layer without pos': {
            arg: ['noneat','mylayer',['pos','a1']],
            scope: {ARTIFACTS:{mylayer:{}}},
            expected: true
        },
        'the same cmnd when same': {
            arg: ['same',4,['value',4]],
            expected: true
        },
        'the same cmnd when different': {
            arg: ['same',4,['value',3]],
            expected: false
        },
        'the different cmnd when same': {
            arg: ['different',4,['value',4]],
            expected: false
        },
        'the different cmnd when different': {
            arg: ['different',4,['value',3]],
            expected: true
        },
        'the valinlist cmnd when true': {
            arg: ['valinlist',['val',2],['list',[1,2,3]]],
            expected: true
        },
        'the valinlist cmnd when false': {
            arg: ['valinlist',['val',4],[1,2,3]],
            expected: false
        },
    });
    test(C,'position',{
        'the mark cmnd': {
            arg: ['mark','mymark'],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: 'somepos'
        },
        'the target cmnd': {
            arg: ['target'],
            scope: {POS:'mypos'},
            expected: 'mypos'
        },
        'the target cmnd with specified useforpos': {
            options: {useforpos:'"a1"'},
            arg: ['target'],
            scope: {POS:'mypos'},
            expected: 'a1'
        },
        'the onlyin cmnd': {
            arg: ['onlyin',['intersect','foo','bar']],
            scope: {
                ARTIFACTS: {
                    foo: {p1: {}, p2: {}},
                    bar: {p2: {}}
                }
            },
            expected: 'p2'
        }
    });
    test(C,'value',{
        'passing primitive': {
            arg: 123,
            expected: 123
        },
        'passing string': {
            arg: '123',
            expected: '123'
        },
        'the value cmnd': {
            arg: ['value','foo'],
            expected: 'foo'
        },
        'the otherplayer when player is 1': {
            arg: ['otherplayer'],
            options: {player:1},
            expected: 2
        },
        'the otherplayer when player is 2': {
            arg: ['otherplayer'],
            options: {player:2},
            expected: 1
        },
        'the sum cmnd also using currentplayer': {
            arg: ['sum',3,['value',2],['currentplayer']],
            options: {player:2},
            expected: 7
        },
        'the ctxval cmnd': {
            arg: ['ctxval',['value','someval']],
            scope: {
                CONTEXT: {someval:'foo'}
            },
            expected: 'foo'
        },
        'the playercase cmnd when plr1': {
            arg: ['playercase','foo','bar'],
            options: {player:1},
            expected: 'foo'
        },
        'the playercase cmnd when plr2': {
            arg: ['playercase','foo','bar'],
            options: {player:2},
            expected: 'bar'
        },
        'the dir cmnd': {
            arg: ['dir'],
            scope: {DIR:7},
            expected: 7
        },
        'the dir cmnd with a spec': {
            arg: ['dir'],
            options: {usefordir:'otherdir'},
            scope: {DIR:7,otherdir:5},
            expected: 5
        },
        'the walklength cmnd': {
            arg: ['walklength'],
            scope: {WALKLENGTH: 4},
            expected: 4
        },
        'the neighbourcount cmnd': {
            arg: ['neighbourcount'],
            scope: {NEIGHBOURCOUNT: 4},
            expected: 4
        },
        'the read cmnd': {
            arg: ['read',["layer","mylayer"],['mark','mymark'],['value','foo'] ],
            scope: {
                MARKS:{mymark:'a1'},
                ARTIFACTS: {mylayer:{a1:{foo:'bar'}}}
            },
            expected: 'bar'
        }
    });
    test(C,'set',{
        'when given name of layer': {
            arg: 'mylayer',
            scope: { ARTIFACTS: {mylayer:{a:1,b:2}} },
            expected: {a:1,b:2}
        },
        'the single cmnd': {
            arg: ['single',['mark','mymark']],
            scope: {
                MARKS: {mymark:'somepos'}
            },
            expected: {somepos:1}
        },
        'the layer cmnd with str': {
            arg: ['layer','mylayer'],
            scope: {
                ARTIFACTS: {mylayer:{a:1,b:2}}
            },
            expected: {a:1,b:2}
        },
        'the intersect cmnd': {
            arg: ['intersect',['layer','layer1'],['layer','layer2']],
            scope: {
                ARTIFACTS: {
                    layer1: {a:1,b:2},
                    layer2: {b:20,c:30}
                }
            },
            expected: {b:2}
        },
        'the intersect cmnd with many args': {
            arg: ['intersect',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                ARTIFACTS: {
                    layer1: {a:1,b:2,c:3},
                    layer2: {b:20,c:30},
                    layer3: {a:100,b:200}
                }
            },
            expected: {b:2}
        },
        'the subtract cmnd with many args': {
            arg: ['subtract',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                ARTIFACTS: {
                    layer1: {a:1,b:2,c:3,d:4},
                    layer2: {b:20,c:30},
                    layer3: {a:100,b:200}
                }
            },
            expected: {d:4}
        },
        'the union cmnd with many args': {
            arg: ['union',['layer','layer1'],['layer','layer2'],['layer','layer3']],
            scope: {
                ARTIFACTS: {
                    layer1: {a:1},
                    layer2: {a:10,b:20},
                    layer3: {c:300}
                }
            },
            expected: {a:1,b:1,c:1}
        }
    });
    test(C,'id',{
        'for idat cmnd': {
            arg: ['idat',['mark','mymark']],
            scope: {
                MARKS: {mymark:'pos'},
                UNITLAYERS: {all:{pos:{id:7}}}
            },
            expected: 7
        },
        'for loopid cmnd': {
            arg: ['loopid'],
            scope: {
                LOOPID: 7
            },
            expected: 7
        }
    });
    test(C,'layerref',{
        'when no mappings specified': {
            arg: 'mylayer',
            scope: {
                ARTIFACTS: {'mylayer': 'FOO'}
            },
            expected: 'FOO'
        },
        'when a mapping is relevant': {
            arg: 'mylayer',
            options: {
                layermappings: {
                    mylayer: 'MUPPETS'
                }
            },
            scope: {
                MUPPETS: {mylayer:'FOO'}
            },
            expected: 'FOO'
        },
        'when we want special case "units"': {
            arg: 'units',
            scope: {
                UNITLAYERS: {all:'FOO'}
            },
            expected: 'FOO'
        },
        'when we want special case "board"': {
            arg: 'board',
            scope: {
                BOARD: {board:'FOO'}
            },
            expected: 'FOO'
        },
        'when we want special case "light"': {
            arg: 'light',
            scope: {
                BOARD: {light:'FOO'}
            },
            expected: 'FOO'
        },
        'when we want special case "dark"': {
            arg: 'dark',
            scope: {
                BOARD: {dark:'FOO'}
            },
            expected: 'FOO'
        },
    });
});