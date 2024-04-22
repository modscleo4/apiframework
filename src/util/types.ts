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

/**
 * This is used as the same of 'typeof T', but when T is a abstract class
 */
export type Constructor<T> = new (...args: any[]) => T;

/**
 * This is intended to be used as a TypeScript assertion function, without any runtime code.
 * Use this function to assert conditions that TypeScript cannot infer but you know that are true.
 *
 * @param condition The condition to be asserted.
 * @param message The message to be shown if the condition is false. This parameter is not used.
 * @returns Nothing.
 */
export function fakeAssert(condition: boolean, message?: string): asserts condition {
    //
}
