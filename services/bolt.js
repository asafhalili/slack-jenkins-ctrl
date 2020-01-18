const { log } = require('../helpers/logger');
const { App } = require('@slack/bolt');

const { MSG_TEXTS } = require('../helpers/slack/textUtils');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

const start = async (port) => {
    app.start(port);
    log.info('Slack Jenkins Ctrl started');
};

const markContextAsHandled = (context) => {
    context.handled = true;
};

const addErrorHandler = () => {
    app.error((error) => {
        log.error(error);
    });
};

const handleError = (error, say) => {
    log.error('Unknown error occurred ', error);
    say(MSG_TEXTS.ERROR());
};

const addMessageListener = (msgRegex, func) => {
    app.message(msgRegex, async ({ context, say }) => {
        try {
            markContextAsHandled(context);
            await func(context, say);
        } catch (e) {
            handleError(e, say);
        }
    });
};

const addActionListener = (actionId, func) => {
    app.action(actionId, async ({ action, ack, say }) => {
        try {
            ack();
            await func(action, ack, say);
        } catch (e) {
            handleError(e, say);
        }
    });
};

module.exports = {
    start,
    addMessageListener,
    addActionListener,
    addErrorHandler
};