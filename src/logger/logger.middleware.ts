/* eslint-disable prettier/prettier */

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logMsg = `Date: ${new Date().toISOString()}
URL: ${req.originalUrl}
Method: ${req.method}
Headers: ${JSON.stringify(req.headers)}
Body: ${JSON.stringify(req.body)}
-----------------------\n`;

    console.log('LoggerMiddleware triggered for request:', req.originalUrl);

    const logPath = path.join(process.cwd(), 'logs');
    const logFile = path.join(logPath, 'requests_logger.txt');

    console.log('Attempting to write to log file at:', logFile);

    // crear directorio de logs si no existe
    if (!fs.existsSync(logPath)) {
      console.log('Log directory does not exist, creating it at:', logPath);
      fs.mkdirSync(logPath, { recursive: true });
    }

    fs.appendFile(logFile, logMsg, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    next();
  }
}
