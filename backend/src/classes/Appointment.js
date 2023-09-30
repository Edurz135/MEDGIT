class Appointment{
    constructor(id, date, time, type, diagnostic,medAuthor, patientOwner){
        this.id = id;
        this.date = date;
        this.time = time;
        this.type = type;
        this.diagnostic = diagnostic;
        this.medAuthor = medAuthor;
        this.patientOwner = patientOwner;
    }
    getID(){
        return this.id;
    }
    getDate(){
        return this.date;
    }
    getTime(){
        return this.time;
    }
    getType(){
        return this.type;
    }
    getDiagnostic(){
        return this.diagnostic;
    }
    getMedAuthor(){
        return this.medAuthor;
    }
    getPatientOwner(){
        return this.patientOwner;
    }
}