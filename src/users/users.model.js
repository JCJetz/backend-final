import { MongoClient } from 'mongodb';


const URI = 'mongodb+srv://JCJetz:hB4bStJknmz6LrL@cluster0.tsuyqql.mongodb.net/?retryWrites=true&w=majority';  //esta URL ponerla en index.js o  era app?
const client = new MongoClient(URI);
const DATABASE_NAME = 'auth';
const COLLECTION_NAME = 'users';

export const createUser = async (user) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.insertOne(user);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// devuelve el usuario sin tener en cuenta el status o null si no existe
export const getUserByEmailNoStatus = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        return await users.findOne({ email });
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// actualiza el usuario cambiando su estaso a success
export const validateUser = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        // create a document that sets the plot of the movie
        const updateDoc = {
            $set: {
                status: 'SUCCESS'
            },
        };
        return await users.updateOne({ email }, updateDoc);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

// devuelve el usuario de BBDDD que esté en estado succes y además coincida
// con el email y con password que me mandan. 
export const retrieveSuccessUserByEmailAndPassword = async (email, password) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = {
            email,
            password,
            status: 'SUCCESS'
        }
        return await users.findOne(query);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}


export const retrieveUserInfoByEmail = async (email) => {
    try {
        await client.connect();
        const db = client.db(DATABASE_NAME);
        const users = db.collection(COLLECTION_NAME);
        const query = { email };
        const options = { projection: { _id: 0, password: 0, status: 0 } }
        return await users.findOne(query, options);
    } catch (err) {
        console.error(err);
    } finally {
        client.close();
    }
}

