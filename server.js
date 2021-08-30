import express from "express"
import React from "react"
import fs from 'fs'
import { renderToNodeStream } from "react-dom/server"
import App from "./components/App"

const app = express()
const PORT = process.env.PORT || 3000


app.use(express.static(__dirname))
const pageProcessor = () => {
   return JSON.parse(fs.readFileSync(__dirname + '/manifest.json', "utf-8"))
}
app.get('/get', (req, res) => res.send("Message from server"))
app.get('/', (req, res) => {
   const assets = pageProcessor()
   res.set('content-type', 'text/html')
   res.write(`<!DOCTYPE html><html><head><link rel="stylesheet" href="${assets['main.css']}"/></head><body><div id="app">`)
   const stream = renderToNodeStream(<App />)
   stream.pipe(res, { end: false })
   stream.on('end', () => {
      res.end(`</div><script src="${assets['vendors.js']}"></script><script src="${assets['main.js']}"></script></body></html>`);
   })

})
app.listen(PORT, (req, res) => console.log(`Server started at ${PORT}`))