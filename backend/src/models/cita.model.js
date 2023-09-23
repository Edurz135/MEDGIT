module.exports = (sequelize, Sequelize) => {
    const Cita = sequelize.define("cita", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE,
        },
        hora: {
            type: Sequelize.TIME,
        },
        tipo: {
            type: Sequelize.STRING,
        },
        diagnostico: {
            type: Sequelize.STRING,
        }
    });

    return Cita;
};
