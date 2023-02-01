const { remote } = require("webdriverio");
const { print } = require("print_console_log");

const url = "https://www.mayotte.gouv.fr/booking/create/20141";
let inputCheckBox = "input#condition.condition";
let inputBtnValid = "input[name='nextButton'].Bbutton";
let formBooking = "form[name='create']#FormBookingCreate";
const phraseTemoin =
  "Il n'existe plus de plage horaire libre pour votre demande de rendez-vous. Veuillez recommencer ultérieurement.";

let browser;
exports.verifyOpen = async () => {
  try {
    browser = await remote({ capabilities: { browserName: "chrome" } });
    await browser.navigateTo(url);
    const inputBtn = await browser.$(inputCheckBox);
    const validBtn = await browser.$(inputBtnValid);
    let messageForm;
    await inputBtn.click();
    await validBtn.click();
    messageForm = await browser.$(formBooking);
    print(await messageForm.getText());
    let phraseCompare = await messageForm.getText();

    let booleanCompare = await compareMsg(phraseCompare, phraseTemoin);
    await browser.deleteSession();
    return booleanCompare;
    // print(booleanCompare);
    
  } catch (e) {
    browser.deleteSession();
    return { booleanRtr: true, message: "erreur le site bug" };
  }
};

async function compareMsg(phraseC, phraseT) {
  try {
    if (phraseC === phraseT) return { booleanRtr: true, message: "pas ouvert" };
    if (phraseC !== phraseT) return { booleanRtr: false, message: "ouvert" };
  } catch (e) {
    return { booleanRtr: true, message: "erreur programme" };
  }
}
