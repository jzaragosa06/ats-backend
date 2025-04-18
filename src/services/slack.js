const { App } = require("@slack/bolt");
require("dotenv").config();
const userModel = require("../models/user/userModel");
const applicantModel = require("../models/applicant/applicantModel");
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
})

module.exports.messageBot = async (message, user_id) => {
    const text = `${message}`

    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: process.env.SLACK_CHANNEL,
        text: text,
        // blocks: block,
    });
};


module.exports.messageBotInterview = async (user_id, applicant_id) => {
    const user = userModel.getUserInfo(user_id);
    const applicant = applicantModel.getApplicant(applicant_id);
    const message = `New interview was created for ${applicant.first_name} ${applicant.last_name}`;

    const text = `${user.first_name} ${user.last_name}: ${message}`;

    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: process.env.SLACK_CHANNEL,
        text: text,
        // blocks: block,
    });
};

module.exports.messageBotNote = async (note, user_id, applicant_id) => {
    const user = userModel.getUserInfo(user_id);
    const applicant = applicantModel.getApplicant(applicant_id);
    const message = `New note was added for ${applicant.first_name} ${applicant.last_name}.` + message;

    const text = `${user.first_name} ${user.last_name}: ${message}`;

    await app.client.chat.postMessage({
        token: process.env.SLACK_BOT_TOKEN,
        channel: process.env.SLACK_CHANNEL,
        text: text,
        // blocks: block,
    });
};