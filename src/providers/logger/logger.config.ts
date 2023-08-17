import { format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { LOG_LEVEL, LOG_LEVEL_ARRAY } from './logger.constant';

const getTypeByLog = (
  elements: any[],
): 'info' | 'error' | 'warn' | 'undefined' => {
  let typeLoggerFind: string | undefined;
  const element = elements.find((element) => {
    return LOG_LEVEL_ARRAY.some((typeLog) => {
      if (
        !!element &&
        typeof element === 'string' &&
        element.includes(typeLog)
      ) {
        typeLoggerFind = typeLog;
        return true;
      }
    });
  });

  if (element && typeLoggerFind) {
    const firstIndexPartType = element.indexOf(typeLoggerFind);
    const lastIndexPartType = typeLoggerFind.length;

    const type = element.substring(
      firstIndexPartType,
      firstIndexPartType + lastIndexPartType,
    );
    return type;
  }

  return 'undefined';
};

function formatLog(param: any) {
  const context = param?.context?.[0] ?? {};
  let requestId = context ?? 'N/A';
  requestId = param?.context?.requestId ?? requestId;

  const phraseDefault = `[${param.level}] [${param.timestamp}] [${requestId}]: ${param.message}`;
  if (typeof context === 'object') {
    const stringParam = JSON.stringify(context);
    return phraseDefault + ' - ' + stringParam;
  }

  return phraseDefault;
}

function formatLogError(param: any): string {
  const requestId = param?.stack?.[0]?.requestId ?? 'N/A';
  const phraseDefault = `[${param.level}] [${param.timestamp}] [${requestId}]: ${param.message}`;
  if (typeof param.stack === 'object') {
    const stringParam = JSON.stringify(param?.stack);
    return phraseDefault + ' - ' + stringParam;
  }
  return phraseDefault;
}

export const winstonConfig = {
  format: format.combine(
    format.timestamp(),
    format.simple(),
    format.printf((data): string => {
      const values = Object.values(data);
      const level = getTypeByLog(values);
      if (level === LOG_LEVEL.ERROR) {
        return formatLogError(data);
      } else if (level === LOG_LEVEL.INFO) {
        return formatLog(data);
      }
      return '';
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
        format.timestamp(),
        format.simple(),
        format.printf((data): any => {
          const values = Object.values(data);
          const level = getTypeByLog(values);
          if (level === LOG_LEVEL.ERROR) {
            return formatLogError(data);
          } else if (level === LOG_LEVEL.INFO) {
            return formatLog(data);
          }
          return '';
        }),
      ),
    }),
  ],
};
