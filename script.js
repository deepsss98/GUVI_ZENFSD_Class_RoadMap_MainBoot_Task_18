const div_container=document.createElement("div");
div_container.classList.add("container");
div_container.setAttribute("style","overflow-y:auto ;")
document.body.append(div_container);


const title_head=document.createElement("h1");
title_head.setAttribute("id","title");
title_head.classList.add("text-center");
title_head.innerText="REST Countries";
div_container.append(title_head);


const div_row=document.createElement("div");
div_row.setAttribute("id","row_container");
div_row.setAttribute("style","background-color: #22404b;")
div_row.classList.add("row");
div_container.append(div_row);

let card_details="",country_code="",weather_details="",flag=false;

close_weather=()=>{
flag=false;
document.getElementById("row_container").removeChild(document.getElementById("parent_element"));
}

display_weather_details_in_card=(b,c)=>{
  flag=true;
  weather_details=`
  <div id="parent_element">
  <div style="font-weight: bold;" class="d-flex justify-content-between bg-dark-subtle text-dark ">
  Current Weather details of ${c}
  <button type="button" class="btn btn-info btn-close" aria-label="Close" onclick="close_weather(event);"></button>
  </div>
  <div class="p-2" style="background-image: linear-gradient(to right top, #ccbe9b, #a4a789, #818f7a, #64766b, #4e5d59);">
  <div><span class="fw-bold">Weather Description: </span>${b.weather[0].description}</div>
  <div><span class="fw-bold">Temperature: </span>${b.main.temp} </div>
  <div><span class="fw-bold">Pressure : </span>${b.main.pressure} </div>
  <div><span class="fw-bold">Humidity : </span>${b.main.humidity} </div>
  <div><span class="fw-bold">Sea Level : </span>${b.main.sea_level} </div>
  <div><span class="fw-bold">Wind Speed : </span>${b.wind.speed} </div>
  <div><span class="fw-bold">Sunrise : </span>${b.sys.sunrise} </div>
  <div><span class="fw-bold">Sunset : </span>${b.sys.sunset} </div>
  </div>
  </div>`;
    document.getElementById("row_container").innerHTML+=weather_details;
}

display_weather=(y,z,event)=>{
  let country_name=event.target.attributes.id.value;
  let open_weather_api_key="0be82455976898bc8bb530712a1e6732",weather_data=[];
  let open_weather_api_url=`https://api.openweathermap.org/data/2.5/weather?lat=${y}&lon=${z}&appid=${open_weather_api_key}`;
  fetch(open_weather_api_url).then((data)=>data.json()).then((data)=>{
    weather_data=data;
    if(flag===false)
    {
    display_weather_details_in_card(weather_data,country_name);
    }
    else
    {
      alert("Kindly close the existing weather report and open others again");
    }
    
  });

}

display_details_in_card=(a)=>{
country_code=a[0].cioc===undefined?a[0].cca3:a[0].cioc;
card_details+=`<div class="col-sm-6 col-md-4 col-lg-4 col-xl-4 mb-3 mt-3">
<div class="card h-100" style="background-image: linear-gradient(to right top, #ccbe9b, #a4a789, #818f7a, #64766b, #4e5d59);">
<div class="card-header text-white bg-dark p-2 text-center">${a[0].name.common}</div>
  <div class="card-body text-center text-white">
  <img class="card-img-top" src="${a[0].flags.png}" alt="" style="width:300px;height: 200px">
  <div class="mt-2">Capital: ${a[0].capital} </div>
  <div class="card-text">Region: ${a[0].continents} </div>
  <div class="card-text">Country Code: ${country_code} </div>
  <button class="btn btn-primary mt-2" id="${a[0].name.common} Weather Report" onclick="display_weather(${a[0].latlng[0]},${a[0].latlng[1]},event);">Click for weather</button>
  </div>
  </div>
  </div>`;
  document.getElementById("row_container").innerHTML=card_details;
}

const fetch_and_display_images= () => {

    let key=["Afghanistan","%C3%85land%20Islands","Albania"];
    let country_name_url=[],result=[];
    
    for(i=0;i<key.length;i++)
    {
        country_name_url.push(`https://restcountries.com/v3.1/name/${key[i]}`);
        fetch(country_name_url[i]).then((data)=>data.json()).then((data)=>{
        result=data;
        display_details_in_card(result);
    }).catch((error)=>{console.log(error);}); 
    }
    }

    fetch_and_display_images();

