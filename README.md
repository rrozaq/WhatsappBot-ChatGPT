# ChatGPT API <!-- omit in toc -->

> Node.js client for the unofficial [ChatGPT](https://openai.com/blog/chatgpt/) API and unofficial WhatsApp [Baileys](https://github.com/adiwajshing/Baileys/) API.

## Usage & Install

Make sure you have nodejs installed on your computer.

```bash
1. Clone this repo
2. run `npm install`
3. set `openaiKey` in config.json
4. run:
node index.js
or
nodemon index.js
```

> **Note**

> Per the official OpenAI Discord on December 7th, 2022: The ChatGPT servers are currently experiencing "exceptionally high demand," so some requests may slow d(https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/503).


### openaiKey OpenAI

To get a key openapi:

1. Go to https://openai.com/api and log in or sign up.
2. Click Personal Profile.
3. View API Keys
4. Click Button Create New Secret Key
then show popup modal API key generated, Copy the value and save it to your config.json file.

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
