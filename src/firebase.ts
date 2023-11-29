import firebase from "firebase-admin";

class FirebaseRealtimeDatabaseNode<T> {
  protected database: firebase.database.Database;
  protected path: string;

  constructor() {
    // Initialize Firebase
    const firebaseConfig = {
      // Your Firebase configuration
    };
    firebase.initializeApp(firebaseConfig);

    // Get a reference to the database service
    this.database = firebase.database();
    this.path = this.getPath();
  }

  protected getPath(): string {
    const typeName = typeof T === "string" ? T : T.name;
    return typeName.toLowerCase() + "s";
  }

  public async find(key: string): Promise<T | null> {
    try {
      const snapshot = await this.database
        .ref(`${this.path}/${key}`)
        .once("value");
      return snapshot.val() as T;
    } catch (error) {
      console.error("Error finding data in Firebase:", error);
      return null;
    }
  }

  public async findMany(): Promise<T[]> {
    try {
      const snapshot = await this.database.ref(this.path).once("value");
      const data = snapshot.val();
      return Object.values(data) as T[];
    } catch (error) {
      console.error("Error finding data in Firebase:", error);
      return [];
    }
  }

  public async update(key: string, data: Partial<T>): Promise<void> {
    try {
      await this.database.ref(`${this.path}/${key}`).update(data);
    } catch (error) {
      console.error("Error updating data in Firebase:", error);
    }
  }

  public async create(data: T): Promise<string | null> {
    try {
      const newRef = this.database.ref(this.path).push();
      await newRef.set(data);
      return newRef.key;
    } catch (error) {
      console.error("Error creating data in Firebase:", error);
      return null;
    }
  }

  // Add more methods as needed
}

export default FirebaseRealtimeDatabaseNode;
