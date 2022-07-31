Java.perform(function(){

    // --------------- Root bypassing --------------- //
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

    // --------------- Getting the secret string --------------- //

    let classAA = Java.use("sg.vantagepoint.a.a");

    classAA.a.implementation = function(x1, x2){
        console.log("in function a.a.a()");
        // call this function
        var rawFunctionCall = this.a(x1, x2);
        // print raw call
        console.log(">>>>>> The secret string is: " + array2string(rawFunctionCall));

        return rawFunctionCall;
    }

});

function array2string(arr){
    let string = "";
    for(let i=0; i<arr.length; i++){
        string += String.fromCharCode(arr[i]);
    }
    return string;
}