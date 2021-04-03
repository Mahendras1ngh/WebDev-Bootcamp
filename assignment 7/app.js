const input = document.querySelector("#input");
const API_key = "09e19865d1bdfd4b435d0f706a1cafc7";

const cityp = document.querySelector(".cityp");
const current_temp = document.querySelector(".current_temp");
const feels_like = document.querySelector(".feels_like");
const mintemp = document.querySelector(".mintemp");
const maxtemp = document.querySelector(".maxtemp");
const icon = document.querySelector("#icon");
const description = document.querySelector(".description");
const pressure = document.querySelector(".pressure");
const humidity = document.querySelector(".humidity");
const wind_speed = document.querySelector(".wind_speed");
const clouds = document.querySelector(".clouds");

input.addEventListener("keypress", (e) => {
  if (e.which == 13) {
    fetchdata(e.target.value);
    e.target.value = "";
  }
});

async function fetchdata(city) {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`
    );
    const pData = await data.json();

    update();

    function update() {
      console.log("running update");
      cityp.innerHTML =
        pData.name === undefined ? "City not found" : pData.name;
      current_temp.innerHTML =
        pData.name === undefined
          ? ""
          : `Now <span>${pData.main.temp}° C</span>`;
      feels_like.innerHTML =
        pData.name === undefined
          ? ""
          : "Feels like " + pData.main.feels_like + "° C";
      mintemp.innerHTML =
        pData.name === undefined ? "" : "Min " + pData.main.temp_min + "° C";
      maxtemp.innerHTML =
        pData.name === undefined ? "" : "Max " + pData.main.temp_max + "° C";
      description.innerHTML =
        pData.name === undefined ? "" : pData.weather[0].description;
      pressure.innerHTML =
        pData.name === undefined
          ? ""
          : "Pressure " + pData.main.pressure + " hPa";
      humidity.innerHTML =
        pData.name === undefined
          ? ""
          : "Humidity " + pData.main.humidity + " %";
      wind_speed.innerHTML =
        pData.name === undefined ? "" : "Wind " + pData.wind.speed + " m/sec";
      clouds.innerHTML =
        pData.name === undefined ? "" : "Clouds " + pData.clouds.all + " %";

      //icon code
      const iconcode = pData.weather[0].icon;
      const iconurl =
        pData.name === undefined
          ? " "
          : `http://openweathermap.org/img/w/${iconcode}.png`;
      icon.setAttribute("src", iconurl);
    }
  } catch (err) {
    console.log("city not found");
  }
}

// --------- time -----------
setInterval(showTime, 1000);
function showTime() {
  let time = new Date();
  let hour = time.getHours();
  let min = time.getMinutes();
  let sec = time.getSeconds();
  am_pm = "AM";

  if (hour > 12) {
    hour -= 12;
    am_pm = "PM";
  }
  if (hour == 0) {
    hr = 12;
    am_pm = "AM";
  }

  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  let currentTime = hour + ":" + min + ":" + sec + " " + am_pm;

  document.querySelector(".time").innerHTML = currentTime;
}
showTime();

// -----------/ time ---------------

// ------------ Date -------------
var mydate = new Date();
var year = mydate.getYear();
if (year < 1000) year += 1900;
var day = mydate.getDay();
var month = mydate.getMonth();
var daym = mydate.getDate();
if (daym < 10) daym = "0" + daym;
var dayarray = new Array(
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
);
var montharray = new Array(
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
);

const currentDate = `${dayarray[day]}, ${montharray[month]} ${daym} ${year}`;

document.querySelector(".date").innerHTML = currentDate;
// ------------ / Date --------------
