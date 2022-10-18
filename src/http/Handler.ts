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
import Request from "./Request.js";
import Response from "./Response.js";

/**
 * Provides a handler for HTTP requests.
 */
export default abstract class Handler {
    constructor(app: Application) {
        //
    }

    /**
     * Handle a request.
     */
    abstract handle(req: Request): Promise<Response>;
}
