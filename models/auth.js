
module.exports = (sequelize, DataTypes) => {
    const Auth = sequelize.define("auth", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }

    },
        {
            freezeTableName: true,
            timestamps: false

        });
    return Auth

    Auth.sync().then((data) => {
        console.log("Model Created")
    })
        .catch((err) => {
            console.log("Error" + err)
        })


}