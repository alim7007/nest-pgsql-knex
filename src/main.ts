import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
  PayloadTooLargeException,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
// import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
// import { ApiEC, ApiException } from './exceptions';
// import { isArray } from 'lodash';
// import { Request, Response } from 'express';
// const logger = new Logger('ApiServer');

// @Catch()
// export class GlobalExceptionFilter implements ExceptionFilter {
//   catch(exception: Error, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     if (exception?.stack) {
//       logger.error(exception.stack);
//     }

//     logger.error(
//       `Route error: ${exception}, originalUrl: ${request.url}, ips:[${
//         request?.ips?.length ? request?.ips : request.ip
//       }]`,
//     );

//     let apiException: ApiException;

//     if (exception instanceof PayloadTooLargeException) {
//       if (exception?.message === 'File too large') {
//         exception = new ApiException(ApiEC.FileTooLarge);
//       }
//     }

//     if (exception instanceof ApiException) {
//       apiException = exception;
//     } else if (
//       isArray(exception) &&
//       // exception.length > 0 &&
//       exception[0] instanceof ValidationError
//     ) {
//       const validationErrorConstraints = exception[0].constraints
//         ? Object.values(exception[0].constraints!)
//         : [];

//       const validateErrorMsg =
//         validationErrorConstraints.length > 0 &&
//         validationErrorConstraints[0].startsWith('API_')
//           ? validationErrorConstraints[0]
//           : undefined;
//       apiException = new ApiException(ApiEC.WrongInput, validateErrorMsg);
//     } else {
//       apiException = new ApiException(ApiEC.InternalServerError);
//     }
//     const errorResponseDTO = apiException.toErrorDTO();
//     if (
//       exception instanceof ApiException ||
//       process.env.NODE_ENV === 'production'
//     ) {
//       response.status(400).json(errorResponseDTO);
//     } else {
//       response.status(400).json({ ...errorResponseDTO, exception });
//     }
//   }
// }

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap().catch((error) => Logger.error(error));
