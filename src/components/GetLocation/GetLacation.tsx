// const DEFAULT_CURRENT_LOCATION_TIMEOUT:number = 10000;
// const CURRENT_LOCATION_TIMEOUT = 60000;
// const MAPBOX_API_TOKEN =
//   "pk.eyJ1Ijoic3B1dG5pay1idW50cGxhbmV0IiwiYSI6ImNqcnVlc2JsYzByMnMzeXRjdzd1bXFlYTAifQ.n2S5gMsjFAOfJ5EAsBvFng";
// //Randers, Central Denmark, Denmark
// //56.460449	10.036367
// const DEFAULT_LAT_LOCATION = 56.460449;
// const DEFAULT_LNG_LOCATION = 10.036367;

// const reverseExternalGeocoding = (lng: number, lat: number, lang: string) => {
//   let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_API_TOKEN}&language=${lang}`;
//   return fetch(url, { mode: "cors" });
// };

// const reverseGeocoding = (longitude: number, latitude: number) => {
//   reverseExternalGeocoding(longitude, latitude, "en")
//     .then((data) => {
//       data
//         .json()
//         .then((json) => {
//           console.log(`Your Address is: ${json.features[0].place_name}`);
//         })
//         .catch((e) => console.error(e));
//     })
//     .catch((e) => console.error(e));
// };

// const getPosition = () => {
//   let options = {
//     enableHighAccuracy: true,
//     timeout: 60000,
//     maximumAge: 0
//   };
//   return new Promise(function (resolve, reject) {
//     navigator.geolocation.getCurrentPosition(resolve, reject, options);
//   });
// };

// const promiseTimeout = <T = any>(ms: number, promise: Promise<T>) => {
//   let timeout = new Promise((resolve, reject) => {
//     let id = setTimeout(() => {
//       clearTimeout(id);
//       reject(`Rejected  ms ${ms}`);
//     }, ms);
//   });

//   return Promise.race([promise, timeout]);
// };

// const getCurrentPosition = () => {
//   let positionPromise = promiseTimeout(
//     DEFAULT_CURRENT_LOCATION_TIMEOUT,
//     getPosition()
//   );
//   positionPromise
//     .then((position) => {
//       reverseGeocoding(position.coords.longitude, position.coords.latitude);
//     })
//     .catch((error) => {
//       reverseGeocoding(DEFAULT_LNG_LOCATION, DEFAULT_LAT_LOCATION);
//       console.error(error.message);
//     });
//   // .finally((data) => {});
// };

// getCurrentPosition();

import React from 'react'

type Props = {}

export default function GetLacation({}: Props) {
  return (
    <div>GetLacation</div>
  )
}