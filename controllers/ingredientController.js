const express = require('express')
const router = express.Router()
const Ingredient = require('../models/Ingredient')

router.get('/', async (req, res) => {
    try {
        const ingredients = await Ingredient.find()
        res.json(ingredients)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getIngredient, (req, res) => {
    res.json(res.ingredient)
})

router.post('/', async (req, res) => {
    const ingredient = new Ingredient({
        name: req.body.name,
        description: req.body.description
    })

    try {
        const newIngredient = await ingredient.save()
        res.status(201).json(newIngredient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.patch('/:id', getIngredient, async (req, res) => {
    if (req.body.name != null) {
        res.ingredient.name = req.body.name
    }
    if (req.body.description != null) {
        res.ingredient.description = req.body.description
    }
    try {
        const updatedIngredient = await res.ingredient.save()
        res.json(updatedIngredient)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/:id', getIngredient, async (req, res) => {
    try {
        await res.ingredient.remove()
        res.json({ message: 'Ingredient deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

async function getIngredient(req, res, next) {
    let ingredient
    try {
        ingredient = await Ingredient.findById(req.params.id)
        if (ingredient == null) {
            return res.status(404).json({ message: 'Ingredient not found' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.ingredient = ingredient
    next()
}

module.exports = router