const jenkins = require('jenkins')(
    {
        baseUrl: process.env.JENKINS_URI,
        crumbIssuer: true,
        promisify: true
    }
);

const buildJob = async (jobName) => {
    return await jenkins.job.build(jobName);
};

const abortJob = async (jobName, jobNumber) => {
    return await jenkins.build.stop(jobName, jobNumber);
};

const getJobInfo = async (jobName) => {
    const jobInfo = await jenkins.job.get(jobName);
    return {
        hasRunningBuild: hasRunningBuild(jobInfo),
        ...jobInfo
    };
};

const getAllJobs = async () => {
    const jobs = await jenkins.job.list();
    return jobs;
};

const getJobsInQueue = async () => {
    const jobs = await jenkins.queue.list();
    return jobs;
};

const findJobs = async (jobPartialName) => {
    const allJobs = await getAllJobs();
    return allJobs.filter(job => job.name.includes(jobPartialName));
};

const cancelBuildInQueue = async (buildId) => {
    await jenkins.queue.cancel(buildId);
};

const disableJob = async (jobName) => {
    await jenkins.job.disable(jobName);
};

const enableJob = async (jobName) => {
    await jenkins.job.enable(jobName);
};

const hasRunningBuild = (jobInfo) => {
    return jobInfo.color.includes('anime');
}

module.exports = {
    buildJob,
    abortJob,
    getJobInfo,
    getAllJobs,
    findJobs,
    getJobsInQueue,
    cancelBuildInQueue,
    disableJob,
    enableJob,
    hasRunningBuild
};
