// команды для бота

const { mainMenu, startCallbackButton } = require("../utils/buttons");

const start = (ctx) =>
  ctx.reply(
    `
    💻 Hello, ${ctx.update.message.from.first_name}! 
      I'm an attendance bot, I will help you mark your class attendance.
      Use buttons below for navigation. 
    `,
    {
      disable_web_page_preview: true,
      parse_mode: "HTML",
      ...mainMenu,
    }
  );

const backMenu = (ctx) => {
  ctx.reply(`✅ You are on the menu`, {
    disable_web_page_preview: true,
    parse_mode: "HTML",
    ...mainMenu,
  });
};
const startWhatLocation = (ctx) => {
  // console.log(ctx)
  /*
    1. Бот запрашивает геопозицию человека в ТГ
    2. Человек по кнопке или через вложения отправляет своё местоположение
    3. Нам приходят даннные и мы отправляет через API запрос по погоде по координатам его
    4. Обработка
    */
  // входим в зарегистрированную в bot.js (15 строка) сцену
  return ctx.scene.enter("location");
};

module.exports = {
  start,
  backMenu,
  startWhatLocation,
};
