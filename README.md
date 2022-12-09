# ChatGPT API <!-- omit in toc -->

> Node.js client for the unofficial [ChatGPT](https://openai.com/blog/chatgpt/) API and unofficial WhatsApp [Baileys](https://github.com/adiwajshing/Baileys/) API.

## Usage & Install

Make sure you have nodejs installed on your computer.

```bash
1. Clone this repo
2. run `npm install`
3. set `SessionToken` in config.json
4. run:
node index.js
or
nodemon index.js
```

> **Note**

> Per the official OpenAI Discord on December 7th, 2022: The ChatGPT servers are currently experiencing "exceptionally high demand," so some requests may slow d(https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503).


### Session Tokens OpenAI

**This package requires a valid session token from ChatGPT to access it's unofficial REST API.**

To get a session token:

1. Go to https://chat.openai.com/chat and log in or sign up.
2. Open dev tools.
3. Open `Application` > `Cookies`.
4. Copy the value for `__Secure-next-auth.session-token` and save it to your config.json file.

### Connect to Whatsapp

After running with node index.js or nodemon index.js
in console terminal a qrcode image will appear, scan qrcode with whatsapp application oon your handphone.
OoOhh, this is like login whatsapp on whatsapp web.

## Compatibility

This package is ESM-only. It supports:

- Node.js >= 16.8

## Credits

- [Baileys ](https://github.com/adiwajshing/Baileys) for creating [Whatsapp Bot]([https://openai.com/blog/chatgpt/](https://github.com/adiwajshing/Baileys))
- [OpenAI](https://openai.com) for creating [ChatGPT](https://openai.com/blog/chatgpt/) 🔥
