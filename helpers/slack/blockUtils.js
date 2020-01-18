const { getJobTitle, getJobStatusText, getQueuedJobText, createBoldText, TITLES } = require('./textUtils');
const { getBuildOrAbortButton,
    getEnableButton,
    getEnableOrDisableButton,
    getCancelBuildInQueueButton } = require('./buttonUtils');

const WITHOUT_DESCRIPTION = false;

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
    };
};


const createJobActions = (jobInfo) => {
    let elements;
    if (!jobInfo.hasRunningBuild && !jobInfo.buildable) {
        elements = [getEnableOrDisableButton(jobInfo)];
    } else {
        elements = [
            getBuildOrAbortButton(jobInfo),
            getEnableOrDisableButton(jobInfo)
        ];
    }

    return {
        type: "actions",
        elements
    };
};

const createJobPrimaryAction = (jobInfo) => {
    if (jobInfo.buildable) {
        return getBuildOrAbortButton(jobInfo);
    } else {
        return getEnableButton(jobInfo.name);
    }
};

const createJobBlock = (jobInfo) => {
    return createBlocks(
        createTextSection(getJobTitle(jobInfo)),
        createTextSection(createBoldText(getJobStatusText(jobInfo))),
        createJobActions(jobInfo)
    );
};

const createJobsBlock = (jobsInfo) => {
    const sections = jobsInfo.map(
        job => createTextSectionWithAccessory(
            `${getJobTitle(job, WITHOUT_DESCRIPTION)}\n${getJobStatusText(job)}`,
            createJobPrimaryAction(job)
        )
    );

    return createBlocks(
        createTextSection(TITLES.JOBS),
        createDivider(),
        ...sections
    );
};

const createQueueBlock = (queueInfo) => {
    const sections = queueInfo.map(
        job => createTextSectionWithAccessory(
            getQueuedJobText(job),
            getCancelBuildInQueueButton(String(job.id))
        )
    );

    return createBlocks(
        createTextSection(TITLES.JOBS_IN_QUEUE),
        createDivider(),
        ...sections
    );
};

module.exports = {
    createJobBlock,
    createJobsBlock,
    createQueueBlock
}