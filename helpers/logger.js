const { createLogger, format, transports } = require('winston');
const { printf } = format;

const logFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const log = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        logFormat
      ),

    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        new transports.File({ filename: 'logs/all.log' })
    ]
  });

module.exports = {
    log
};