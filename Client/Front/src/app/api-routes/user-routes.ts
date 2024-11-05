export class SingUp{
    public static readonly login='http://localhost:3000/auth/login';
    public static readonly register='http://localhost:3000/User/addUser';
}

export class UserApi{
    
    public static readonly route='http://localhost:3000/User/';
    public static readonly getUserByUsername=this.route+'getUserByUsername/';
    public static readonly getDataForChange=this.route+'getDataForChange/';
    public static readonly changeName=this.route+'changeName/';
    public static readonly changePhone=this.route+'changePhoneNumber/';
    public static readonly changeCity=this.route+'changeCity/';
    public static readonly changeEmail=this.route+'changeEmail/';
    public static readonly updatePhoto=this.route+'updatePhoto/';
}
export class TravelApi{
    public static readonly route='http://localhost:3000/Travel/';
    public static readonly createTravel=this.route+'createTravel/';
}