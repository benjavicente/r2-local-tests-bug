import { env, createExecutionContext } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

import worker from '../src/index';

describe('Tests environment with local R2', () => {
	it('Is connected to local R2', async () => {
		expect(env.testFiles).toBeDefined();
		const response = await env.testFiles.list();
		expect(response).toBeDefined();
		expect(response.objects).toBeInstanceOf(Array);
	});

	/**
	 * upload a file, for example, src/index.ts
	 * > wrangler r2 object put testFiles/src/index.ts --env tests --file ./src/index.ts --local
	 * locally, I have the following error
	 * ✘ [ERROR] Incorrect type for the 'cacheExpiry' field on 'HttpMetadata': the provided value is not of type 'date'.
	 * so I tried to use it without the env
	 * > wrangler r2 object put testFiles/src/index.ts --file ./src/index.ts --local
	 * but event when the file is correctly saved in the local state, I can't access it here
	 **/

	it('It has files outside worker', async () => {
		const result = await env.testFiles.list();
		expect(result.objects).length.greaterThan(0);
	});

	it('Works with the worker', async () => {
		const ctx = createExecutionContext();
		const response = await worker.fetch(new Request('http://localhost'), env, ctx);
		expect(response.status).toBe(200);
	});
});

declare module 'cloudflare:test' {
	interface ProvidedEnv extends Env {}
}
