import makeWASocket, { useMultiFileAuthState, DisconnectReason } from '@adiwajshing/baileys';

import { Boom } from '@hapi/boom';
import { Configuration, OpenAIApi } from 'openai'
import ChatGPT from './lib/chatGPT-lib.js';
import config from './config.json' assert { type: 'json' };

const configuration = new Configuration({
	apiKey: config.openaiKey,
});
const openai = new OpenAIApi(configuration);


async function connectToWhatsApp() {
	const { state, saveCreds } = await useMultiFileAuthState('./auth_info');
	const waConfig = {
		auth: state,
		printQRInTerminal: true
	};

	const sock = makeWASocket.default(waConfig);
	
	sock.ev.process(
		async(events) => {
			if(events['connection.update']) {
				const update = events['connection.update']
				const { connection, lastDisconnect } = update

				if(connection === 'close') {
					// reconnect if not logged out
					const shouldReconnect = (lastDisconnect.error = Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
					console.log('connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
					// reconnect if not logged out
					if (shouldReconnect) {
						connectToWhatsApp();
					}
				}

				console.log('connection update', update)
			}

			// credentials updated -- save them
			if(events['creds.update']) {
				await saveCreds()
			}

			// messages received
			if(events['messages.upsert']) {
				const upsert = events['messages.upsert']
				console.log('recv messages ', JSON.stringify(upsert, undefined, 2))

				// message received not group
				if(upsert.messages[0].key.participant === undefined) {
					// message declaration as text
	 				const pesan = await upsert.messages[0].message.conversation;
					// read messages
					await sock.readMessages(upsert.messages.map(m => m.key))
					// convert to lowercase
					const pesanMasuk = pesan.toLowerCase();
					// if message contains 'ping'
					if(pesanMasuk.includes('ping')) {
						// send a reply
						await sock.sendMessage(upsert.messages[0].key.remoteJid, { text: 'Pong' }, { quoted: upsert.messages[0] })
					} else {
						// send a gpt
						const resultGPT = await askGPT(pesanMasuk);
						await sock.sendMessage(upsert.messages[0].key.remoteJid, { text: resultGPT }, { quoted: upsert.messages[0] });
					}
				}
			}
		}
	)
	
	return sock;

}


async function askGPT(text) {
	const chatbot = new ChatGPT(openai);
	return chatbot.ask(text);
}

// run in main file
connectToWhatsApp().catch((err) => console.log('unexpected error: ' + err)); // catch any errors
