var db = require('../config/database');
const User = db.users;

module.exports = {

    //get all user
    getUser: async (req, res) => {
        try {
            const users = await User.findAll({
                where: {
                    authId: req.admin.id
                }
              });
            return res.json({
                success: 1,
                data: users
            });
        

        } catch (error) {
            console.error(error.message);
            return res.json({
                success: 0,
                message: "Internal Server Error"
            });
        }
    },

    //add user
    createUser: async (req, res) => {
        try {
            const { name, address, number } = req.body;
            const user = await User.create({
                name, address, number, authId: req.admin.id
            });

            return res.json({
                success: 1,
                data: user
            });

        } catch (error) {
            console.log(error.message);
            return res.json({
                success: 0,
                message: "Please required min 2 or max 10 number"
            });
        }
    },

    //user details
    viewUser: async (req, res) => {
        const id  = req.params.id
        const results = await User.findByPk(id, {authId: req.admin.id});
        try {
            if (results == null) {
                console.log('Not found!');
                return res.json({
                    success: 0,
                    message: "Results not found"
                });
            } else {
                console.log(results);
                return res.json({
                    success: 1,
                    data: results
                });
            }
        } catch (error) {
            console.error(error.message);
            return res.json({
                success: 0,
                message: "Internal Server Error"
            });
        }

    },

    //delete user
    deleteUser: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await User.findOne({
                where: {
                    id: id
                },
                authId: req.admin.id
            });
            if (data == null) {
                return res.json({
                    message: "data is not found"
                });
            }
            const results = await User.destroy({authId: req.admin.id,
                where: {
                    id: id
                }
            });
            return res.json({
                data: results,
                message: "Deleted successfully"
            });
        } catch (error) {
            console.error(error.message);
            return res.json({
                success: 0,
                message: "Internal Server Error"
            });
        }
    },

    //user update
    updateUser: async (req, res) => {
        const  id  = req.params.id;
        const name = req.body.name;
        const address = req.body.address;
        const number = req.body.number;

        try {
            
            const data = await User.findByPk(id, {authId: req.admin.id});
            if (data == null) {
                console.log('Not found!');
                return res.json({
                    message: "data is not found"
                });
            }
                        
            const results = await User.update({
                name: name, address: address, number: number, authId: req.admin.id
            }, {
                where: {
                    id: req.params.id
                }
            });
                return res.json({
                    data: results,
                    message: "updated successfully"
                });
            

        } catch (error) {
            console.error(error.message);
            return res.json({
                success: 0,
                error: "Please min 2 or max 15 number be added"
            });
        }
    }
}