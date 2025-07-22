const name = prompt("请输入你的名字✅：",["宁宁"]);
let borwerName = navigator.userAgent;
let systemName = navigator.platform;
alert(`Ciallo~(∠・ω< )⌒★, ${name} ! 🎉🎉🎉。\n 你当前的浏览器是:${borwerName},\n系统是:${systemName}`);

if (name=="宁宁"){
    alert("你已登录！");
    confirm("是否跳转到彩蛋界面？")
    location.href = "./admin.html";
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

  