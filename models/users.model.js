const validate = require('express-validator')
module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define(
        "users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        Name: {
            type: Sequelize.STRING(150),
            allowNull: false,
            validate: {
                notEmpty: true,
                max: 12,
                min: 3,
            }
        },
        Mobile: {
            type: Sequelize.STRING(12),
            allowNull: false,

        },
        Email: {
            type: Sequelize.STRING(250),
            allowNull: false

        },
        Password: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {

                notEmpty: true,


            }

        }
    }

        , {
            freezeTableName: true,

        }
    );

    return model;
};