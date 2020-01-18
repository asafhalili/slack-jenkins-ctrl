const jenkins = require('../services/jenkins');
const slack = require('../helpers/slack/blocksUtils');
const { MSG_TEXTS } = require('../helpers/slack/textsUtils');

const run = async (cmdText) => {
    try{
        const jobName = cmdText;
        await jenkins.buildJob(jobName);
        return MSG_TEXTS.JOB_STARTED;
    }catch(e){
        console.error(e);
        return MSG_TEXTS.ERROR;
    }
};

const info = async (cmdText) => {
    const jobInfo = await jenkins.getJobInfo(cmdText);
    return slack.createJobBlock(jobInfo);
};

module.exports = {
    run,
    info
}