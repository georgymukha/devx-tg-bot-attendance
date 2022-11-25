const { Scenes, Telegraf } = require("telegraf");
// сессии для mongoose
const { session } = require("telegraf-session-mongoose");
// тектовые команды
const { CMD_TEXT } = require("./config/consts");
// подключение всех команд для бота
const {
  start,
  backMenu,
  startWhatLocation,
} = require("./controllers/commands");

const { whatLocationScene } = require("./controllers/weatherScene");

// инициализация
const bot = new Telegraf(process.env.BOT_TOKEN);
// регистрируем сцены
const stage = new Scenes.Stage([whatLocationScene]);

const setupBot = () => {
  // подключение промежуточных обработчиков (middleware)
  // сессий с коллекцией в бд и сцен
  bot.use(session({ collectionName: "sessions" }));
  bot.use(stage.middleware());
  // обычный middleware (пример)
  bot.use((ctx, next) => {
    // console.log(ctx)
    return next();
  });
  // команда "/start" аналог cmd.command('start', handler)
  bot.start(start);
  // прослушка на сообщение
  bot.hears(CMD_TEXT.menu, backMenu);
  bot.hears(CMD_TEXT.weaterI, startWhatLocation);

  return bot;
};

module.exports = {
  setupBot,
};
