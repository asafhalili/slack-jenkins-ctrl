const { log } = require('./helpers/logger');
const jenkins = require('./services/jenkins');
const { start, addMessageListener, addActionListener, addErrorHandler } = require('./services/bolt');

const actions = require('./subscribers/slackActions');
const messages = require('./subscribers/slackMessages');

const PORT = process.env.PORT || 3000;

// Start the app
jenkins.init();
start(PORT);

// Message Listeners
addMessageListener(/^(run|build)\s+(\w+)\s*/, async function(context, say) {
    const jobName = context.matches[2];
    await messages.buildJob(jobName, say);
});

addMessageListener(/^(find|search)\s*(\w*)/, async function(context, say) {
    const jobPartialName = context.matches[2];
    if (!jobPartialName) {
        await messages.getAllJobs(say);
    } else {
        await messages.findJobs(jobPartialName, say);
    }
});

addMessageListener(/^(jobs)$/i, async function(context, say) {
    await messages.getAllJobs(say);
});

addMessageListener(/^(queue)$/i, async function(context, say) {
    await messages.getJobsInQueue(say);
});

// Action Listeners
addActionListener('buildJob', async function(action, ack, say) {
    await actions.buildJob(action, say);
});

addActionListener('abortJob', async function(action, ack, say) {
    await actions.abortJob(action, say);
});

addActionListener('cancelBuildInQueue', async function(action, ack, say) {
    await actions.cancelBuildInQueue(action, say);
});

addActionListener('enableJob', async function(action, ack, say) {
    await actions.enableJob(action, say);
});

addActionListener('disableJob', async function(action, ack, say) {
    await actions.disableJob(action, say);
});

// // Error handling
addErrorHandler();

process.on('uncaughtException', (err) => {
    log.error('Uncaught exception: ', err);
})