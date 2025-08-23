import Conf from "../conf/Conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class RequestService {
  client = new Client();
  database;
  bucket;
  constructor(){
    this.client.setEndpoint(Conf.appwriteUrl).setProject(Conf.appwriteProjectId);
    this.database = new Databases(this.client)
    this.bucket = new Storage(this.client);
  }
  async createRequest({ itemId, itemTitle, featuredImage, sharerId }) {
  try {
    const user = await this.account.get();
    const grabberId = user.$id;
    const createdAt = new Date().toISOString();
    const status = "pending";
    
    return await this.database.createDocument(
      Conf.appwriteDatabaseId,
      Conf.appwriteRequestsCollectionId,
      ID.unique(),
      {
        itemId,
        itemTitle,
        featuredImage,
        sharerId,
        grabberId,
        createdAt,
        status
      }
    );
  } catch (error) {
    console.error("createRequest error:", error);
    throw new Error("Failed to send request. Please try again later.");
  }
}
async listRequest(queries=[]){
    try {
        const finalQueries = [
            Query.equal("status", "pending"),
            ...queries    
        ];
        return await this.database.listDocuments(
            Conf.appwriteDatabaseId,
            Conf.appwriteRequestsCollectionId,
            finalQueries
        );
    } catch (error) {
      console.error("listRequest error:", error);
      throw new Error("Failed to fetch requests. Please try again later.");
        
    }

}
async getRequest(itemId){
    try {
        const response = await this.database.getDocument(
            Conf.appwriteDatabaseId,
            Conf.appwriteRequestsCollectionId,
            itemId
        );
        return response;
    } catch (error) {
        console.error("getRequest error:", error);
        throw new Error("Failed to fetch request. Please try again later.");
    }
}

}
