module.exports = (sequelize, Sequelize) => {
    const  ContenMedAle = sequelize.define(" ContenMedAle", {
        id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    });
    return ContenMedAle;
};