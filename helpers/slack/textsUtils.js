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

const MSG_TEXTS = {
    ERROR: 'Oops... Something went wrong :(',
    JOB_NOT_FOUND: `Hmmm...Couldn't find any job. Maybe you spelled it wrong?`,
    JOB_STARTED: `Yay! I started the job`,
    JOB_ENABLED: `Yay! I enabled the job`,
    JOB_DISABLED: `I disabled the job, no one can run it`,
    JOB_ABORTED: `I aborted the job`,
    JOB_STOPPED: `I stopped the job`,
    JOB_CANCELLED: `The job cancelled and no longer in the queue`,
    NO_JOBS: 'Hmmm... No jobs at all',
    NO_JOBS_IN_QUEUE: 'Yay! No jobs waiting in the queue'

}

const getLastBuildLink = (jobInfo) => {
    return `<${jobInfo.lastBuild.url}|${jobInfo.lastBuild.number}>`;
}

const getJobStatusText = (jobInfo) => {
    console.log('color', jobInfo.color);
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

module.exports = {
    getJobStatusText,
    MSG_TEXTS
};