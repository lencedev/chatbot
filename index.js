import openai from "./config/open-ai.js";
import readlineSync from "readline-sync";
import colors from "colors";

function exit(userInput) {
    return userInput.toLowerCase() === "exit";
}

async function chatBot(userInput, chatHistory) {
    try {
        const messages = chatHistory.map(([role, content]) => ({ role, content }))
        messages.push({ role: "user", content: userInput });
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });
        const chatMessage = chatCompletion.choices[0].message.content;
        console.log(colors.green(('Bot: ')) + chatMessage);
        chatHistory.push(['user', userInput]);
        chatHistory.push(['assistant', chatMessage]);

    } catch (error) {
        console.error('Error creating chat completion:', error);
    }
}

async function main() {
    console.log(colors.green("Welcome to the ChatBot Program !"));
    console.log(colors.green("You can start chatting with the ChatBot."));

    const chatHistory = [];

    while (true) {
        const userInput = readlineSync.question(colors.yellow("You: "));
        if (exit(userInput)) {
            console.log(colors.green("Exiting ChatBot Program. Goodbye!"));
            break;
        }
        await chatBot(userInput, chatHistory);
    }
}

main();
