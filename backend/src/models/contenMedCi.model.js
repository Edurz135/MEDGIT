module.exports = (sequelize, Sequelize) => {
    const  ContenMedCi = sequelize.define(" ContenMedCi", {
        id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
    });
    return  ContenMedCi;
};