function createXHR(){
    if (typeof XMLHttpRequest != "undefined"){
        return new XMLHttpRequest();
    } else if (typeof ActiveXobject != "undefined"){
        if (typeof arguments.callee.activeXString != "string"){
            var versions = [ "MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],
                i,len;

            for (i=0,len=versions.length;i<len;i++){
                try{
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (ex) {

                }
            }
        }

        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error ("No XHR object available");
    }
}

let submitBtn =  document.querySelector('.submit');
let input = document.querySelector('input');
let city;
city = input.value;
function getWeather(city){
    submitBtn.addEventListener('click',function(){

        let xhr = createXHR();
        xhr.open("get","http://wthrcdn.etouch.cn/weather_mini?city="+city,false);
        xhr.send(null);
        let responseText = xhr.responseText;
        let weatherData = JSON.parse(responseText);
        console.log(weatherData.data.forecast[0].type)
        console.log(weatherData.data.city)


        // 获取页面li元素下的每个属性元素（天气、日期、最高温、、、）
        let cur_city = document.querySelector('.cur_city');
        var type = document.getElementsByClassName('weather_type');
        let low = document.querySelectorAll('.weather_low');
        let high = document.querySelectorAll('.weather_high');
        let date = document.querySelectorAll('.date');
        let tip_content = document.querySelector('.tip_content');


        cur_city.innerText = weatherData.data.city;
        tip_content.innerText = weatherData.data.ganmao;
        for (let i=0;i<5;i++){
            type[i].innerText = weatherData.data.forecast[i].type;
            low[i].innerText = weatherData.data.forecast[i].low;
            high[i].innerText = weatherData.data.forecast[i].high;
            date[i].innerText = weatherData.data.forecast[i].date;
        }
    }
    )
}
function hot_city(){
    let hot1 = document.querySelector('.hot1');
    console.log(hot1.innerText)
    hot1.addEventListener('click',function(){
        city = hot1.innerText;
        console.log(city)
        getWeather(city);
    })
}
getWeather();
hot_city();
