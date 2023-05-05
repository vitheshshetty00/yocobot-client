export const fetchImage =  async(prompt) => {
    try {
        const response = await fetch('https://yocobot-server.vercel.app/generateImage', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt
            })
        })

        const data = await response.json()
        return data
    } catch (error) {
        console.log(error);
    }
}