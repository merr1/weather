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
    let descr = data["weather"][0]["description"];
    document.querySelector(".description").innerHTML = descr;
    document.querySelector(".temp").innerHTML = temp+"°C";
    document.querySelector(".name").innerHTML = name;
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
   
    
      var timez =data.timezone;
      var temp = data["main"].temp;
      var name = data["name"];
      var descr = data["weather"][0]["description"];
      var cod = data["cod"];
      
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
          <div class="left">
             <span class="description">${descr}</span>
             <span class="temp">${temp}°C</span>
          </div>
          <div class="right">
             <span class="weekday"></span>
             <span class="name">${name}</span>
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
