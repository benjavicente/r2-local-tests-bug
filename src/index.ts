export default {
	async fetch(request, env, ctx): Promise<Response> {
		const response = await env.testFiles.list({ limit: 1 });
		const first = response.objects.at(0);
		if (!first) return new Response('Not found', { status: 404 });

		const file = await env.testFiles.get(first.key);
		if (!file) return new Response('Not found', { status: 404 });

		return new Response(file.body);
	},
} satisfies ExportedHandler<Env>;
