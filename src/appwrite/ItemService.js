import React from 'react'
import{Client, ID,Databases,Storage,Query} from 'appwrite'
import conf from "../conf/Conf";

export class ItemService {
  client = new Client();
  database;
  bucket;
  constructor(){
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.database = new Databases(this.client)
    this.bucket = new Storage(this.client); 
  }
  async createItem({ title, description, featuredImage, category, quantity = 1 }) {
  try {
    const user = await this.account.get();
    const userId = user.$id;
    const userName = user.name || user.email.split("@")[0]; 
    const userPic = user.prefs?.profilePic || null; 
    const createdAt = new Date().toISOString();
    const isActive = true;
    const status = "active";  

    return await this.database.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteItemsCollectionId,
      ID.unique(),
      {
        title,
        description,
        featuredImage,
        category,
        quantity,
        userId,
        userName,
        userPic,
        createdAt,
        isActive,
        status
      }
    );
  } catch (error) {
    console.error("createItem error:", error);
    throw new Error("Failed to create item. Please try again later.");
  }
}


  // update and delete item methods
  async updateItem(itemId,{title,description,featuredImage}){
    try {
      return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteItemsCollectionId,
        itemId,
        { title, 
          description,
          featuredImage }
      ) 
    } catch (error) {
      console.error("updateItem error:", error);
      throw new Error("Failed to update item. Please try again later."); 
      }  
  }
  async deleteItem(itemId){
    try {
      return await this.database.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteItemsCollectionId,
      itemId
    )
    } catch (error) {
      console.error("deleteItem error:", error);
      throw new Error("Failed to delete item. Please try again later.");
    }
  }
  async listAvailableItems(queries = []) {
  try {
    const finalQueries = [
      Query.equal('status', 'active'),
      ...queries, 
    ];

    const response = await this.database.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteItemsCollectionId,
      finalQueries
    );

    return response.documents;
  } catch (error) {
    console.error("listAvailableItems error:", error);
    throw new Error("Failed to fetch items. Please try again later.");
  }
}

  async getItemById(itemId){
    try {
      return await this.database.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteItemsCollectionId,
      itemId
      )
    } catch (error) {
        console.error("getItemById error:", error);
        throw new Error("Failed to get items. Please try again later.");

    }
  }
  async uploadImage(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("uploadImage error:", error);
      throw new Error("Failed to upload image. Please try again later.");
    }
  }
  async getImageUrl(fileId) {
    try {
      return this.bucket.getFilePreview(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("getImageUrl error:", error);
      throw new Error("Failed to fetch image URL. Please try again later.");
    }
  }
  async deleteImage(fileId) {
    try {
      return await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("deleteImage error:", error);
      throw new Error("Failed to delete image. Please try again later.");
    }
  }

}
const itemService = new ItemService();
export default itemService