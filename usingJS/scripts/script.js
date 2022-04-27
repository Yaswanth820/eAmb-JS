var id, target, options;

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c;   
  return d;
}
// 17.773450375795733, 83.23261057145403
// 17.776309158215206, 83.21645129771152
function deg2rad(deg) {
  return deg * (Math.PI/180)
}

let tlat = 17.743872, tlon = 83.2897024, uniqid = '';

const btn = document.querySelector('.btn');
btn.addEventListener('click', (e) => {

  e.preventDefault();
  const uid = document.querySelector('.uid');
  // console.log(uid.value);
  if(uid.value === '' ){
    alert('Name cannot be empty!!');
  }
  else{
    uniqid = uid.value;
    document.querySelector('.display-id').textContent = `Hey ${uid.value}!`;
  }
});

async function postData(url = '', data = {}) {
  // Default options are marked with *
  try{
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  catch(e){
    console.log('error');
  }
}


function success(pos) {
  var crd = pos.coords;
    // console.log(`latitude = ${crd.latitude} ---- longitude = ${crd.longitude}`);
  document.querySelector('#status').textContent = `Your location is being tracked`;
  // console.log(`${ getDistanceFromLatLonInKm(crd.latitude, crd.longitude, 0, 0) }`);
  // const ans = getDistanceFromLatLonInKm(crd.latitude, crd.longitude, tlat, tlon);
  // document.querySelector('#dist').textContent = `Distance between current loc and ${ tlat }, ${ tlon } is ${ ans }`;
  const data = {
    uniqId: uniqid,
    lat: crd.latitude,
    lon: crd.longitude
  }
  // https://test-geoloc-api.herokuapp.com/api/v/coord
  // http://localhost:8080/api/v/coord
  postData('https://test-geoloc-api.herokuapp.com/api/v/coord', data)
  .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  // if(ans < 5){
  //   document.querySelector('.range').textContent = `within 5 km range`;
  // }else{
  //   document.querySelector('.range').textContent = `not in 5km range`;
  // }
  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('Congratulations, you reached the target');
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: true,
  timeout: 1000
};

id = navigator.geolocation.watchPosition(success, error, options);
// console.log(id);

//   document.querySelector('#find-me').addEventListener('click', geoFindMe);
  