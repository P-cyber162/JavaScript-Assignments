function secondLargest(arr){
    let largest=0;
    for(let i=0; i< arr.length; i++){
        if(arr[i] >= arr[i+1]){
            largest=arr[i];
        }
    }
    let newArr=[];
    for(let i=0; i< arr.length; i++){
        if(arr[i] !== largest){
            newArr.push(arr[i]);
        }
    }
    console.log(newArr);

    let secondLargestNum= Math.max(...newArr);
    console.log(`The second largest number is ${secondLargestNum}`)
}


let testArr=[1,5,3,2,7,4]
secondLargest(testArr);
