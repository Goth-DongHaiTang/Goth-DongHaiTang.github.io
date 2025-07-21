let user = {
    name: 12,
    age: 20,
    isAdmin: 12
}

let sum = 0;
user["name"] = prompt("请输入你的名字✅：",[""]);
alert(`Ciallo~(∠・ω< )⌒★, ${user["name"]} ! 🎉🎉🎉`);



for (let key in user){
    console.log(key, user[key]);
    sum = user[key] + sum;
    console.log(sum);
}
    
/*  
let result = confirm("你喜欢这个网站吗？");
if (result) {
    alert("谢谢你的支持！");
}
else {
    alert("没关系，我们会继续努力的！");
}
    */

  