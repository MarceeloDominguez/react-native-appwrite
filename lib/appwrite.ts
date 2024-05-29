import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import {
  ENDPOINT,
  PLATFORM,
  PROJECT_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
  VIDEO_COLLECTION_ID,
  STORAGE_ID,
} from "@env";

export const config = {
  endpoint: ENDPOINT,
  platform: PLATFORM,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
  userCollectionId: USER_COLLECTION_ID,
  videoCollectionId: VIDEO_COLLECTION_ID,
  storageId: STORAGE_ID,
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export async function signIn(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function signOut() {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );

    return posts.documents.map((doc) => ({
      title: doc.title,
      video: doc.video,
      thumbnail: doc.thumbnail,
      prompt: doc.prompt,
      $id: doc.$id,
      creator: doc.creator,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.orderDesc("$createdAt"), Query.limit(7)]
    );

    return posts.documents.map((doc) => ({
      title: doc.title,
      video: doc.video,
      thumbnail: doc.thumbnail,
      prompt: doc.prompt,
      $id: doc.$id,
      creator: doc.creator,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );

    if (!posts) throw new Error("Something went wrong");

    return posts.documents.map((doc) => ({
      title: doc.title,
      video: doc.video,
      thumbnail: doc.thumbnail,
      prompt: doc.prompt,
      $id: doc.$id,
      creator: doc.creator,
    }));
  } catch (error) {
    throw new Error(error);
  }
};
