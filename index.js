import makeWASocket, { makeWALegacySocket, useSingleFileAuthState, DisconnectReason } from '@adiwajshing/baileys';

import { Boom } from '@hapi/boom';
const { state, saveState } = useSingleFileAuthState('./auth_info.json');

import app from 'express';
import http from 'http';
import ChatGPT from './lib/chatGPT-lib.js';
import config from './config.json' assert { type: 'json' };

// create http server
const server = http.createServer(app);

const port = process.env.PORT || 8000;

//fungsi suara capital
function capital(textSound) {
	const arr = textSound.split(' ');
	for (var i = 0; i < arr.length; i++) {
		arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
	}
	const str = arr.join(' ');
	return str;
}

async function connectToWhatsApp() {
	const waConfig = {
		auth: state,
		printQRInTerminal: true
	};

	const sock = makeWASocket.default(waConfig);

	sock.ev.on('connection.update', (update) => {
		//console.log(update);
		const { connection, lastDisconnect } = update;
		if (connection === 'close') {
			const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
			console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
			// reconnect if not logged out
			if (shouldReconnect) {
				connectToWhatsApp();
			}
		} else if (connection === 'open') {
			console.log('opened connection');
		}
	});

	sock.ev.on('creds.update', saveState);

	sock.ev.on('messages.upsert', async ({ messages, type }) => {
		//console.log(messages);

		if (type === 'notify') {
			if (!messages[0].key.fromMe) {
				// message declaration as text
				const pesan = messages[0].message.conversation;
				// wa phone number from sender
				const noWa = messages[0].key.remoteJid;

				// read message
				await sock.readMessages([messages[0].key]);

				// convert to lowercase
				const pesanMasuk = pesan.toLowerCase();

				if (!messages[0].key.fromMe && pesanMasuk === 'ping') {
					await sock.sendMessage(noWa, { text: 'Pong' }, { quoted: messages[0] });
				}

				const resultGPT = await askGPT(pesanMasuk);
				await sock.sendMessage(noWa, { text: resultGPT }, { quoted: messages[0] });

			}
		}
	});
}

async function askGPT(text) {
	const chatbot = new ChatGPT(config);
	let answer = await chatbot.ask(text);

	console.log(answer);
	return answer;
}

// run in main file
connectToWhatsApp().catch((err) => console.log('unexpected error: ' + err)); // catch any errors

server.listen(port, () => {
	console.log('Server Berjalan pada Port : ' + port);
});
