# Slack Jenkins Ctrl
Jenkins Ctrl (or Jenkins Controller) is a slack app that allow control Jenkins from Slack easily & quickly.

## Features
Currently, all the features are messages-based (instead of slack commands based).

- find/search <JOB>
- run/build <JOB>
- enable <JOB>
- disable <JOB>
- jobs
- queue

Detailed explanations & images

## Usage
In order to use Jenkins Ctrl, you need to provide few environment variables:

| Environment Variable  | Description | Default value |
| --------------------  | ----------- | ------------- |
| JENKINS_URI  | URI in the format: http://username:password@host:port  | No default value |
| JENKINS_CTRL_PORT  | The Port that should be used by Jenkins Ctrl  | 3000 |
| SLACK_SIGNING_SECRET  | Slack Signing Secret, provided while installing the app in Slack.com | No default value |
| SLACK_BOT_TOKEN  | Slack Bot Token, provided while installing the app in Slack.com  | No default value |
| JENKINS_USERNAME  | Jenkins Username  | admin |
| JENKINS_PASSWORD  | Jenkins Password  | No default value |
| JENKINS_PROTOCOL  | Jenkins Protocol (http/https)  | http |
| JENKINS_HOST  | Jenkins Host  | localhost |
| JENKINS_PORT  | Jenkins Port  | 8080 |

If JENKINS_URI is provided, then JENKINS_USERNAME, JENKINS_PASSWORD, JENKINS_PROTOCOL, JENKINS_HOST and JENKINS_PORT are not necessary.

The app should run with npm (node package manager). 
To start the app, execute the following commands:

```
npm run build
npm run start
```

## Docker
The app is dockerized. Dockerfile is attached.
Here are some example commands to build the app & run with docker.

Build: 
```
docker build -t jenkins-ctrl .
```

Run:
```
docker run -e JENKINS_URI=http://admin:Aa12345@localhost:8080 -e SLACK_SIGNING_SECRET=<SLACK_SIGNING_SECRET> -e SLACK_BOT_TOKEN=<SLACK_BOT_TOKEN> -p <HOST_PORT>:3000  jenkins-ctrl
```



