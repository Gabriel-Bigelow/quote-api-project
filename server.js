const e = require('express');
const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

app.get('/api/quotes/random', (req, res, next) => {
    const randomQuote = getRandomElement(quotes);
    res.send(randomQuote);
});

app.get('/api/quotes', (req, res, next) => {
    const reqPerson = req.query.person;
    const quotesBy = quotes.filter(quote => quote.person === reqPerson);
    const quotesOnly = { quotes: []};
    
    if (req.query.person){
        quotesBy.forEach(element => quotesOnly.quotes.push(element.quote));
        res.send(quotesOnly);
    } else {
        quotes.forEach(element => quotesOnly.quotes.push(element.quote));
        res.send(quotesOnly);
    }    
});

