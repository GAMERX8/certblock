const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json"); 

// Inicializa Firebase
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<1076411796167>.firebaseio.com", // Reemplaza <your-project-id>
});

const db = admin.firestore();

module.exports = db;
