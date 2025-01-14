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

import ConfigProvider from "../app/ConfigProvider.js";
import type { Application } from "../app/Server.js";
import type { Constructor } from "../util/types.js";

export type PublicPathConfig = {
    /** Local path to the public directory. */
    path: string;
    /** Index files to be served when a directory is requested. */
    indexFiles?: string[];
    /** Generate an Apache-like index when a directory is requested and no index file is found. */
    generateIndex?: boolean;
    /** Cache configuration */
    cache?: {
        /** Max age in seconds. */
        maxAge?: number;
    };
};

export abstract class PublicPathConfigProvider extends ConfigProvider<PublicPathConfig> {
    static override config: symbol = Symbol('midori::PublicPath');
}

export default function PublicPathConfigProviderFactory(options: PublicPathConfig): Constructor<PublicPathConfigProvider> & { [K in keyof typeof PublicPathConfigProvider]: typeof PublicPathConfigProvider[K] } {
    return class extends PublicPathConfigProvider {
        override register(app: Application): PublicPathConfig {
            return options;
        }
    };
};
