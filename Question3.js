const user = {
id: 1,
profile: {
username: "mandem",
email: "mandem@example.com"
},
settings: {
theme: "dark",
notifications: true
}
};
 
const{id, profile: {username, email}, settings: {theme, notifications}}= user;
console.log(username);
console.log(email);
console.log(theme);