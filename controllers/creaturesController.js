const router = require('express').Router()
const db = require('../models')

// INDEX route
router.get('/', async (req, res) => {
    try {
        const creatures = await db.creature.findAll({ raw: true })
        // console.log(creatures)
        // res.send()
        res.render('creatures/index', { creatures: creatures })
    } catch (err) {
        console.log(err)
    }
})

// New creature form route
router.get('/new', (req, res) => {
    res.render("creatures/new")
})

// SHOW creatures
router.get('/:id', async (req, res) => {
    try {
        console.log(req.params.id, "🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉🐱‍🐉")
        const creature = await db.creature.findByPk(req.params.id, { raw: true })
        console.log(creature);
        res.render('creatures/show', { creature })
    } catch (err) {
        console.log(err)
    }
})

// Create route
router.post('/', async (req, res) => {
    try {
        // console.log(req.body);
        const newCreature = await db.creature.create({
            type: req.body.type,
            img_url: req.body.img_url
        })
        res.redirect(`/creatures/${newCreature.id}`);
    } catch (err) {
        console.log(err)
    }
})


// UPDATE route
router.put('/:id', async (req, res) => {
    try {
        const creature = await db.creature.findByPk(req.params.id)
        const updatedCreature = await creature.update({
            type: req.body.type,
            img_url: req.body.img_url,
        })
        res.redirect(`/creatures/${req.params.id}`)
    } catch (err) {
        console.log(err)
    }
})

// DELETE route
router.delete('/:id', async (req, res) => {
    try {
        const creature = await db.creature.findByPk(req.params.id)
        const deletedCreature = await creature.destroy();
        res.redirect('/creatures');
    } catch (err) {
        console.log(err)
    }
})

module.exports = router