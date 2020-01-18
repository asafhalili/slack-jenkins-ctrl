const jenkins = require('../services/jenkins');

const { MSG_TEXTS } = require('../helpers/slack/textUtils');

const buildJob = async (actionData, say) => {
    const jobName = actionData.value;
    await jenkins.buildJob(jobName);
    say(MSG_TEXTS.JOB_STARTED(jobName));
};

const abortJob = async (actionData, say) => {
    const jobInfo = JSON.parse(actionData.value);
    await jenkins.abortJob(jobInfo.name, jobInfo.number);
    say(MSG_TEXTS.JOB_ABORTED(jobInfo.name));
};

const cancelBuildInQueue = async (actionData, say) => {
    const buildId = actionData.value;
    await jenkins.cancelBuildInQueue(buildId);
    say(MSG_TEXTS.JOB_CANCELLED(buildId));
};

const disableJob = async (actionData, say) => {
    const jobName = actionData.value;
    await jenkins.disableJob(jobName);
    say(MSG_TEXTS.JOB_DISABLED(jobName));
};

const enableJob = async (actionData, say) => {
    const jobName = actionData.value;
    await jenkins.enableJob(jobName);
    say(MSG_TEXTS.JOB_ENABLED(jobName));
};

module.exports = {
    buildJob,
    abortJob,
    cancelBuildInQueue,
    enableJob,
    disableJob
};