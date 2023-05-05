export const fetchSummary =  async(articleUrl) => {
    try {
        const response = await fetch('https://yocobot-server.vercel.app/summarize', { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                articleUrl
            })
        })

        const data = await response.json()
        
        return data
    } catch (error) {
        console.log(error);
    }
}