function applyOperation(arr, operation){
    if(operation==="square"|| operation==="double"){
        let change=0;
    let newArr=[];
    for(let i=0; i< arr.length; i++){
        change = arr[i]*2;
        newArr.push(change); 
    }
    console.log(newArr);
    }

    if(operation==="negate"){
        let change=0;
    let newArr=[];
    for(let i=0; i< arr.length; i++){
        change = - arr[i];
        newArr.push(change); 
    }
    console.log(newArr);
    }
}

applyOperation([1,2,3], "negate");