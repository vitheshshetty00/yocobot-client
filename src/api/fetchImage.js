export const fetchImage =  async(prompt) => {
    try {
        // after depoloyment you should change the fetch URL below
        const response = await fetch('http://localhost:3080/generateImage', { 
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