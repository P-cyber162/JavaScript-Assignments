function applyOperation(arr, operation) {
    let newArr = [];
    let change = 0;

    switch (operation) {
        case "square":
            for (let i = 0; i < arr.length; i++) {
                change = arr[i] * arr[i];
                newArr.push(change);
            }
            console.log(newArr);
            break;

        case "double":
            for (let i = 0; i < arr.length; i++) {
                change = arr[i] * 2;
                newArr.push(change);
            }
            console.log(newArr);
            break;

        case "negate":
            for (let i = 0; i < arr.length; i++) {
                change = -arr[i];
                newArr.push(change);
            }
            console.log(newArr);
            break;

        default:
            console.log("Unknown operation");
    }
}

applyOperation([1, 2, 3], "negate");  // [-1, -2, -3]
applyOperation([1, 2, 3], "double");  // [2, 4, 6]
applyOperation([1, 2, 3], "square");  // [1, 4, 9]
