import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import * as moment from 'moment-timezone';
import * as fs from 'fs/promises';
import { join } from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');
  private logFilePath = join(__dirname, 'logs', 'all_logs.txt'); //Adiciona os novos logs ao arquivo

  constructor() {
    // Cria o repositório Log caso não exista
    fs.mkdir(join(__dirname, 'logs'), { recursive: true }).catch((error) => {
      console.error('Erro ao criar diretório de logs:', error);
    });
  }

  async use(req: any, res: any, next: (error?: any) => void) {
    const { ip, method, protocol, originalUrl } = req;
    const start = Date.now();
    const reqDatetime = moment().tz('America/Sao_Paulo').format();

    res.on('finish', async () => {
      const { statusCode } = res;
      const responseTime = Date.now() - start;
      const url = `http://localhost:3000${originalUrl}`;
      const msg = `Método: ${method} Url: ${url} Protocolo de Acesso: [${protocol}] Status Code: ${statusCode} - IP: ${ip} - Response Time: ${responseTime}ms - Request Datetime: ${reqDatetime}`;

      try {
        await fs.appendFile(this.logFilePath, msg + '\n');
        this.logger.warn(msg);
      } catch (error) {
        console.error('Erro ao escrever no arquivo de log:', error);
      }
    });

    next();
  }
}
