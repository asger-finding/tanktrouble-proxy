# TankTrouble API Proxy

Super simple Cloudflare proxy for TankTrouble's AJAX API.  
Can definitely be adapted to other providers and domains (Cloudflare is just super cool!)

## Demo

[https://ajax.tanktrouble-proxy.workers.dev/](https://ajax.tanktrouble-proxy.workers.dev/)

## Self-hosting

1. Go to [workers.dev](https://workers.cloudflare.com/) and sign up for an account.
2. Go to the [Workers Overview](https://dash.cloudflare.com/sign-up/workers) and press "Create a Service"
3. Name it as you will and select any starter. Click "Create Service"
4. Having opened the service, scroll down to the Worker section and click "Quick Edit"
5. Provide the full source or the minified code in the input field. Press "Save and Deploy"

## Usage

With the JavaScript fetch API

```javascript
// Your (self-hosted) proxy URL
const proxyURL = 'https://ajax.tanktrouble-proxy.workers.dev/';

// See 'targetURLs' in index.js
const subdomain = 'online';

// body.method is your query. In this example, we get the playerDetails of '3162693' (the user Commander)
const playerDetails = await fetch(proxyURL + subdomain, {
  body: JSON.stringify({
    method: 'tanktrouble.getPlayerDetails',
    params: [ '3162693' ]
  }),
  method: 'POST'
}).then(response => response.json());

console.log(playerDetails);
// playerDetails => {
//      id: number;
//      jsonrpc: string;
//
//      /* Will depend on your query */
//      result: {
//          result: boolean;
//          message: string;
//          data: Record<string, (string | number | boolean | Object)>;
//      }
// }
```
