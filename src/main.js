import { getBrowserName } from "./checkUA.js"; // 正确拼写

const browserName = getBrowserName(navigator.userAgent);
const systemName = navigator.platform;
const name = prompt("请输入你的名字✅：",[""]);
alert(`Ciallo~(∠・ω< )⌒★, ${name} ! 🎉🎉🎉。\n 你当前的浏览器是:${browserName},\n系统是:${systemName}`);
if (name=="宁宁"){
    alert("你已登录！");
    let bool = confirm("是否跳转到彩蛋界面？")
    bool ? location.href = "./admin.html" : alert("已返回主页")
        
    
} else {
   console.log("不是宁宁吗？🤔");
}











