
const capitalizeFirstLetter = (string) => {
  
  let words = string.split(" ");

  
  let capitalizedWords = words.map(word => {
    let firstLetter = word.charAt(0).toUpperCase(); 
    let restOfWord = word.slice(1); 
    return firstLetter + restOfWord; 
  });

  
  let result = capitalizedWords.join(" ");
  
 
  console.log(result);
};

capitalizeFirstLetter("hello world"); 

