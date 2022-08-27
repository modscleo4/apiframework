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

import { EStatusCode } from "../http/EStatusCode.js";
import Middleware from "../http/Middleware.js";
import Request from "../http/Request.js";
import Response from "../http/Response.js";

/**
 * Middleware to parse the request body, returning a 415 if no recognized Content-Type is detected.
 */
export default class ParseBodyMiddleware extends Middleware {
    async process(req: Request, next: (req: Request) => Promise<Response>): Promise<Response> {
        try {
            req.parseBody();
        } catch (e) {
            return Response.status(EStatusCode.UNSUPPORTED_MEDIA_TYPE);
        }

        return await next(req);
    }
}
