const targetURLs = {
	online: 'https://tanktrouble.com/ajax/',
	beta: 'https://beta.tanktrouble.com/ajax/',
	cdn: 'https://cdn.tanktrouble.com/ajax/',
	'cdn-beta': 'https://cdn-beta.tanktrouble.com/ajax/',
	'test-cdn-beta': 'https://test-cdn-beta.tanktrouble.com/ajax/'
};

addEventListener('fetch', event => {
	event.respondWith((async function() {
		if (event.request.method !== 'POST') return new Response(`Only POST requests are allowed. You attempted: ${ event.request.method }`, { status: 405 });

		const originURL = new URL(event.request.url);
		const [, target] = originURL.pathname.split('/');
		const targetURL = targetURLs[target] ?? targetURLs.online;

		const response = await fetch(targetURL, {
			redirect: 'follow',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': event.request.headers.get('Origin')
			},
			method: 'POST',
			body: event.request.body
		});

		return new Response(await response.arrayBuffer(), {
			headers: new Headers(response.headers),
			status: response.status,
			statusText: response.statusText
		});
	})());
});
