class LabAnalist extends User {
    constructor(id, name, lastname, email, password, dni, gender, type, code) {
        super(id, name, lastname, email, password, dni, gender, type);
        this.code = code;
    }
    makeExam(){
        // TODO
    }
    getExam(){
        // TODO
    }
}