const express = require('express')
const router = express.Router()
const Quote = require('../models/quote')

//Getting all quotes
router.get('/', async (req, res) => {
    try{
        const quotes = await Quote.find()
        res.json(quotes)
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Getting one
router.get('/:id', getQuote, (req, res) => {
    res.json(res.subscriber)
})

//Creating one
router.post('/', async (req, res) => {
    const quote = new Quote({
        quote: req.body.quote,
        source: req.body.source,
        year: req.body.year
    })
    try {
        const newQuote = await quote.save()
        res.status(201).json(newQuote)
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

//Updating one
router.patch('/:id', getQuote, async (req, res) => {
    if (req.body.quote != null) {
        res.quote.quote = req.body.quote
    }
    if (req.body.source != null) {
        res.quote.source = req.body.source
    }
    try{
        const updatedQuote = await res.quote.save()
        res.json(updatedQuote)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

//Deleting one
router.delete('/:id', getQuote, async (req, res) => {
    try{
        await res.quote.remove()
        res.json({message: 'Deleted quote'})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

async function getQuote(req, res, next) {
    let quote
    try {
        quote = await Quote.findById(req.params.id)
        if (quote == null) {
            return res.status(404).json({message: 'Cannont find quote'})
        }
    } catch (err) {
        return res.status(500).json({message: err.message})
    }

    res.quote = quote
    next()
}

module.exports = router