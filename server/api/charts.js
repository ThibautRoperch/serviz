const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get charts
router.get('/', async (req, res) => {
  const charts = await loadchartsCollection()
  res.send(await charts.find({}).sort({ $natural: -1 }).toArray())
})

// Add chart
router.post('/', async (req, res) => {
  const charts = await loadchartsCollection()
  await charts.insertOne({
    ...req.body,
    createdAt: new Date()
  })
  res.status(201).send()
})

// Delete chart
router.delete('/:id', async (req, res) => {
  const charts = await loadchartsCollection()
  await charts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
  res.status(200).send()
})

async function loadchartsCollection() {
  const client = await mongodb.MongoClient.connect('mongodb://localhost:32769/db/serviz', {
    useNewUrlParser: true
  })

  return client.db('serviz').collection('charts')
}

module.exports = router
