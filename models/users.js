
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING
        },
        number: {
            type: DataTypes.BIGINT,
            validate:{
                len: [2,15]

        }
    }

    },
        {
            freezeTableName: true,
            timestamps: false

        });

    return User
    User.sync().then((data) => {
        console.log("Model Created")
    })
        .catch((err) => {
            console.log("Error" + err)
        })

}