const express = require("express");
const router = express.Router();
const db = require("../firebase/firebaseConfig");

router.post("/issue", async (req, res) => {
    try {
        const { studentName, title, date, issuer } = req.body;
        const docRef = await db.collection("certificates").add({
            studentName,
            title,
            date,
            issuer,
            createdAt: new Date(),
        });
        res.status(200).send({ message: "Certificate registered", id: docRef.id });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;