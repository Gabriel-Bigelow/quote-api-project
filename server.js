const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`)
});

app.get('/api/quotes/random', (req, res, next) => {
    const sendQuote = { quote: {} };
    sendQuote.quote = getRandomElement(quotes);
    res.send(sendQuote);
});

app.get('/api/quotes', (req, res, next) => {
    const reqPerson = req.query.person;
    const quotesBy = quotes.filter(quote => quote.person === reqPerson);
    const quotesOnly = { quotes: []};
    
    if (req.query.person){
        quotesBy.forEach(element => quotesOnly.quotes.push(element));
        res.send(quotesOnly);
    } else {
        quotes.forEach(element => quotesOnly.quotes.push(element));
        res.send(quotesOnly);
    }    
});

app.post('/api/quotes', (req, res, next) => {
    const newQuote = { quote: {} };
    newQuote.quote = req.query;
    
    if (req.query.person && req.query.quote){
        quotes.push(newQuote.quote)
        res.send(newQuote)
    } else {
        res.status(400).send();
    }
});