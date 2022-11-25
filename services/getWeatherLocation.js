const { default: axios } = require("axios");
const consts = require("../config/consts");
const {
  URL_API_WEATHER,
  URL_API_GEOCODER,
  KGUSTA_START,
  KGUSTA_FINISH,
} = require("../config/consts");

// стрелочная функция для получения температуры по координатам
const getWeatherLocationCoord = async ({ longitude, latitude }) => {
  // делаем get запрос с query параметрами, деструктуризируем и возвращаем ответ data
  const { data } = await axios.get(URL_API_WEATHER, {
    params: {
      latitude,
      longitude,
      hourly: "temperature_2m,relativehumidity_2m,windspeed_10m",
      current_weather: true,
      timezone: "auto",
    },
  });

  return data;
};

const getMarkLocationCoord = async ({ longitude, latitude }) => {
  if (
    KGUSTA_START.longitude <= longitude &&
    longitude <= KGUSTA_FINISH.longitude &&
    KGUSTA_START.latitude <= latitude &&
    latitude <= KGUSTA_FINISH.latitude
  ) {
    return "nice";
  } else return "bad";
};

// стрелочная функция обратного геокодирования адреса
/*
    Прямое геокодирование – это задача получения координат географической
    точки по её адресу, написанному на понятном человеческом языке.

    Обратное геокодирование-это процесс преобразования местоположения, 
    описанного географическими координатами (широта, долгота), 
    в удобочитаемый адрес или название места.
*/

module.exports = {
  getWeatherLocationCoord,
  getMarkLocationCoord,
};
