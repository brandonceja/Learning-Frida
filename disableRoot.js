Java.perform(function(){

    let className = Java.use("sg.vantagepoint.a.c");

    className.a.implementation = function(x){
        console.log("Bypassing function A");
        return false;
    }

    className.b.implementation = function(x){
        console.log("Bypassing function B");
        return false;
    }

    className.c.implementation = function(x){
        console.log("Bypassing function C");
        return false;
    }

    console.log("Root bypassed ;)");

});