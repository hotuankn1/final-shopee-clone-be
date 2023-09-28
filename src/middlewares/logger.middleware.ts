import { Logger, NestMiddleware } from "@nestjs/common";
import { Injectable } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction) {
        const { method, url, headers, body, ip } = request;
        const startTime = Date.now();
        const userId = request.session

        this.logger.log(`[UserId]: [${userId || null}] [Request] URI: [${url}] data: [${JSON.stringify({ method, headers, body })}]`);

        response.on('finish', () => {
            const { statusCode } = response;
            const responseBody = response.get('Content-Length');
            const endTime = Date.now();
            const processingTime = endTime - startTime;

            this.logger.log(`[Response] URI: [${url}] data: [${JSON.stringify({ statusCode, responseBody })}] --- respondCode [${statusCode}] respondData [${responseBody}] --- [Time] [UserId] [${processingTime}ms]`);
        })

        next();
    }

}

// [Time] [UserId] URI: [{requestURL}] data: [{requestData}] --- respondCode [{respondCode}] respondData [{respondData}]