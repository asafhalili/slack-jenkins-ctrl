const { getBuildOrAbortButton, getEnableButton, getEnableOrDisableButton, getCancelBuildInQueueButton } = require('./buttonsUtils');
const { getJobStatusText } = require('./textsUtils');

const createBlocks = (...sections) => {
    return { blocks: sections };
};

const createDivider = () => {
    return { type: "divider" };
};

const createTextSection = (text) => {
    return {
        type: "section",
        text: {
            type: "mrkdwn",
            text
        }
    };
};

const createTextSectionWithAccessory = (text, accessory) => {
    return {
        ...createTextSection(text),
        accessory
    }
};


const createJobActions = (jobInfo) => {
    return {
        "type": "actions",
        "elements": ((!jobInfo.hasRunningJob && !jobInfo.buildable) ?
            [getEnableOrDisableButton(jobInfo)] :
            [
                getBuildOrAbortButton(jobInfo),
                getEnableOrDisableButton(jobInfo)
            ])
    };
};

const createJobPrimaryAction = (jobInfo) => {
    if (jobInfo.buildable) {
        return getBuildOrAbortButton(jobInfo);
    } else {
        return getEnableButton(jobInfo.name);
    }
};

const getJobTitle = (jobInfo, withDescription = true) => {
    if (withDescription && jobInfo.description) {
        return `*<${jobInfo.url}|${jobInfo.displayName}>*\n${jobInfo.description}`;
    } else {
        return `*<${jobInfo.url}|${jobInfo.displayName}>*`;
    }
}

const createJobBlock = (jobInfo) => {
    return createBlocks(
        createTextSection(getJobTitle(jobInfo)),
        createTextSection(`*${getJobStatusText(jobInfo)}*`),
        createJobActions(jobInfo)
    );
};

const createJobsBlock = (jobsInfo) => {
    const sections = jobsInfo.map(
        job => createTextSectionWithAccessory(
            `${getJobTitle(job, false)}\n${getJobStatusText(job)}`,
            createJobPrimaryAction(job)
        )
    );

    return createBlocks(
        createTextSection("Jenkins Jobs"),
        createDivider(),
        ...sections
    );
};

const createQueueBlock = (queueInfo) => {
    const sections = queueInfo.map(
        job => createTextSectionWithAccessory(
            `<${job.task.url}|${job.task.name}>\n${job.why}`,
            getCancelBuildInQueueButton(String(job.id))
        )
    );

    return createBlocks(
        createTextSection("Jenkins Jobs Waiting in Queue"),
        createDivider(),
        ...sections
    );
};

module.exports = {
    createJobBlock,
    createJobsBlock,
    createQueueBlock
}