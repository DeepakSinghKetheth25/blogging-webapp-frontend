export class User{
    constructor(
        public username:string,
        private token:string,
        private tokenExpiry:string,
        private tokenExpirationDate : Date
        ){}

    getToken(){
        return this.token;
        }
}