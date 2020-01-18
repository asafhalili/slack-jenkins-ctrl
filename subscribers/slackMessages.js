const jenkins = require('../services/jenkins');
const slack = require('../helpers/slack/blocksUtils');
const { MSG_TEXTS } = require('../helpers/slack/textsUtils');

const buildJob = async (context) => {
    try {
        const jobName = context.matches[2];
        await jenkins.buildJob(jobName);
        return MSG_TEXTS.JOB_STARTED;
    } catch (e) {
        console.log(e);
        return MSG_TEXTS.ERROR;
    }
};

const findJobs = async (jobPartialName) => {
    const jobsInfo = await jenkins.findJobs(jobPartialName);

    if (jobsInfo.length == 0) {
        return MSG_TEXTS.JOB_NOT_FOUND;
    }

    if (jobsInfo.length == 1) {
        const jobInfo = await jenkins.getJobInfo(jobsInfo[0].name);
        return slack.createJobBlock(jobInfo);
    }

    const detailedJobsInfo = await Promise.all(
        jobsInfo.map(job => jenkins.getJobInfo(job.name)));

    return slack.createJobsBlock(detailedJobsInfo);
};

const getAllJobs = async () => {
    const jobsInfo = await jenkins.getAllJobs();
    if (jobsInfo.length == 0) {
        return MSG_TEXTS.NO_JOBS;
    } else {
        const detailedJobsInfo = await Promise.all(jobsInfo.map(job => jenkins.getJobInfo(job.name)));
        return slack.createJobsBlock(detailedJobsInfo);
    }
};

const getJobsInQueue = async () => {
    const jobsInfo = await jenkins.getJobsInQueue();
    if (jobsInfo.length == 0) {
        return MSG_TEXTS.NO_JOBS_IN_QUEUE;
    } else {
        return slack.createQueueBlock(jobsInfo);
    }
};

module.exports = {
    buildJob,
    getAllJobs,
    findJobs,
    getJobsInQueue
};