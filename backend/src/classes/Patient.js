import { getPastAppointmentsServices } from "../service/user.service";

 class Patient extends User{
    constructor(id, name, lastname, email, password, dni, gender) {
        super(id, name, lastname, email, password, dni, gender);
    }
    
    getPastAppointmentsServices(id) {
        return getPastAppointmentsServices(id).then((response) => {
            console.log(response);
        });
    }

    
 }   