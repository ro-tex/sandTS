"use strict";
function foo() {
    return {
        getVal() { return "hi from ts"; }
    };
}
let a = foo().getVal();
console.log(a);
