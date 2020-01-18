const createButton = (text, actionId, value, style) => {
    return {
        "type": "button",
        "text": {
            "type": "plain_text",
            "emoji": true,
            "text": text
        },
        "style": style,
        "value": value,
        "action_id": actionId,
    };
};

const getEnableButton = (jobName) => {
    return createButton("Enable", "enableJob", jobName, "primary");
};

const getDisableButton = (jobName) => {
    return createButton("Disable", "disableJob", jobName, "danger");
};

const getAbortButton = (jobName, jobNumber) => {
    return createButton(
        "Abort", 
        "abortJob", 
        JSON.stringify({ name: jobName, number: jobNumber }),
        "danger"
    );
};

const getBuildButton = (jobName) => {
    return createButton("Build", "buildJob", jobName, "primary");
};

const getCancelBuildInQueueButton = (jobId) => {
    return createButton("Cancel", "cancelBuildInQueue", jobId, "danger");
};

const getEnableOrDisableButton = (jobInfo) => {
    return (jobInfo.buildable ? getDisableButton(jobInfo.name) : getEnableButton(jobInfo.name));
};

const getBuildOrAbortButton = (jobInfo) => {
    if(jobInfo.hasRunningBuild) {
        return getAbortButton(jobInfo.name, jobInfo.lastBuild.number);
    } else {
        return getBuildButton(jobInfo.name); 
    }
};

module.exports = {
    getEnableButton,
    getDisableButton,
    getAbortButton,
    getBuildButton,
    getEnableOrDisableButton,
    getBuildOrAbortButton,
    getCancelBuildInQueueButton
}