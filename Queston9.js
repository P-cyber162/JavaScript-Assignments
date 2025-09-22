const user1 = { 
    name: "John", 
    address: { 
        city: "Lagos" 
    } 
};

const user2 = { 
    name: "Mary" 
};

function getUserCity(user){
    let city= user?.address?.city ?? "Unkown";
    console.log(city);
}

getUserCity(user1);
getUserCity(user2);