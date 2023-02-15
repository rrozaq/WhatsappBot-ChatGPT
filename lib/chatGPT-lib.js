class ChatGPT {
    constructor(openai) {
        this.openai = openai;
    }

    async ask(prompt) {
        try {
            const response = await this.openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0,
                max_tokens: 1000,
                top_p: 1,
                frequency_penalty: 0.2,
                presence_penalty: 0,
            });

            return response.data.choices[0].text;
        
        } catch (err) {
            console.log(`ERROR: Could not find or parse actual response text due to: ${err}`);
            return 'ChatGPT failed to respond. Please try again.';
        }
    }
}

export default ChatGPT;