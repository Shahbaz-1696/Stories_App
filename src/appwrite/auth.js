import conf from '../conf/conf'
import {Client, ID, Account} from 'appwrite'

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount =  await this.account.create(
                ID.unique(),
                name,
                email,
                password
            )
            if(userAccount){
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Appwrite error :: createAccount :: error", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Appwrite error :: login :: error", error);
            
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite error :: logout :: error", error);
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite error :: getCurrentUser :: error", error); 
        }

        return null;
    }
}

const authService = new AuthService();

export default authService;