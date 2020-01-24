const xml2js = require('xml2js');

let jenkins;

const buildJenkinsUri = () => {
    if (process.env.JENKINS_URI) {
        return process.env.JENKINS_URI;
    }

    const userName = process.env.JENKINS_USERNAME || 'admin';
    const password = process.env.JENKINS_PASSWORD;
    const protocol = process.env.JENKINS_PROTOCOL || 'http';
    const host = process.env.JENKINS_HOST || 'localhost';
    const port = process.env.JENKINS_PORT || '8080';

    return `${protocol}://${userName}:${password}@${host}:${port}`;
}

const init = () => {
    jenkins = require('jenkins')(
        {
            baseUrl: buildJenkinsUri(),
            crumbIssuer: true,
            promisify: true
        }
    );
}

const buildJob = async (jobName) => {
    const isParameterized = await isJobParameterized(jobName);
    if (isParameterized) {
        return await jenkins.job.build({ name: jobName, parameters: {} });
    } else {
        return await jenkins.job.build(jobName);
    }
};

const abortJob = async (jobName, jobNumber) => {
    return await jenkins.build.stop(jobName, jobNumber);
};

const getJobConfig = async (jobName) => {
    const xml = await jenkins.job.config(jobName);
    const parser = xml2js.Parser();
    const jobConfig = await parser.parseStringPromise(xml);
    return jobConfig;
};

const isJobParameterized = async (jobName) => {
    const jobConfig = await getJobConfig(jobName);
    return !!(jobConfig.project.properties[0]['hudson.model.ParametersDefinitionProperty']);
};

const getJobInfo = async (jobName) => {
    const jobInfo = await jenkins.job.get(jobName);
    return {
        hasRunningBuild: hasRunningBuild(jobInfo),
        isParameterized: await isJobParameterized(jobInfo.name),
        ...jobInfo
    };
};

const getAllJobs = async () => {
    return await jenkins.job.list();
};

const getJobsInQueue = async () => {
    return await jenkins.queue.list();
};

const findJobs = async (jobPartialName) => {
    const allJobs = await getAllJobs();
    return allJobs.filter(job => job.name.toLowerCase().includes(jobPartialName.toLowerCase()));
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
};

module.exports = {
    init,
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
