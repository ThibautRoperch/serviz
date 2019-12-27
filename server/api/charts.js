const express = require('express')
const mongodb = require('mongodb')

const router = express.Router()

// Get charts
router.get('/', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    let filter = {}
    if (req.query.clientIP) filter.clientIP = req.query.clientIP
    let limit = parseInt(req.query.limit) || 10
    res.send(await charts.find(filter).sort({ $natural: -1 }).limit(limit).toArray())
  } catch (e) {
    res.status(500).send("Error loading the collection : ", e)
  }
})

router.get('/:chartId', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    let chartId = req.params.chartId
    res.send(await charts.find({ _id: new mongodb.ObjectID(chartId) }).toArray())
  } catch (e) {
    res.status(500).send("Error loading the collection : ", e)
  }
})

// Add chart
router.post('/', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    let newChart = {
      ...req.body,
      createdAt: new Date(),
      clientIP: req.ip.match(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/)
    }
    await charts.insertOne(newChart)
    res.status(201).send(`localhost:${global.config.outputs.gui.port}/${newChart._id}`)
  } catch (e) {
    res.status(500).send("Error loading the collection : ", e)
  }
})

// Delete chart
router.delete('/:id', async (req, res) => {
  const charts = await loadchartsCollection()
  try {
    await charts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) })
    res.status(200).send()
  } catch (e) {
    res.status(500).send("Error loading the collection : ", e)
  }
})

async function loadchartsCollection() {
  let client
  let mongodb_url = `mongodb://${global.config.inputs.mongo_db.address}:${global.config.inputs.mongo_db.port}/`

  try {
    client = await mongodb.MongoClient.connect(mongodb_url, {
      useNewUrlParser: true
    })
  } catch (e) {
    console.log('MongoClient connection error : ', mongodb_url, e.name)
    return null
  }

  return client.db('serviz').collection('charts')
}

module.exports = router
