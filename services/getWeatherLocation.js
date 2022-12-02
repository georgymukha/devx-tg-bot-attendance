const { default: axios } = require("axios");
const mongoose = require("mongoose");
const {
  URL_API_WEATHER,
  URL_API_GEOCODER,
  KGUSTA_START,
  KGUSTA_FINISH,
} = require("../config/consts");

let userSchema = mongoose.Schema({
  _id: Number,
  name: {
    firstName: String,
    lastName: String,
  },
  attendance: [Date],
});

let User = mongoose.model("User", userSchema);

const newUser = async ({ id, latitude, longitude }) => {
  // const user = User.findByIdAndUpdate(
  //   id,
  //   {
  //     $push: { attendance: [Date.now()] },
  //   },
  //   function (err, docs) {
  //     if (err) {
  //       return console.log("Error\n", err);
  //     } else return console.log("Updated info:\n", docs);
  //   }
  // );
  // console.log(user);
  let checkLocation = () => {
    if (
      KGUSTA_START.longitude <= longitude &&
      longitude <= KGUSTA_FINISH.longitude &&
      KGUSTA_START.latitude <= latitude &&
      latitude <= KGUSTA_FINISH.latitude
    ) {
      let user = User.findByIdAndUpdate(
        id,
        {
          $push: { attendance: [Date.now()] },
        },
        function (err, student) {
          if (err) {
            return console.log(err);
          }
          if (!student) {
            // let addStudent = new User({
            //   _id: id,
            //   name: {
            //     firstName: "Georgii",
            //     lastName: "Mukha",
            //   },
            //   attendance: [Date.now()],
            // });
            // addStudent.save(function (error) {
            //   if (error) throw error;
            //   console.log("User succesfully added");
            // });
            // return console.log("User added");
          }
          if (student) {
            return `You was marked`;
          }
        }
      );
    } else return `You are not in KGUSTA`;
  };
  return checkLocation();

  // let addStudent = new User({
  //   _id: id,
  //   name: {
  //     firstName: "Georgii",
  //     lastName: "Mukha",
  //   },
  //   attendance: [Date.now()],
  // });
  // addStudent.save(function (error) {
  //   if (error) throw error;
  //   console.log("User succesfully saved");
  //   -console.log(addStudent);
  // });
  // console.log(addStudent);
  // return addStudent;
};

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
  } else {
    return "bad";
  }
};

module.exports = {
  getWeatherLocationCoord,
  getMarkLocationCoord,
  newUser,
};
