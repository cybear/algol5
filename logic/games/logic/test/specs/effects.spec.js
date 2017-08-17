import test from '../gentester'
import lib from '../'

let E = lib

describe("The effect commands",()=>{
    test(E,'setturnvar',{
        'for normal call': {
            args: [['val','hideout'],['val','somepos']],
            scope: {
                TURNVARS: {foo:'bar'}
            },
            mutations: {
                TURNVARS: {foo:'bar',hideout:'somepos'}
            }
        }
    })
    test(E,'setturnpos',{
        'for normal call': {
            args: [['val','hideout'],'secretmark'],
            scope: {
                MARKS: {secretmark: 'somepos'},
                TURNVARS: {foo:'bar'}
            },
            mutations: {
                TURNVARS: {foo:'bar',hideout:'somepos'}
            }
        }
    })
    test(E,'killin',{
        'for normal call': {
            arg: ['layer','somelayer'],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: { units: {x1:{id:'unit1'},x3:{id:'unit3'}} },
                UNITDATA: { unit1: {}, unit2: {}, unit3: {} }
            },
            mutations: {
                UNITDATA: { unit2: {} }
            }
        }
    });
    test(E,'setin',{
        'for normal call': {
            args: [ ['layer','somelayer'], 'prop', ['sum',['loopid'],['target']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: { units: {x1:{id:'unit1'},x3:{id:'unit3'}} },
                UNITDATA: { unit1: {}, unit2: {}, unit3: {} }
            },
            mutations: {
                UNITDATA: { unit1: {prop:'unit1x1'}, unit2: {}, unit3: {prop:'unit3x3'} }
            },
            norefs: ['UNITDATA.unit1','UNITDATA.unit3']
        }
    });
    test(E,'forposin',{
        'for normal call': {
            args: [ ['layer','somelayer'], ['killat',['target']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: {
                    units: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        }
    });
    test(E,'foridin',{
        'with non-unit area': {
            args: [ ['layer','somelayer'], ['killid',['loopid']] ],
            scope: {
                ARTIFACTS: { somelayer: {x1:"FOO",x2:"BAR",x3:"BAZ"} },
                UNITLAYERS: {
                    units: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        },
        'with unit area': {
            options: {
                layermappings: { 'myclowns': 'UNITLAYERS' }
            },
            args: [ ['layer','myclowns'], ['killid',['loopid']] ],
            context: {
                blankUnitLayers: ()=> ({myclowns:{}})
            },
            scope: {
                UNITLAYERS: {
                    myclowns: {x1:{id:'unit1'},x3:{id:'unit3'}}
                },
                UNITDATA: {
                    unit1: {}, unit2: {}, unit3: {}
                }
            },
            mutations: {
                UNITDATA: {
                    unit2: {}
                }
            }
        },
    });
    test(E,'swap',{
        'for straight swap': {
            args: [['mark','1st'],['mark','2nd']],
            scope: {
                MARKS: {'1st':'a','2nd':'b'},
                UNITLAYERS: {units: {a:{id:'unit1',pos:'a'},b:{id:'unit2',pos:'b'}}},
                UNITDATA: {unit1:{pos:'a'},unit2:{pos:'b'}}
            },
            mutations: {
                UNITDATA: {unit1:{pos:'b'},unit2:{pos:'a'}}
            }
        }
    });
    test(E,'killid',{
        'for straight call': {
            args: ['unit4'],
            scope: { UNITDATA: { unit4:{name:'foo'}, someoneelse: 'FOO' } },
            mutations: { UNITDATA: { someoneelse: 'FOO' } }
        }
    });
    test(E,'killat',{
        'when noone there': {
            arg: ['mark','mymark'],
            scope: { UNITDATA: {}, UNITLAYERS: {units: {}}, 'MARKS': {mymark:'pos'}},
            mutations: { UNITDATA: {} }
        },
        'when someone is there': {
            args: [['mark','mymark']],
            scope: { UNITDATA: {7:{}}, UNITLAYERS: {units: {pos:{id:7}}}, 'MARKS': {mymark:'pos'}},
            mutations: { UNITDATA: {} },
        }
    });
    test(E,'moveid',{
        'for straight call': {
            args: [42,['mark','mymark']],
            scope: { UNITDATA: { 42:{pos:'somepos'} }, MARKS: {mymark:'otherpos'} },
            mutations: { UNITDATA: { 42: {pos:'otherpos'} } }
        }
    });
    test(E,'moveat',{
        'for straight call': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { 42: {pos:'origin'}},
                UNITLAYERS: { units: {origin:{id:42}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { 42: {pos:'destination'}} }
        }
    });
    test(E,'setid',{
        'for straight call': {
            args: [42,'foo',['sum',2,3]],
            scope: { UNITDATA: { 42:{foo:0} } },
            mutations: { UNITDATA: { 42:{foo:5} } },
        }
    });
    test(E,'setat',{
        'for straight call': {
            args: [['mark','at'],['value','foo'],['sum',2,3]],
            scope: {
                UNITDATA: { 'u42': {foo:0}},
                UNITLAYERS: { units: {pos:{id:'u42'}} },
                MARKS: {at:'pos'}
            },
            mutations: { UNITDATA: { 'u42':{foo:5} } },
            norefs: ['UNITDATA.u42']
        }
    });
    test(E,'spawn',{
        'for just pos and group': {
            args: [['mark','mymark'],'fools'],
            scope: { UNITDATA: {unit1:{}}, MARKS: {mymark:'somepos'}, clones: 7, player: 666 },
            mutations: { UNITDATA: {unit1:{}, spawn7:{id:'spawn7',group:'fools',owner:666,pos:'somepos'}}, clones: 8 }
        },
        'for pos, group, owner and prop obj': {
            args: [['mark','mymark'],['value','fools'],['value',7],{foo:['value','bar'],baz:['value','bin']}],
            scope: {UNITDATA: {unit1:{}}, MARKS: {mymark:'somepos'}, clones: 5},
            mutations: {
                UNITDATA: {
                    unit1:{},
                    spawn5:{id:'spawn5',group:'fools',owner:7,pos:'somepos',foo:'bar',baz:'bin'}},
                clones: 6
            },
        }
    });
    test(E,'stompid',{
        'when there is a target': {
            args: [42,['mark','mymark']],
            scope: {
                UNITDATA: { 42: {pos:'somepos'}, doomed: {}},
                UNITLAYERS: { units: {otherpos: {id: 'doomed'}} },
                MARKS: {mymark:'otherpos'}
            },
            mutations: { UNITDATA: { 42: {pos:'otherpos'} } }
        }
    });
    test(E,'stompat',{
        'when there is a target': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { 42: {pos:'origin'}, doomed: {pos:'destination'}},
                UNITLAYERS: { units: {origin:{id:42},destination:{id:'doomed'}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { 42: {pos:'destination'}} }
        },
        'when there is a target but no one to stomp': {
            args: [['mark','from'],['mark','to']],
            scope: {
                UNITDATA: { notdoomed: {pos:'destination'}},
                UNITLAYERS: { units: {destination:{id:'notdoomed'}} },
                MARKS: {from:'origin',to:'destination'}
            },
            mutations: { UNITDATA: { notdoomed: {pos:'destination'}} }
        }
    });
});