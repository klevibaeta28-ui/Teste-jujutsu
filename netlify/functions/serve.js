const express = require("express");
const app = express();
const serverless = require('serverless-http'); // 1. Importa o pacote
const path = require("path");
app.use(express.static(__dirname));
app.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname, "static/home.html"))
});
app.get("/Gojo", (req, res) => {
    res.sendFile(path.join(__dirname, "static/sitht.html"))
});
app.get("/sukuna", (req, res) => {
    res.sendFile(path.join(__dirname, "static/sukuna.html"))
});
module.exports.handler = serverless(app);