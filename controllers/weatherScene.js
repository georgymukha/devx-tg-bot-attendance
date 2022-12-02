const { Scenes } = require("telegraf");
const { backMenu } = require("./commands");
const {
  getWeatherLocationCoord,
  getMarkLocationCoord,
  newUser,
} = require("../services/getWeatherLocation");
const { backButtonMenuAndLocation } = require("../utils/buttons");
const { CMD_TEXT } = require("../config/consts");

// передаём конструктору название сцены и шаги сцен
const whatLocationScene = new Scenes.BaseScene("location");

// при входе в сцену отправляется сообщение
whatLocationScene.enter((ctx) =>
  ctx.reply("📍 Send me your geolocation, please", {
    ...backButtonMenuAndLocation,
  })
);

// создание прослушки на метод location tg
whatLocationScene.on("location", async (ctx) => {
  try {
    const msg = ctx.message;
    if (!msg.reply_to_message)
      return ctx.reply("Click on the button below, please!");
    ctx.reply("💫 Checking your location");

    // деструктуризация объектов
    const { latitude, longitude } = msg.location;
    const id = msg.from.id;

    // получаем нашу погоду по координатам
    const data = await getWeatherLocationCoord({ latitude, longitude });
    const mark = await getMarkLocationCoord({ latitude, longitude });
    const user = await newUser({ id, latitude, longitude });

    // отвечаем сообщением о погоде
    await ctx.reply(
      `Сейчас у тебя ${data.current_weather.temperature}${data.hourly_units.temperature_2m}\nВетер ${data.current_weather.windspeed} ${data.hourly_units.windspeed_10m} \n`
    );
    // await ctx.reply(user);
  } catch (error) {
    console.log(error);
    ctx.reply("Something went wrong...");
  }
});

// вешаем текстовую прослушку hears на сцену
whatLocationScene.hears(CMD_TEXT.menu, (ctx) => {
  // выходим со сцены
  ctx.scene.leave();
  return backMenu(ctx);
});

// экспортируем сцену
module.exports = {
  whatLocationScene,
};
