import winston from 'winston';
import 'winston-daily-rotate-file';
const transport = new winston.transports.DailyRotateFile({
  filename: '%DATE%.log',
  dirname: './logs/',
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
});

const console =  new winston.transports.Console({ level: 'info' });

const log = winston.createLogger({
  transports: [
    transport,
    console,
  ],
});

export const logger = (data) => {
  log.info(data);
};