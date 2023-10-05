module.exports = (sequelize, Sequelize) => {
    const Allergy = sequelize.define("Allergy ", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      sick: {
        type: Sequelize.STRING,
      },
  
    });
    return Allergy;
  };
