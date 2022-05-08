// Valid TankTrouble AJAX targets
const targetURLs = {
	online: 'https://tanktrouble.com/ajax/',
	beta: 'https://beta.tanktrouble.com/ajax/',
	cdn: 'https://cdn.tanktrouble.com/ajax/',
	'cdn-beta': 'https://cdn-beta.tanktrouble.com/ajax/',
	'test-cdn-beta': 'https://test-cdn-beta.tanktrouble.com/ajax/'
};

addEventListener('fetch', event => {
	event.respondWith((async function() {
		// Ensure that the method is POST. If not, throw the caller an error.
		if (event.request.method !== 'POST') return new Response('Request must be submitted via POST.', { status: 405 });

		// Get the target URL from the request pathname.
		const originURL = new URL(event.request.url);
		const [, target] = originURL.pathname.split('/');
		const targetURL = targetURLs[target] ?? targetURLs.online;

		// Fetch the query on the target URL.
		const response = await fetch(targetURL, {
			redirect: 'follow',
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': event.request.headers.get('Origin')
			},
			method: 'POST',
			body: event.request.body
		});

		// Return the response.
		return new Response(await response.arrayBuffer(), {
			headers: response.headers,
			status: response.status,
			statusText: response.statusText
		});
	})());
});
