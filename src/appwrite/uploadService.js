import { storage, ID } from "./appwrite";
import config from "../conf/Conf";
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
    this.bucket = new Storage(this.client);
  }

  async uploadImage(file){
    try {
      const response = await this.bucket.createFile(
        config.appwriteBucketId,
        ID.unique(),
        file
      );
      return response;
    } catch (error) {
      console.error("uploadImage error:", error);
      throw new Error("Failed to upload image. Please try again later.");
    }
  }

  async getImageUrl(fileId) {
    try {
      return this.bucket.getFilePreview(
        config.appwriteBucketId,
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
        config.appwriteBucketId,
        fileId
      );
    } catch (error) {
      console.error("deleteImage error:", error);
      throw new Error("Failed to delete image. Please try again later.");
    }
  }

}