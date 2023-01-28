const { remote } = require("webdriverio");
const { print } = require("print_console_log");

const url = "https://www.mayotte.gouv.fr/booking/create/20141";
let inputCheckBox = "input#condition.condition";
let inputBtnValid = "input[name='nextButton'].Bbutton";
let formBooking = "form[name='create']#FormBookingCreate";
const phraseTemoin =
  "Il n'existe plus de plage horaire libre pour votre demande de rendez-vous. Veuillez recommencer ultérieurement.";

let browser;
const verifyOpen = async () => {
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
    print(booleanCompare);

    await browser.deleteSession();
  } catch (e) {
    print(e);
  }
};

async function compareMsg(phraseC, phraseT) {
  try {
    if (phraseC == phraseT) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

// verifyOpen();
