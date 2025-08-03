import config from "../conf/Conf";
import { Client, Account, ID, OAuthProvider } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.appwriteUrl).setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        return this.login({ email, password });
      }
      return userAccount;
    } catch (error) {
      if (error.code === 409) {
        // Conflict: Email already exists
        throw new Error("This email is already registered. Try logging in.");
      } else if (error.code === 400) {
        // Bad Request: Missing fields, weak password, etc.
        throw new Error("Please check your inputs. Password may be too weak.");
      } else {
        throw new Error("Failed to create account. Please try again later.");
      }
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      if (error.code === 401) {
        // Unauthorized
        throw new Error("Invalid email or password.");
      } else if (error.code === 429) {
        // Too many requests
        throw new Error("Too many login attempts. Please wait and try again.");
      } else {
        throw new Error("Login failed. Please try again later.");
      }
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      if (error.code === 401) {
        throw new Error("User not logged in.");
      } else {
        throw new Error("Unable to fetch user details. Try refreshing the page.");
      }
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession("current");
    } catch (error) {
      console.log("Appwrite AuthService::logout::error", error);
      throw new Error("Failed to log out. Please try again.");
    }
  }
  async GoogleLogin(){
    try {
        return await this.account.createOAuth2Session(OAuthProvider.Google,
             'http://localhost:5173',
              'http://localhost:5173/fail');
    } catch (error) {
        console.log("Appwrite AuthService::GoogleLogin::error", error);
        throw new Error("Google login failed. Please try again later.");
    }
}
async GithubLogin(){
    try {
        return await this.account.createOAuth2Session(
            OAuthProvider.Github,
             'http://localhost:5173',
              'http://localhost:5173/fail');
    } catch (error) {
        console.log("Appwrite AuthService::GithubLogin::error", error);
        throw new Error("Github login failed. Please try again later.");       
    }
}
}


const authService = new AuthService();
export default authService;
