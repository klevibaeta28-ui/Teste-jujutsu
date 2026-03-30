const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(__dirname));
app.get("/",(req,res) =>{
    res.sendFile(path.join(__dirname, "home.html"))
});
app.get("/Gojo", (req, res) => {
    res.sendFile(path.join(__dirname, "sitht.html"))
});
app.get("/sukuna", (req, res) => {
    res.sendFile(path.join(__dirname, "sukuna.html"))
});
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});