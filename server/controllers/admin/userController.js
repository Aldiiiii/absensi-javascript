const {User} = require('../../models')

class UserController {
    static async register(req, res, next){
        try {
            const { username, email, password, roleId } = req.body
            const newUser = await User.create({
                username, email, password, roleId
            })

            if(newUser){
                res.status(200).json(`user berhasil ditambahkan`)
            }else{
                throw {name: "SequelizeValidationError"}
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async users(req, res, next){
        try {
            const users = await User.findAll({attributes: ['username', 'roleId']})
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async editUser(req, res, next){
        try {
            const { id } = req.params
            const findUser = await User.findByPk(id)
            const {username, email, roleId} = req.body
            if(!findUser){
                throw {name: 'Error Not Found'}
            }
            await User.update({
                username, password: findUser.password, email, roleId
            }, {where : {id}})
            res.status(200).json({message: `User berhasil diupdate`})
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async changePassword(req, res, next){
        try {
            const { id } = req.params
            const {password} = req.body
            const findUser = await User.findByPk(id)
            if(!findUser){
                throw {name: 'Error Not Found'}
            }
            const isChanged = await User.update({password}, {where:{id}})
            if(isChange[0] !== 0){
                res.status(200).json({message: "Password berhasil diubah"})
            }else{
                throw {name: "Update fail"}
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    
    static async deleteUser(req, res, next){
        try {
            const { id } = req.params
            const findUser = await User.findByPk(id)
            if(!findUser){
                throw {name: 'Error Not Found'}
            }
            const isDeleted = await User.destroy({where: {id: findUser.id}})
            if(isDeleted){
                res.status(200).json({message: 'User berhasil di hapus'})
            }else{
                throw {name: "Delete fail"}
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}

module.exports = UserController