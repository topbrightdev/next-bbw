import admin from "firebase-admin";

class FirebaseAdmin {
  constructor() {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
          projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
          privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, "\n"),
        }),
        databaseURL: process.env.FIREBASE_DATABASE_URL,
      });
    }
    this.admin = admin;
    this.auth = admin.auth();
    this.db = admin.firestore();
  }
}

export default new FirebaseAdmin();
