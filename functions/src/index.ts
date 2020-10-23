import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
// import * as admin from "firebase-admin";

const app = express();

app.use(cors({ origin: true }));

app.get("/hello-world", (req, res) => {
    return res.status(200).send("hello world");
});

exports.app = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
