export const fetchChatResponse =  async(chat) => {
    try {
        const response = await fetch('https://yocobot-server.vercel.app/chat', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: chat.map((message)=> message.message).join(" \n ")
            })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}