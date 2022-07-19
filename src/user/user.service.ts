import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    get() {
        return {id: 1, name: "Ore Faseru", date:"19/07/2022"}
    }

    createUser(body: any){
        return {message: "User Created", body};
    }

    deleteUser(param: {userId: number}){
        return {message: `User deleted successfully`, param}
    }

    editUser(param: {userId: number}, body: any){
        return {message: `User Edit successfully`, param, body}
    }

    loginUser(body: any){
        return {message: "User login", body}
    }

    logoutUser(body: any){
        return {message: "User logout", body}
    }

    forgotPassword(body: any){
        return {message: "Forgot Password", body}
    }

    resetPassword(body: any){
        return {message: "Reset Password", body}
    }

    getUserPosts(param: {userId: number}){
        return {message: "User Posts", param}
    }
}
