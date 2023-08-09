import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig = {
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf((data): string => {
      const requestId = data?.params?.requestId ?? 'N/A';
      const phraseDefault = `[${data.level}] [${data.timestamp}] [${requestId}]: ${data.message}`;
      if (data.params) {
        const stringParam = JSON.stringify(data.params);
        return phraseDefault + ' - ' + stringParam;
      }

      return phraseDefault;
    }),
    // format.json(),
  ),
  transports: [
    new transports.DailyRotateFile({
      filename: '.logs/application-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf((data): string => {
          const requestId = data?.params?.requestId ?? 'N/A';
          const phraseDefault = `[${data.level}] [${data.timestamp}] [${requestId}]: ${data.message}`;
          if (data.params) {
            const stringParam = JSON.stringify(data.params);
            return phraseDefault + ' - ' + stringParam;
          }

          return phraseDefault;
        }),
      ),
    }),
  ],
};
