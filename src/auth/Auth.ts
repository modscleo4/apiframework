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

import Request from "../http/Request.js";
import User from "./User.js";

export default abstract class Auth {
    abstract authenticate(request: Request): Promise<User>;

    abstract attempt(request: Request): Promise<User | null>;

    abstract authorize(request: Request, user: User): Promise<boolean>;

    abstract logout(request: Request, user: User): Promise<void>;
}
