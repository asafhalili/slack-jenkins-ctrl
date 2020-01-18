const jenkins = require('../services/jenkins');
const slack = require('../helpers/slack/blockUtils');

const { MSG_TEXTS } = require('../helpers/slack/textUtils');

const buildJob = async (jobName, say) => {
    await jenkins.buildJob(jobName);
    say(MSG_TEXTS.JOB_STARTED(jobName));
};

const enableJob = async (jobName, say) => {
    await jenkins.enableJob(jobName);
    say(MSG_TEXTS.JOB_ENABLED(jobName));
};

const disableJob = async (jobName, say) => {
    await jenkins.disableJob(jobName);
    say(MSG_TEXTS.JOB_DISABLED(jobName));
};

const findJobs = async (jobPartialName, say) => {
    say(MSG_TEXTS.SEARCH_JOBS(jobPartialName));
    const jobsInfo = await jenkins.findJobs(jobPartialName);

    if (jobsInfo.length == 0) {
        say(MSG_TEXTS.JOB_NOT_FOUND(jobPartialName));
    } else if (jobsInfo.length == 1) {
        const jobInfo = await jenkins.getJobInfo(jobsInfo[0].name);
        say(slack.createJobBlock(jobInfo));
    } else {
        const detailedJobsInfo = await Promise.all(
            jobsInfo.map(job => jenkins.getJobInfo(job.name)));

        say(slack.createJobsBlock(detailedJobsInfo));
    }
};

const getAllJobs = async (say) => {
    const jobsInfo = await jenkins.getAllJobs();
    if (jobsInfo.length == 0) {
        say(MSG_TEXTS.NO_JOBS());
    } else {
        const detailedJobsInfo = await Promise.all(jobsInfo.map(job => jenkins.getJobInfo(job.name)));
        say(slack.createJobsBlock(detailedJobsInfo));
    }
};

const getJobsInQueue = async (say) => {
    const jobsInfo = await jenkins.getJobsInQueue();
    if (jobsInfo.length == 0) {
        say(MSG_TEXTS.NO_JOBS_IN_QUEUE());
    } else {
        say(slack.createQueueBlock(jobsInfo));
    }
};

module.exports = {
    buildJob,
    getAllJobs,
    findJobs,
    getJobsInQueue,
    enableJob,
    disableJob
};