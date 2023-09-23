module.exports = (sequelize, Sequelize) => {
    const Medico = sequelize.define("medico", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombre: {
            type: Sequelize.STRING,
        },
        apellido: {
            type: Sequelize.STRING,
        },
        correo: {
            type: Sequelize.STRING,
        },
        contrasena: {
            type: Sequelize.STRING,
        },
        dni: {
            type: Sequelize.INTEGER,
        },
        genero: {
            type: Sequelize.STRING,
        },
        celular: {
            type: Sequelize.INTEGER,
        },
    });

    return Medico;
};
