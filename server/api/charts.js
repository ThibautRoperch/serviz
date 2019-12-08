const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get charts
router.get('/', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    let limit = parseInt(req.query.limit) || 10
    res.send(await charts.find({}).sort({ $natural: -1 }).limit(limit).toArray())
  } catch (e) {
    res.send("Unable to load the collection")
  }
})

// Add chart
router.post('/', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    await charts.insertOne({
      ...req.body,
      createdAt: new Date()
    })
    res.status(201).send()
  } catch (e) {
    res.send("Unable to load the collection")
  }
})

// Delete chart
router.delete('/:id', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    await charts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
  } catch (e) {
    res.send("Unable to load the collection")
  }
})

async function loadchartsCollection() {
  let client

  try {
    client = await mongodb.MongoClient.connect('mongodb://localhost:32774/', {
      useNewUrlParser: true
    })
  } catch (e) {
    console.log('MongoClient connection error : ' + e.name)
    return null
  }

  return client.db('serviz').collection('charts')
}

module.exports = router
