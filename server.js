const express = require('express' );
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

const PORT = 3000;

//hold data
let inputRequest = '';
let derivedData = '';
let dataHistory = [{one: 'Consectetur labore voluptate mollit ut.'}, 
    {two: 'Veniam cillum sint fugiat occaecat aute mollit nulla.'}, 
    {three: 'Cupidatat magna amet id cillum voluptate incididunt qui deserunt ex.'}, 
    {four: 'Do ad reprehenderit elit duis tempor Lorem cupidatat.'}, 
    {five: 'Mollit Lorem occaecat ad veniam cupidatat.'}];

let stringified = JSON.stringify(dataHistory);

app.get('/', (req, res) => {
    res.render('index.ejs', {inputBox: 'Test'});
})


app.post('/', (req, res) => {
    inputRequest = req.body.inputBox;
    let requestOptions = getPrompt(inputRequest)
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', requestOptions)
    .then(response => response.json())
    .then(data => {
        derivedData = data.choices[0].text;
        dataHistory.push(derivedData);
        res.render('index', {inputBox: derivedData, inquiries: stringified});
    }).catch(err => {
        console.log(err);
        console.log('Out of tokens!');
    })
})

app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${PORT}`);
})


function getPrompt(prompt) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization': 'Bearer ' + String(process.env.OPENAI_API_KEY),
        },
        body: JSON.stringify({
            'prompt': `${prompt}`,
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
