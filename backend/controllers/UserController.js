import { User } from "../models/user.js";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";



//helpers
import createUserToken from "../helpers/create-user-token.js";


const UserModel = User;

const userController = {

  register: async (req, res) => {
    const { name, email, password, confirmpassword, language, about } = req.body;

    //validations

    if (!name) {
      res.status(422).json({ message: "O nome é obrigatório" });
      return;
    }

    if (!email) {
      res.status(422).json({ message: "O email é obrigatório" });
      return;
    }

    if (!language || !language.idioma || !language.level) {
      res.status(422).json({ message: "O idioma e o nível são obrigatórios" });
      return;
    }

    if (!about) {
      res.status(422).json({ message: "O Sobre é obrigatório" });
      return;
    }

    if (!password) {
      res.status(422).json({ message: "A senha é obrigatória" });
      return;
    }

    if (!confirmpassword) {
      res.status(422).json({ message: "A confirmação de senha é obrigatória" });
      return;
    }

    if (password !== confirmpassword) {
      res.status(422).json({
        message: "A senha e a confirmaçaõ de senha precisam ser iguais",
      });
      return;
    }

    //Check if user exist

    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      res.status(422).json({ message: "Por favor Utilize outro e-mail" });
      return;
    }

    // create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create user
    const user = new UserModel({
      name,
      email,
      language,
      about,
      password: passwordHash,
    });

    try {

      const newUser = await user.save();

      /*       res.status(201).json({
      
               message: "Usuario Criado",
               newUser 
      
              }); */

      await createUserToken(newUser, req, res);

    } catch (error) {
      res.status(500).json({ message: error })
    }

  },

  login: async(req, res) =>{
    
  }

};

export default userController;
