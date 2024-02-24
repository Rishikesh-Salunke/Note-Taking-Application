const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define(
        "notes", {
            Nid: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            id:{
                type: DataTypes.INTEGER,

            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1, 30], 
                }
            },
            content: {
                type: DataTypes.STRING(),
                allowNull: false,
            },
          
            lastModification: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false,
            
            },
            UserId:{ type: DataTypes.STRING(250),},
        },
      
        {
            freezeTableName: true,
            timestamps: true,
            
        }
    );

    return model;
};
