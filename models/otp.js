
module.exports = (sequelize, DataTypes) => {
    const Otp = sequelize.define("otp", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
		otp: {
			type: DataTypes.STRING,
            allowNull: false
		},
        createdAt: {
			type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: new Date()
		}

    },
        {
            freezeTableName: true,
            timestamps: true

        });
    return Otp

    Auth.sync().then((data) => {
        console.log("Model Created")
    })
        .catch((err) => {
            console.log("Error" + err)
        })


}