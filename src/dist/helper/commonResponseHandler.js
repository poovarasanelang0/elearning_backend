"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendReferralCode = exports.sendEmailOtp = exports.sendOtp = exports.sendEmail = exports.response = void 0;
exports.generate = generate;
const logs_controller_1 = require("../controller/logs.controller");
const logs_model_1 = require("../models/logs.model");
var nodemailer = require('nodemailer');
const axios_1 = require("axios");
/**
 * @param res {Function} Response
 * @param success {Boolean} Http Status Code for the response
 * @param result {Object/Array} Result for the Response
 * @param message {string} Primary message for the response
 * @param extendedMessage {Object} Detailed Message for the error Message
 * @function commonResponse {Function} Used for Handling the Common Response
 */
let response = function (req, res, activity, level, method, success, statusCode, result, message, extendedMessage) {
    const LogsData = new logs_model_1.Logs();
    let date = new Date();
    LogsData.activity = activity;
    var trusted_proxies = ['177.144.11.100', '177.144.11.101'];
    LogsData.userId = (req.body.loginId) ? req.body.loginId : '';
    LogsData.url = req.baseurl;
    LogsData.time = date.getTime();
    LogsData.date = date;
    LogsData.level = level;
    LogsData.description = message;
    LogsData.method = method;
    LogsData.processStatus = (statusCode === 200) ? true : false;
    (0, logs_controller_1.saveLog)(LogsData);
    res.status(statusCode);
    return res.json({
        success: success,
        result: result || '',
        message: message || '',
        extendedMessage: extendedMessage || '',
        statusCode: statusCode
    });
};
exports.response = response;
const sendEmail = async (req, email, subject, text) => {
    var sender = nodemailer.createTransport({
        service: 'outlook',
        port: 587, //587
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'info@Pixalive.me',
            pass: 'Pale2468'
        }
    });
    var composemail = {
        from: 'info@Pixalive.me',
        to: email,
        subject: subject,
        text: text
    };
    await sender.sendMail(composemail, function (error, info) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Mail send successfully' + info.response);
        }
    });
};
exports.sendEmail = sendEmail;
/**
 * @author Mohanraj V
 * @date 26-09-2023
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to generate random code
 */
function generate(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}
/**
* @author Mohanraj V
* @date 27-09-2023
* @param {Object} req
* @param {Object} res
* @param {Function} next
* @description This Function is used to send otp on user registration
*/
const sendOtp = async (mobileNumber, otp) => {
    const url = 'https://2factor.in/API/V1/2372fa0e-5edd-11eb-8153-0200cd936042/SMS/+91' + mobileNumber + '/' + otp;
    try {
        const response = await axios_1.default.get(url);
    }
    catch (exception) {
        process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
    }
};
exports.sendOtp = sendOtp;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pixaliveadearns@gmail.com',
        pass: 'tcqkdycouumvjrac',
    },
});
let sendEmailOtp = async (email, otp) => {
    if (!email) {
        throw new Error("email is not register");
    }
    const mailOptions = {
        from: 'pixaliveadearns@gmail.com',
        to: email,
        subject: 'Email Verification OTP',
        text: `Your verification OTP: ${otp}`,
    };
    await transporter.sendMail(mailOptions);
};
exports.sendEmailOtp = sendEmailOtp;
let sendReferralCode = async (email, referralCode) => {
    if (!email) {
        throw new Error("email is not register");
    }
    const mailOptions = {
        from: 'pixaliveadearns@gmail.com',
        to: email,
        subject: 'join with us',
        text: `use my referral code: ${referralCode}`,
    };
    return await transporter.sendMail(mailOptions);
};
exports.sendReferralCode = sendReferralCode;
//# sourceMappingURL=commonResponseHandler.js.map