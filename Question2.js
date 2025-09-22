processArray=[1,2,3,4,5];
//Double each value with the map function
let doubledArr= processArray.map(doubleValue);
function doubleValue(num){
    return num*2;
}
//console.log(doubledArr)

//Keep only evenn numbers with filter function
let onlyEven= doubledArr.filter(isEven);

function isEven(number){
    return number%2===0;
}

//console.log(onlyEven);

//Find the sum ofthe reamining values
let sum = onlyEven.reduce(add);

function add(accumulator, next){
    return accumulator + next;
}
console.log(`The sum is ${sum}`);