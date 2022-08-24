import Server from "../app/Server.js";
import Handler from "../http/Handler.js";
import Middleware from "../http/Middleware.js";
import Request from "../http/Request.js";
import Response from "../http/Response.js";
import { Constructor } from "../util/types.js";

export default class Route {
    #method: string;
    #path: string;
    #handler: Constructor<Handler>;
    #middlewares: Constructor<Middleware>[];
    #name?: string;

    constructor(method: string, path: string, handler: Constructor<Handler>, middlewares: Constructor<Middleware>[]) {
        this.#method = method;
        this.#path = path + (path.endsWith('/') ? '' : '/');
        this.#handler = handler;
        this.#middlewares = middlewares;
    }

    get method() {
        return this.#method;
    }

    get path() {
        return this.#path;
    }

    get handler() {
        return this.#handler;
    }

    get middlewares() {
        return this.#middlewares;
    }

    get name() {
        return this.#name;
    }

    /** @internal */
    async handle(req: Request, server: Server): Promise<Response> {
        let index = 0;

        const next = async (req: Request): Promise<Response> => {
            if (index == this.#middlewares.length) {
                // No more middlewares to process
                const handler = new this.#handler(server);

                return await handler.handle(req);
            }

            const middleware = new this.#middlewares[index++](server);

            return await middleware.process(req, next);
        };

        return await next(req);
    }

    /** @internal */
    getParams(path: string): Map<string, string> {
        const parts = path.split('/');
        const routeParts = this.path.split('/');

        const params = new Map();

        for (let i = 0; i < parts.length; i++) {
            if (routeParts[i].match(/^\{([^\}]+)\}$/)) {
                params.set(/^\{([^\}]+)\}$/.exec(routeParts[i])?.[1] ?? '', parts[i]);
            }
        }

        return params;
    }

    /**
     * Sets the name of the route.
     */
    withName(name: string): Route {
        this.#name = name;

        return this;
    }
}
