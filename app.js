var logger = require('morgan');
const { App } = require('@slack/bolt');

const commands = require('./subscribers/slackCommands');
const actions = require('./subscribers/slackActions');
const messages = require('./subscribers/slackMessages');

const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    token: process.env.SLACK_BOT_TOKEN,
});

(async () => {
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Slack Jenkins CI/CD is running');
})();

// Commands
app.command('/run', async ({ command, ack, say }) => {
    ack();
    const response = await commands.run(command.text);
    say(response);
});

app.command('/info', async ({ command, ack, say }) => {
    ack();
    const response = await commands.info(command.text);
    say(response);
});

// Actions
app.action('buildJob', async ({ action, ack, say }) => {
    ack();
    const response = await actions.buildJob(action);
    say(response);
});

app.action('abortJob', async ({ action, ack, say }) => {
    ack();
    const response = await actions.abortJob(action);
    say(response);
});

app.action('cancelBuildInQueue', async ({ action, ack, say }) => {
    ack();
    const response = await actions.cancelBuildInQueue(action);
    say(response);
});

app.action('enableJob', async ({ action, ack, say }) => {
    ack();
    const response = await actions.enableJob(action);
    say(response);
});

app.action('disableJob', async ({ action, ack, say }) => {
    ack();
    const response = await actions.disableJob(action);
    say(response);
});

//Messages
app.message(/^(r|b|run|build)\s+(\w+)/, async ({ context, say }) => {
    context.handled = true;
    const response = await messages.buildJob(context);
    say(response);
});

app.message(/^(f|find)\s*(\w+)/, async ({ context, say }) => {
    context.handled = true;
    const jobPartialName = context.matches[2];
    let response;
    if (jobPartialName === '') {
        response = await messages.getAllJobs();
    } else {
        response = await messages.findJobs(jobPartialName);
    }
    say(response);
});

app.message(/^(j|jobs)$/i, async ({ context, say }) => {
    context.handled = true;
    const response = await messages.getAllJobs();
    say(response);
});

app.message(/^(q|queue)$/i, async ({ context, say }) => {
    context.handled = true;
    const response = await messages.getJobsInQueue(context);
    say(response);
});

// Fallback
app.message(/^\s*(\w+)/, async ({ context, say }) => {
    if (!context.handled) {
        const jobPartialName = context.matches[0];
        say(`:mag_right: Searching jobs that contains '${jobPartialName}'`);
        const response = await messages.findJobs(jobPartialName);
        say(response);
    }
});

app.error((error) => {
    console.error(error);
});