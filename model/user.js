const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcryptjs");

class User extends Model {}

User.init(
    {
        // id column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //first name column
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // last name column
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [8],
            },
        },
        // username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        // password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8],
            },
        },
    },
    //hooks === password hashing
    {
        hooks: {
            beforeCreate: async (newUser) => {
                newUser.password = await bcrypt.hash(
                    newUser.password,
                    await bcrypt.genSalt(10)
                );
                return newUser;
            },
            beforeUpdate: async (updatedUser) => {
                updatedUser.password = await bcrypt.hash(
                    updatedUser.password, await bcrypt.genSalt(10)
                );
                return updatedUser;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    },
);

module.exports = User;

