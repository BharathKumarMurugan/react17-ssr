import express from "express";
import React from "react";
import { renderToNodeStream } from "react-dom/server";
import fs from "fs";
import App from "../client/components/App";
import path from "path";

const app = express();
const PORT = process.env.PORT || 7000;

app.use(express.static(__dirname));
const pageProcessor = () => {
  return JSON.parse(
    fs.readFileSync(__dirname + path.sep + "manifest.json", "utf-8")
  );
};

app.get("/", (req, res) => res.send("welcome page"));
app.get("/app", (req, res) => {
  const assets = pageProcessor();
  res.set("Content-Type", "text/html");
  res.write(
    `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>React application</title><link rel="stylesheet" href="${assets["main.css"]}"></head><body><div id="root">`
  );
  const appStream = renderToNodeStream(<App />);
  appStream.pipe(res, { end: false });
  appStream.on("end", () => {
    res.end(
      `</div><script defer src="${assets["vendors.js"]}"></script><script defer src="${assets["main.js"]}"></script></body></html>`
    );
  });
});

app.listen(PORT, () => `Server is at port ${PORT}`);
