class  User{
    constructor(id, name, lastname, email, password, dni, gender, phone){
        this.id = id;
        this.lastname = lastname;
        this.name = name;
        this.email = email;
        this.password = password;
        this.dni = dni;
        this.phone=phone;
        this.gender = gender;
        throw new Error("Esta clase es abstracta");
    }
    getID(){
        return this.id;
    }
    getName(){
        return this.name;
    }
    getLastname(){
        return this.lastname;
    }
    getEmail(){
        return this.email;
    }
    getPassword(){
        return this.password;
    }
    getDNI(){
        return this.dni;
    }
    getPhone(){
        return this.phone;
    }
    getGender(){
        return this.gender;
    }
    logIn() {
        // TODO
    }
    logOut() {
        // TODO
    }
    authenticate() {
        // TODO
    }
    register() {
        // TODO
    }
}