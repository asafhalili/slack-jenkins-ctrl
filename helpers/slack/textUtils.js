const STATUS_TEXTS = {
    NEVER_BUILT: jobInfo => ':new: Never Built',
    ABORTED: jobInfo => `:octagonal_sign: Aborted (${getLastBuildLink(jobInfo)})`,
    DISABLED: jobInfo => 'Disabled',
    RUNNING: jobInfo => `:runner: Running (${getLastBuildLink(jobInfo)})`,
    FIRST_TIME_RUNNING: jobInfo => `:crossed_fingers: Running for the first time (${getLastBuildLink(jobInfo)})`,
    SUCCESS: jobInfo => `:white_check_mark: Finished successfully (${getLastBuildLink(jobInfo)})`,
    UNSTABLE: jobInfo => 'Unstable',
    FAILURE: jobInfo => `:x: Finished with failures (${getLastBuildLink(jobInfo)})`,
    WAITING_IN_QUEUE: jobInfo => 'Waiting in Queue',
    UNKNOWN: jobInfo => 'Unknown'
};

const JENKINS_COLORS_TO_STATUSES = {
    'notbuilt': STATUS_TEXTS.NEVER_BUILT,
    'aborted': STATUS_TEXTS.ABORTED,
    'disabled': STATUS_TEXTS.DISABLED,
    'blue_anime': STATUS_TEXTS.RUNNING,
    'aborted_anime': STATUS_TEXTS.RUNNING,
    'red_anime': STATUS_TEXTS.RUNNING,
    'disabled_anime': STATUS_TEXTS.RUNNING,
    'notbuilt_anime': STATUS_TEXTS.FIRST_TIME_RUNNING,
    'blue': STATUS_TEXTS.SUCCESS,
    'yellow': STATUS_TEXTS.UNSTABLE,
    'red': STATUS_TEXTS.FAILURE
};

const TITLES = {
    JOBS: "Jenkins Jobs",
    JOBS_IN_QUEUE: "Jenkins Jobs Waiting in Queue"
};

const MSG_TEXTS = {
    ERROR: jobId => 'Oops... Something went wrong :worried:',
    JOB_NOT_FOUND: jobId => `:thinking_face: Hmmm...Couldn't find any job that contains '${jobId}'. Maybe you spelled it wrong?`,
    JOB_STARTED: jobId => `:face_with_cowboy_hat: Yay! I started the job '${jobId}'`,
    JOB_ENABLED: jobId => `:relaxed: I enabled the job '${jobId}'`,
    JOB_DISABLED: jobId => `:wink: I disabled the job '${jobId}'`,
    JOB_ABORTED: jobId => `:boom: I aborted the job '${jobId}'`,
    JOB_STOPPED: jobId => `:clap: I stopped the job ${jobId}`,
    JOB_CANCELLED: jobId => `The job with queue id ${jobId} cancelled and no longer in the queue`,
    NO_JOBS: jobId => 'Hmmm... No jobs at all :worried:',
    NO_JOBS_IN_QUEUE: jobId => ':bowtie: Yay! No jobs waiting in the queue',
    SEARCH_JOBS: jobId => `:mag_right: Searching jobs that contains '${jobId}'`
};

const getLastBuildLink = (jobInfo) => {
    return `<${jobInfo.lastBuild.url}|${jobInfo.lastBuild.number}>`;
}

const getJobTitle = (jobInfo, withDescription = true) => {
    if (withDescription && jobInfo.description) {
        return `*<${jobInfo.url}|${jobInfo.displayName}>*\n${jobInfo.description}`;
    } else {
        return `*<${jobInfo.url}|${jobInfo.displayName}>*`;
    }
}

const getJobStatusText = (jobInfo) => {
    let status;
    if (!JENKINS_COLORS_TO_STATUSES[jobInfo.color]) {
        status = JENKINS_COLORS_TO_STATUSES[STATUS_TEXTS.UNKNOWN](jobInfo);
    } else {
        status = JENKINS_COLORS_TO_STATUSES[jobInfo.color](jobInfo);
    }

    if (jobInfo.inQueue) {
        status += ` & ${STATUS_TEXTS.WAITING_IN_QUEUE(jobInfo)}`;
    }

    return status;
};

const getQueuedJobText = (jobInfo) => {
    return `<${jobInfo.task.url}|${jobInfo.task.name}>\n${jobInfo.why}`;
}

const createBoldText = (text) => {
    return `*${text}*`;
}

module.exports = {
    getJobTitle,
    getJobStatusText,
    createBoldText,
    getQueuedJobText,
    MSG_TEXTS,
    TITLES
};