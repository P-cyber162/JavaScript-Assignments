mergeArrays([1,2], [2,3], [3,4]);
function mergeArrays(...arrays){
    let newArr=[];
    for(let array of arrays){
        for(let i=0; i< array.length; i++){
            newArr.push(array[i]);
        }
    }
    console.log(newArr);
    let finalArr=[];
    for(let i=0; i< newArr.length; i++){
        if(newArr[i]!==newArr[i+1]){
            finalArr.push(newArr[i]);
        }
    }
    console.log(finalArr);
}

