const API = "64929040b1f2c19079d8a59d206b7759";
var input = document.querySelector("#search");
var button = document.querySelector(".button");
var background=document.querySelector(".city")
var input_list = [];
var container = document.querySelector(".main");
fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=tbilisi&appid=${API}&units=metric`
)
  .then((response) => response.json())
  .then((data) => {
    let temp = data["main"].temp;
    let name = data["name"];
    let country=data["sys"].country;
    let descr = data["weather"][0]["description"];
    let icon=data.weather[0].icon;
    let temp_min=data.main.temp_min;
    let temp_max=data.main.temp_max;
    let humidity=data.main.humidity;
    let wind=data.wind.speed;

    

    document.querySelector(".desc").innerHTML = descr;
    document.querySelector(".temp").innerHTML = temp+"°C";
    document.querySelector("#title").innerHTML=name +" , "+country;
    document.querySelector(".ico").src = `https://amindi.ge/static/img/${icon[0]+icon[1]}.png`;
    document.querySelector("#max").innerHTML+=temp_max +"°C";
    document.querySelector("#min").innerHTML+=temp_min +"°C";
    document.querySelector("#humidity").innerHTML+=humidity+" %";
    document.querySelector("#wind").innerHTML+=wind+" m/s"
    input_list.push(name);
  });

button.addEventListener("click", () => {
  let city = input.value;
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}&units=metric`
  )
    .then((response) => response.json())
    .then((data) => {
      var cod = data["cod"];
      if(cod==200){
        let temp = data["main"].temp;
        let name = data["name"];
        let country=data["sys"].country;
        let descr = data["weather"][0]["description"];
        let icon=data.weather[0].icon;
        let temp_min=data.main.temp_min;
        let temp_max=data.main.temp_max;
        let humidity=data.main.humidity;
        let wind=data.wind.speed;
      
        if (input_list.includes(name)) {
          input.style.boxShadow = "1px 1px 5px red";
          document.querySelector(".error").innerHTML =
            "You have already entered this city";
        } else {
         input.style.boxShadow = "none";
         document.querySelector(".error").innerHTML="";

          input_list.push(name);
          container.innerHTML += `
          <div class="container">
          <div class="city">
            <div class="title">
              <span id="title"> ${name} , ${country}</span>
            </div>
            <div class="information">
              <div class="left">
                <span class="temp">${temp} °C</span>
                <div class="description">
                   <img class="ico" src=https://amindi.ge/static/img/${icon[0]+icon[1]}.png >
                   <span class="desc">${descr}</span>  
                 </div>
              </div>
              <div class="right">
                <div id="wind"> wind : ${wind} m/s</div>
                <div class="humadity">
                  <span id="humidity">humidity : ${humidity} %</span>
              </div>
              </div>
              <div class="max_min">
                  <div class="max">  
                      <span id="max"><b>↑</b> ${temp_max} °C</span>
                  </div>
                  <div class="min">  
                      <span id="min"><b>↓</b>  ${temp_min} °C </span>
                  </div>
                  
              </div>
            </div>
          </div>
        </div> `;

      input.value="";
        }
      
      }else {
         input.style.boxShadow = "1px 1px 5px red";
          document.querySelector(".error").innerHTML="Make sure the city name is correct";
      }
    });
});
