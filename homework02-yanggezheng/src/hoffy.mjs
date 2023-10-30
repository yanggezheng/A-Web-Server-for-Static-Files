import { readFile } from "fs";
// hoffy.js
function getEvenParam(...p1){
    return p1.filter(ele => p1.indexOf(ele) % 2 === 0);
}
function maybe(fn){
    if (fn === null || fn === undefined) {
        return undefined;
    }
    const returnFunction = function(...args){
        if ([...args].includes(null)||[...args].includes(undefined)){
            return undefined;
        }
        return fn(...args);
    };
    return returnFunction;
}

function filterWith(fn){
    return arr => arr.filter(ele => fn(ele));
}
function repeatCall(fn, n, arg){
    if (n === 1) {
        fn(arg);
    }else {
        fn(arg);
        repeatCall(fn, n-1, arg);
    }
}

function largerFn(fn, gn){
    const returnFunction = function(arg1, arg2){
        if (fn(arg1) > gn(arg2)){
            return fn;
        }else{
             return gn;
            }
    };
    return returnFunction;
}
function limitCallsDecorator(fn, n){
    let count = n;
    const returnFunction = function(args){
        if (count > 0) {
            count--;
            return fn(args);
        }else{
            return undefined;
        }
    };
    return returnFunction;
}
function myReadFile(fileName, successFn, errorFn){
    readFile(fileName, (err, data) => {
        if (err) {
            errorFn();
        }else{
            data = data + "";
            successFn(data);
        }
    });
    
    
}
const success = (data) => console.log(data); 
const failure = (err) => console.log('Error opening file:', err);
myReadFile('tests/words.txt', success, failure);

myReadFile('tests/fileDoesNotExist.txt', success, failure);


const singleRowToObj = (headers, row) =>{
    return row.reduce((obj, val, i) => {
        return{...obj, [headers[i]]:val};
    }, {});
};

const rowsToObjects = ({headers, rows}) =>{
    return rows.map(row => singleRowToObj(headers, row));
};

export{
    getEvenParam,
    maybe,
    filterWith,
    repeatCall,
    largerFn,
    limitCallsDecorator,
    myReadFile,
    rowsToObjects,
};