import Server from "../app/Server.js";
import Middleware from "../http/Middleware.js";
import Request from "../http/Request.js";
import Response from "../http/Response.js";
import { Payload, validateJWT } from "../util/jwt.js";

export default class AuthBearerMiddleware extends Middleware {
    async process(req: Request, next: (req: Request) => Promise<Response>, server: Server): Promise<Response> {
        if (!req.headers['authorization']) {
            return Response.json({ message: 'Invalid Authorization header.' })
                .withHeader('WWW-Authenticate', 'Bearer')
                .withStatus(401);
        }

        const [scheme, credentials] = req.headers['authorization'].split(' ', 2);

        if (scheme !== 'Bearer') {
            return Response.json({ message: 'Invalid Authorization scheme.' })
                .withHeader('WWW-Authenticate', 'Bearer')
                .withStatus(401);
        }

        if (!credentials || !validateJWT(credentials)) {
            return Response.json({ message: 'Invalid Authorization credentials.' })
                .withHeader('WWW-Authenticate', 'Bearer')
                .withStatus(401);
        }

        const [, payloadBase64] = credentials.split('.');

        const payload: Payload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString());

        if (!(
            typeof payload === 'object'
            && payload.exp
            && payload.iat
        )) {
            return Response.json({ message: 'Invalid Authorization credentials.' })
                .withHeader('WWW-Authenticate', 'Bearer')
                .withStatus(401);
        }

        if (payload.exp * 1000 < Date.now()) {
            return Response.json({ message: 'Token has expired.' })
                .withHeader('WWW-Authenticate', 'Bearer')
                .withStatus(401);
        }

        req.container.set('jwt', payload);

        return await next(req);
    }
}