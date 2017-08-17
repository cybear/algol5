import _ from 'lodash'

import {js_beautify} from 'js-beautify'

function stringifyWithMethods(def){
    if (_.isArray(def)){
        return JSON.stringify(def);
    }
    switch(typeof def){
        case 'object': return '{' + _.map(def,(val,n)=> '"'+n+'": '+stringifyWithMethods(val)).join(',') + '}';
        case 'function': return def;
        default: return JSON.stringify(def);
    }
}

const tester = (lib,funcname,specs)=> {
    let func = 
    describe('the '+funcname+' func',()=>{
        _.each(specs,(spec,name)=>{
            describe(name,()=>{
                let vars = '', result, code, test = '';
                for(var g in spec.scope || {}){
                    vars += "let "+g+"="+ stringifyWithMethods(spec.scope[g])+"; ";
                }
                if (spec.norefs) {
                    spec.norefs.forEach(norefvar=>{
                        let pathvar = norefvar.split('.')
                        pathvar = pathvar[0]+(pathvar.length>1?'["'+_.tail(pathvar).join('"]["')+'"]':'')
                        let origvar = 'ORIGINAL'+norefvar.replace('.','_');
                        vars += 'let '+origvar+' = '+pathvar+'; '
                        test += `
                            it("should copy ${norefvar}",function(){
                                expect(${pathvar}!==${origvar}).toBe(true);
                            })
                        `
                    })
                }
                let origs = {}
                for(var mock in spec.context){
                    origs[mock] = lib[mock]
                    lib[mock] = spec.context[mock]
                }
                let flag = false;
                try {
                    code = lib[funcname].apply(null,[spec.options].concat(spec.args||[]).concat(spec.hasOwnProperty("arg") ? [spec.arg] : []));
                } catch(e) {
                    code = '"'+e+'";';
                    flag = true;
                }
                for(var mock in origs){
                    lib[mock] = origs[mock]
                }
                if (spec.mutations){
                    test += _.map(spec.mutations,(newval,m)=>
                        `it("should mutate ${m} as expected",function(){
                            expect(${m}).toEqual(${JSON.stringify(spec.mutations[m])});
                        }); `
                    ).join(" ");
                }
                if (spec.hasOwnProperty("expected")) {
                    test += `it("should return expected result",function(){
                        expect(result).toEqual(${JSON.stringify({r:spec.expected})}.r);
                    });`
                }
                if (spec.additionally){
                    for(var additionaltestname in spec.additionally){
                        test += `
                        it("${additionaltestname}",function(){
                            expect(${spec.additionally[additionaltestname]}).toBeTruthy();
                        });
                        `
                    }
                }
                if (!spec.mutations && !spec.hasOwnProperty("expected") && !spec.additionally) {
                    throw "Should seek result or mutation!"
                }
                var varmsg = "'********************** Setting up environment ***********************'; "
                var codmsg = "'************************ Code to be tested **************************'; "
                var tstmsg = "'************************* Testing outcome ***************************'; "
                if(spec.execwith){
                    code = '('+code+')('+spec.execwith.map(a=>JSON.stringify(a)).join(',')+'); '
                }
                if (spec.hasOwnProperty("expected")){
                    code = 'result='+code+'; '
                }
                var tobeexec = 'var TEMP; '+varmsg+vars+codmsg+code+";"+tstmsg+test
                if (spec.showcode){
                    console.log("Showing code for "+name+":\n",js_beautify(tobeexec,{indent_size:2}))    
                }
                try {
                    if (flag){
                        throw code;
                    }
                    eval(tobeexec);
                } catch(e) {
                    console.log("ERROR ERROR! "+funcname+", "+name+",  Code:\n",js_beautify(tobeexec,{indent_size:2}))
                    throw e;
                }
            });
        });
    });
}

export default tester