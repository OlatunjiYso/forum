import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { User } from '../models/';

dotenv.config();
const jwtKey = process.env.JWT_SECRET_KEY;


/**
 * @description User controller
 */
class UserController {


    /**
     * @description a method to add anew user
     * @param {object} req  request object
     * @param {*} res response object
     */
    static async signup(req, res) {
        try {
            const { name, email, password } = req.body;
            const userDocument = (await User.findOne({ email }));
            if (userDocument) {
                return res.status(403)
                    .json({
                        msg: 'this email is taken already'
                    })
            }
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync(password, salt);
            const newUser = await User.create({ name, email, password: hashedPassword });
            const token = jwt.sign({ id: newUser._id }, jwtKey);
            return res.status(201)
            .json({ msg: 'you are signed up!', token })
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while adding user',
                errMessage: err.message
            })
        }
    }

     /**
     * @description a method to login a user
     * @param {object} req  request object
     * @param {*} res response object
     */
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            let userRecord = await User.findOne({email});
            if(!userRecord) {
                return res.status(401)
                .json({ msg: 'incorrect email or password'})
            }
            let validPassword = bcrypt.compareSync(password, userRecord.password);
            if(!validPassword) {
                return res.status(401)
                .json({ msg: 'incorrect email or password'})
            }
            const token = jwt.sign({ id: userRecord._id }, jwtKey);
            return res.status(200)
            .json({
                msg: 'You are logged in',
                token
            })
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while logging-in user',
                errMessage: err.message
            })
        }
    }


    /**
     * @description a method to search for a users
     * @param {object} req request object
     * @param {object} res response object
     */
    static async searchUser(req, res) {
        try {
        const { keyword } = req.query;
        const searchRegex = new RegExp(keyword, 'i')
        const users = await User.find({ $or: [{ name: searchRegex }, { email: searchRegex }] });
        return res.status(200) .json({users })
        } catch(err) {
            return res.status(500)
            .json({
                msg: 'an internal server error occured while searching users',
                errMessage: err.message
            })
        }
        
    }
}


export default UserController;