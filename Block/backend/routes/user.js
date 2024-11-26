const express = require("express");
const router = express.Router();
const db = require("../firebase/firebaseConfig");

router.get("/verify/:id", async (req, res) => {
    try {
        const doc = await db.collection("certificates").doc(req.params.id).get();
        if (!doc.exists) {
            return res.status(404).send({ message: "Certificate not found" });
        }
        res.status(200).send(doc.data());
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
