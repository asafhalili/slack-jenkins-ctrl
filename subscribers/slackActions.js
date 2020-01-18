const jenkins = require('../services/jenkins');
const { MSG_TEXTS } = require('../helpers/slack/textsUtils');

const buildJob = async (actionData) => {
    try {
        const jobName = actionData.value;
        await jenkins.buildJob(jobName);
        return MSG_TEXTS.JOB_STARTED;
    } catch (e) {
        console.error(e);
        return MSG_TEXTS.JOB_NOT_FOUND;
    }
};

const abortJob = async (actionData) => {
    try {
        const jobInfo = JSON.parse(actionData.value);
        await jenkins.abortJob(jobInfo.name, jobInfo.number);
        return MSG_TEXTS.JOB_ABORTED;
    } catch (e) {
        console.log(e);
        return MSG_TEXTS.JOB_NOT_FOUND;
    }
};

const cancelBuildInQueue = async (actionData) => {
    try {
        const buildId = actionData.value;
        await jenkins.cancelBuildInQueue(buildId);
        return MSG_TEXTS.JOB_CANCELLED;
    } catch (e) {
        console.log(e);
        return MSG_TEXTS.JOB_NOT_FOUND;
    }
};

const disableJob = async (actionData) => {
    try {
        const jobName = actionData.value;
        await jenkins.disableJob(jobName);
        return MSG_TEXTS.JOB_DISABLED;
    } catch (e) {
        console.log(e);
        return MSG_TEXTS.JOB_NOT_FOUND;
    }
};

const enableJob = async (actionData) => {
    try {
        const jobName = actionData.value;
        await jenkins.enableJob(jobName);
        return MSG_TEXTS.JOB_ENABLED;
    } catch (e) {
        console.log(e);
        return MSG_TEXTS.JOB_NOT_FOUND;
    }
};

module.exports = {
    buildJob,
    abortJob,
    cancelBuildInQueue,
    enableJob,
    disableJob
};