/**
 * Copyright 2022 Dhiego Cassiano Fogaça Barbosa
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Application } from "../app/Server.js";
import Middleware from "../http/Middleware.js";
import Request from "../http/Request.js";
import Response from "../http/Response.js";
import { RouterServiceProvider } from "../providers/RouterServiceProvider.js";
import Router from "../router/Router.js";

/**
 * Middleware to route the request to the correct handler using the Router Service.
 */
export default class RouterMiddleware extends Middleware {
    #router: Router;

    constructor(app: Application) {
        super(app);

        this.#router = app.services.get(RouterServiceProvider);
    }

    async process(req: Request, next: (req: Request) => Promise<Response>): Promise<Response> {
        const routes = this.#router.filter(req.path);

        const route = routes.find(r => r.method === req.method);

        req.container.set('::routes', routes);
        req.container.set('::route', route);

        return await next(req);
    }
}
