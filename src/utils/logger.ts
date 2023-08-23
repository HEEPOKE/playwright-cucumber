import { transports, format } from 'winston';
import LoggerOptions from '../interfaces/logger_interface';

function optionsLogger(options: LoggerOptions) {
  const { level, scenarioName } = options;

  return {
    transports: [
      new transports.File({
        filename: `test-results/logs/${scenarioName}/log.log`,
        level,
        format: format.combine(
          format.timestamp({ format: 'DD-MMM-YYYY HH:mm:ss' }),
          format.align(),
          format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`)
        )
      })
    ]
  };
}

export default optionsLogger;
