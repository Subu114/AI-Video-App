import { Platform } from "react-native";
import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform : 'com.jsm.aora',
    projectid : '677a5de90028e7489598',
    databaseId : '677a5fcb002b28e8f385',
    userCollectionId : '677a5ff00028990f213f',
    videoCollectionId : '677a6010001ec4fccb1f',
    storageId : '677a614000021612a040'
}

const {
    endpoint,
    platform,
    projectid,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig;


// Init your React Native SDK
const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
.setProject(appwriteConfig.projectid) // Your project ID
.setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const avatar = new Avatars(client);
const account = new Account(client);
const database = new Databases(client);

export const createUser = async(email, password, username) => 
{
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if(!newAccount) {
            throw new Error("Account not created")
        }

        const avatarUrl = avatar.getInitials(username);
        await signIn(email, password);

        const newUser = await database.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(),{
            accountId : newAccount.$id,
            email,
            username,
            avatar : avatarUrl
        })
        return newUser;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
    }

}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
        
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) {
            throw new Error("User not found")
        }
        const currentUser = await database.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)]);
    
        if(!currentUser) {
            throw new Error("User not found")
        }
        return currentUser.documents[0];
    } catch (error) {
        console.log("Error : ", error)
        // throw new Error(error);
    }
}

export const getAllPosts = async () => { 
    try {
        const posts = await database.listDocuments(databaseId, videoCollectionId);
        return posts.documents;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
    }
}

export const getLatestPosts = async () => { 
    try {
        const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.orderDesc('$createdAt'), Query.limit(7)]);
        return posts.documents;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
    }
}

export const searchPosts = async (query) => { 
    try {
        const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.search('title', query)]);
        return posts.documents;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => { 
    try {
        const posts = await database.listDocuments(databaseId, videoCollectionId, [Query.equal('creator', userId)]);
        return posts.documents;
    } catch (error) {
        console.log("Error : ", error)
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')
    } catch (error) {
        throw new Error(error)
    }
}