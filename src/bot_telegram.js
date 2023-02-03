const TelegramBot = require("node-telegram-bot-api");
const { verifyOpen } = require("./verify_open");
const { print } = require("print_console_log");
require("dotenv").config();

let token_api = "6010559605:AAEW_RLs9PwiI2He7cwUPcARB_RDXvnWn24";
let bot = new TelegramBot(token_api, { polling: true });

exports.launchBot = async () => {
  bot.onText(/\start/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];
    bot.sendMessage(chatId, resp);
  });

  bot.on("message", (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(
      chatId,
      "Bienvenu : ici vous recevez automatiquement un message des que le site de la prefecture est ouverte"
    );

    setInterval(async () => {
      let valeur = await verifyOpen();
      if (!valeur.booleanRtr) {
        bot.sendMessage(chatId, "Les RDV sont ouverts");
      }
    }, 60000); // changer tous les 11min
  });
};
