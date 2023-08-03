const reg = /[a-zA-Z\.]+[0-9a-zA-Z\.]*@heraldcollege.edu.np$/y;
email = "rukesh.shrestha11@heradcollege.edu.np";
console.log(reg.test(email));
console.log(!reg.test(email));
// if (reg.test(email)) {
//   console.log("Yes");
// }

if (!reg.test(email)) {
  console.log("NO");
}
