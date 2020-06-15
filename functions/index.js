const functions = require("firebase-functions");
const admin = require("firebase-admin");

const LINKS_PER_PAGE = 5;

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://hooks-news-firebase.firebaseio.com",
});
const db = admin.firestore();

// // https://firebase.google.com/docs/functions/linksPagination
exports.linksPagination = functions.https.onRequest((request, response) => {
  response.set("Access-Control-Allow-Origin", "*");
  let linksRef = db.collection("links");
  const offset = Number(request.query.offset);
  linksRef
    .orderBy("created", "desc")
    .limit(LINKS_PER_PAGE)
    .offset(offset)
    .get()
    .then((snapshot) => {
      const links = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      response.json(links);
    });
});
