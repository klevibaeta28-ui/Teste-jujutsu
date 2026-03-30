const express = require("express");
const app = express();
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});