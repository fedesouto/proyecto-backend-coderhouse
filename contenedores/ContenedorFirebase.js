const admin = require("firebase-admin");
const {firebaseServiceAccount} = require('../config')

admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
});

class ContenedorFirebase {
  constructor(collection) {
    this.db = admin.firestore();
    this.query = this.db.collection(collection);
  }

  async getAll() {
    try {
      const snapshot = await this.query.get();
      const docs = snapshot.docs;
      const data = docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const ref = this.query.doc(id);
      const doc = await ref.get();
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      throw error;
    }
  }
  async addItem(data) {
    try {
      await this.query.doc(data.id).create(JSON.parse(JSON.stringify(data)));
      return data.id
    } catch (error) {
      throw error;
    }
  }
  async updateItem(id, data) {
    try {
      const doc = this.query.doc(id);
      return await doc.update(data);
    } catch (error) {
      throw error;
    }
  }
  async deleteItem(id) {
    try {
      const doc = this.query.doc(id);
      return await doc.delete();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContenedorFirebase;
