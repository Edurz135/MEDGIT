module.exports = (sequelize, Sequelize) => {
    const  ContenPacAle = sequelize.define("ContenPacAle", {
        id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    });
    return  ContenPacAle;
};