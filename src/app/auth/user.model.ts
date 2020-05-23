export class User {
    constructor(public email:string,public userLocalId:string,private _token:string, private _tokenExpiryDate:Date){}

    get token() {
        if(!this._token||new Date() > this._tokenExpiryDate){
            return null;
        }
        return this._token;
    }
}