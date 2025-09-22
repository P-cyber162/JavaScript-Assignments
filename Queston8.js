let array=[
  { name: "apple", category: "fruit" },
  { name: "carrot", category: "vegetable" },
  { name: "banana", category: "fruit" }
]

function groupByCategory(items){
    let fruit=[];
    for(let i=0; i<items.length; i++){
        if(items[i].category === "fruit"){
            fruit.push(items[i].name)
        }
        
    }

    let vegetable=[];
    for(let i=0; i<items.length; i++){
        if(items[i].category === "vegetable"){
            vegetable.push(items[i].name);
        }
        
    }


    console.log("Fruit: ", fruit)
    console.log("Vegetable: ", vegetable);
}

groupByCategory(array);