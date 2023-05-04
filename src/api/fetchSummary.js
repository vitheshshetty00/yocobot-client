export const fetchSummary =  async(articleUrl) => {
    try {
        const response = await fetch('http://localhost:3080/summarize', { 
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