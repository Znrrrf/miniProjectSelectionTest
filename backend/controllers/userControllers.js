const db = require("../models");
const user_logins = db.user_logins;

module.exports = {
    getAllUsers: async (req, res) => {
        try {

            const data = await user_logins.findAll()

            res.status(200).send({
                message: "data sended",
                data
            });

        } catch (err) {
            res.status(400).send(err);
        }
    },
    deleteUser: async (req, res) => {
        try {

            const userId = req.params.id
            const result = await user_logins.destroy({
                where: {
                    id: userId
                }
            })

            res.status(200).send({
                message: `user success deleted`,
            })

        } catch (err) {
            res.status(400).send(err)
        }
    }
}