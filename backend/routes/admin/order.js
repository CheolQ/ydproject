const express = require('express');
const router = express.Router()
const query = require("../mysql")

router.get("/", (req, res) => {
    query("AdminOrderList")
    .then(result => res.send(result));
})

module.exports = router;