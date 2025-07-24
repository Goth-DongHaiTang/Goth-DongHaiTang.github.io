import {greetUser} from "./greetUser.js";
import { getBrowserName } from "./checkUA_bak.js"; // 正确拼写


const browserName = getBrowserName(navigator.userAgent);
const systemName = navigator.platform;
const name = prompt("请输入你的名字✅：",[""]);


if(name=="宁宁"){
    alert("你已登录！");
    greetUser(name,browserName, systemName)
    let bool = confirm("是否跳转到彩蛋界面？")
    bool ? location.href = "https://www.gothweb.top/admin.html" : alert("已返回主页")
        
    
} else if( name.trim() == "" || name==null ||  name==undefined){
    alert("名字不能为空");
    location.reload();
    greetUser(name,browserName, systemName)
}

else {
    greetUser(name,browserName, systemName)
   console.log("不是宁宁吗？🤔");
}