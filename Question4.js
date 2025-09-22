const products = [
{ name: "Laptop", price: 1200 },
{ name: "Phone", price: 800 },
{ name: "Tablet", price: 600 }
];
 
function getAffordableProducts(products, budget){
    for(let i=0; i<products.length; i++){
        if(products[i].price <= budget){
            console.log(products[i].name)
        }
    }
}

getAffordableProducts(products, 1000);
