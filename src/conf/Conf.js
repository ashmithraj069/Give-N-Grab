const Conf ={
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteItemsCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ITEMS_ID),
    appwriteUsersMetaCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_USERS_META_ID),
    appwriteRequestsCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_REQUESTS_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}





export default Conf
