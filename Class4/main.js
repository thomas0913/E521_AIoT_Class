require('dotenv').config();
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const fb_username = process.env.FB_USERNAME;
const fb_passward = process.env.FB_PASSWORD;
const By = webdriver.By;
const until = webdriver.until;
const options = new chrome.Options();
const hyperlink = "https://www.facebook.com/login";
const fan_page = "https://www.facebook.com/MangoJump";

options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });

const loginFacebook = async () => {
    let driver;

    // building a searching engin
    try {
        driver = await new webdriver.Builder().forBrowser("chrome").withCapabilities(options).build();
    } catch (e) {
        console.error("無法建立瀏覽器");
        console.error(e);
        return;
    }
    
    // open the website from hyperlink
    await driver.get(hyperlink);

    // start to login
    const fb_email_ele = await driver.findElement(By.xpath(`//*[@id="email"]`));
    fb_email_ele.sendKeys(fb_username);
    const fb_pwd_ele = await driver.findElement(By.xpath(`//*[@id="pass"]`));
    fb_pwd_ele.sendKeys(fb_passward);
    const login_ele = await driver.findElement(By.xpath(`//*[@id="loginbutton"]`));
    login_ele.click();

    // 是否存在指定元素之類別
    await driver.wait(until.elementLocated(By.xpath(`//*[contains(@class,"x1lliihq")]`)));

    // 前往粉專
    await driver.get(fan_page);

    await driver.sleep(3000);

    let fb_trace = null;
    let is_accurate = true;

    const fb_trace_eles = await driver.wait(until.elementsLocated(By.xpath(`//*[contains(@class,"x193iq5w")]`)));
    for (const fb_trace_ele of fb_trace_eles) {
        const fb_text = await fb_trace_ele.getText();
        if (fb_text.includes('位追蹤者')) {
            if (fb_text.includes('萬位追蹤者')) {
                fb_trace = fb_text.replace('萬位追蹤者', '');
                fb_trace = parseFloat(fb_trace) * 10000;
                is_accurate = false;
            } else {
                fb_trace = fb_text.replace(/\D/g, '');
            }
            break;
        }
    }
    console.log("追蹤人數 : ", fb_trace);
    driver.quit();
}

loginFacebook();