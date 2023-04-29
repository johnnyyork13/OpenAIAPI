const prompt = 'Write a short article on how to write a book for beginners.'

function getPrompt(prompt, api_key) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + String(api_key)
        },
        body: JSON.stringify({
            'prompt': `Fix the following code and add comments on what was fixed: ${prompt}`,
            //'prompt': prompt,
            'temperature': 0.8,
            'max_tokens': 800,
            'top_p': 1,
            'frequency_penalty': 0,
            'presence_penalty': 0.5,
            'stop' : ["\"\"\""],
        })
    }

    return requestOptions;
}

submitBtn.addEventListener('click', function() {
    const requestOptions = getPrompt(inputBox.value, API_KEY);
    
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
        const derivedData = data.choices[0].text;
        inputBox.value = derivedData;
        const e = document.createElement('p');
        e.textContent = derivedData;
        rightContainer.appendChild(e);
    }).catch(err => {
        console.log(err);
        console.log('Ran out of tokens!');
    })
})












/*
const openai = new OpenAIApi(new Configuration({
    organization: ORGANIZATION,
    apiKey: API_KEY
}));

async function generateText() {
    const response = await openai.createCompletion(DEFAULT);
    return response.choices[0].text;
}

console.log(generateText());
*/