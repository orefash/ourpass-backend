import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    get() {
        return {id: 1, name: "Ore Faseru", date:"19/07/2022"}
    }

    createUser(body: any){
        return body;
    }

    deleteUser(param: {userId: number}){
        return {message: `User deleted successfully`, param}
    }
}
