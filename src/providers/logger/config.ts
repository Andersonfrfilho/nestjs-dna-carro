import { format, transports } from 'winston';
import 'winston-daily-rotate-file';

export const winstonConfig = {
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf((data): string => {
      const [context] = data?.context;
      let requestId = context ?? 'N/A';
      requestId = context?.requestId || requestId;
      const phraseDefault = `[${data.level}] [${data.timestamp}] [${requestId}]: ${data.message}`;
      if (typeof context === 'object') {
        const stringParam = JSON.stringify(context);
        return phraseDefault + ' - ' + stringParam;
      }

      return phraseDefault;
    }),
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
          const [context] = data?.context;
          let requestId = context ?? 'N/A';
          requestId = context?.requestId || requestId;
          const phraseDefault = `[${data.level}] [${data.timestamp}] [${requestId}]: ${data.message}`;
          if (typeof context === 'object') {
            const stringParam = JSON.stringify(context);
            return phraseDefault + ' - ' + stringParam;
          }

          return phraseDefault;
        }),
      ),
    }),
  ],
};
