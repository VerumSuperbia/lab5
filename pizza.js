var slider = document.getElementById("size");
var output = document.getElementById("size_label");
var meatcb = document.querySelectorAll("#top input[type=checkbox]");
var vegcb = document.querySelectorAll("#veg input[type=checkbox]");
var checb = document.querySelectorAll("#che input[type=radio]");
var paycb = document.querySelectorAll("#pay input[type=radio]");
var pi = document.getElementById("pizzaimg");
var add = document.getElementById("address");
var p = document.getElementById("dlvrTo");
var ul = document.getElementById("orderList");
var h2 = document.getElementById("total");
var n1 = document.getElementById("n1");
var n2 = document.getElementById("n2");
var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var fp = document.getElementById("fp");
var sp = document.getElementById("sp");
var tp = document.getElementById("tp");
var cur = fp;
var city = document.getElementById("city");
var fname = document.getElementById("name1");
var lname = document.getElementById("name2");
var mail = document.getElementById("e-mail");
var phone = document.getElementById("phone");
function getSize(){
    return slider.value;
}
function getArr(c){
    var checked = [];
    for(var i=0; i< c.length; i++){
        var checkbox = c[i];
        if (checkbox.checked) checked.push(checkbox.value);
    }
    return checked;
}
function getMeat(){
    return getArr(meatcb);
}
function getVeg(){
    return getArr(vegcb);
}
function getCheese(){
    return getArr(checb)[0];
}
function getPay(){
    return getArr(paycb)[0];
}
function ChangePizzaSize(){
    if (getSize() == 1){
        output.innerHTML = "Small 6$";
        pi.width = "100";
        output.value = 6;
    }
    else if(getSize() == 2){
        output.innerHTML = "Medium 10$";
        pi.width = "150";
        output.value = 10;
    }
    else if(getSize() == 3){
        output.innerHTML="Large 14$";
        pi.width = "200";
        output.value = 14;
    }
    else{
        output.innerHTML = "X-Large 16$";
        pi.width = "250";
        output.value = 16;
    }
}
slider.oninput = ChangePizzaSize;
function calculateTotal(){
    var ex = 0;
    if (getCheese() == 3){ex = 3;}
    return output.value + 2*(getMeat().length) + getVeg().length + ex;
}   
function fillSummary(){
    p.innerHTML = "";
    p.innerHTML = fname.value + " " + lname.value + "\n" + phone.value + " " + mail.value + "\n" + city.value + " " + add.value;
    order =[];
    ul.innerHTML="";
    order.push(output.innerHTML);
    if(getMeat().length>0){
        for(var i = 0; i < getMeat().length; i++){
            order.push(getMeat()[i]);
        }
    }
    if(getVeg().length>0){
        for(var i = 0; i < getVeg().length; i++){
            order.push(getVeg()[i]);
        }
    }
    if (getCheese()== 1){order.push("Regular Cheese")}
    else if(getCheese()== 2){order.push("No Cheese")}
    else{order.push("Extra Cheese")}
    order.push(getPay());
    order.sort();
    for(var i=0; i< order.length; i++){
        var x = document.createElement("li")
        x.innerHTML = order[i];
        ul.appendChild(x);
    }
    h2.innerHTML = "Total: " + String(calculateTotal());
}
function checkCompletion(){
    if(!getCheese() || !getPay()){
        return false;
    }
    return true;
}
function checkInfo(){
    if(!fname.value || !lname.value || !phone.value || !mail.value || !city.value || !add.value){
        return false;
    }
    else{return true;}
}
function gotoPage(x){
    if (x == 1){
        fp.style.display = "contents";
        sp.style.display = "none";
        tp.style.display = "none";
        document.body.style.background = "#01dddd";
    }
    else if(x == 2){
        fp.style.display = "none";
        sp.style.display = "contents";
        tp.style.display = "none";
        document.body.style.background = "#e93a57";
    }
    else if (x == 3 && checkInfo() && checkCompletion()){
        fillSummary();
        fp.style.display = "none";
        sp.style.display = "none";
        tp.style.display = "contents";
        document.body.style.background = "#3fc38e";
    }
    else{
        window.alert("Missing Information");
    }
}
gotoPage(1);
