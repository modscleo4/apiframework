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

import { createHmac } from "crypto";

/**
 * Hash-based Message Authentication Code, as used by JWT
 */
export default class HMAC {
    static sign(shaVersion: 256 | 384 | 512, secret: string, data: Buffer): Buffer {
        const hmac = createHmac('sha' + shaVersion, secret);
        hmac.update(data);
        return hmac.digest();
    }

    static verify(shaVersion: 256 | 384 | 512, secret: string, data: Buffer, signature: Buffer): boolean {
        const hmac = createHmac('sha' + shaVersion, secret);
        hmac.update(data);
        return Buffer.compare(hmac.digest(), signature) === 0;
    }
}
