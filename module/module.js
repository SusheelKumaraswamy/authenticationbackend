const model = require('../model/model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async(req,res,next) =>{
    try {
        const {MailID,UserName,Password}= req.body;
    var passwordencrypted =await bcrypt.hash(Password,10);
    
    if(!(MailID && UserName && Password)){
        return res.status(400).send("All fields are required");
    }

    const olduser = await model.findOne({MailID});

    if(olduser){
        return res.status(409).send("User already Exists,Please Login");
    }

    const user = await new model({
        MailID:MailID,
        UserName:UserName,
        Password:passwordencrypted
    });

    const token = jwt.sign(
        { user_id: user._id, MailID },
        process.env.TOKEN_KEY,
        {
          expiresIn: "5h",
        }
      );
    
    user.token = token;
    var response = await user.save();
    res.status(201).json(response);  
    } 
    
    catch (error) {
        res.send(error);
    }
}

exports.login =async(req,res,next)=>{
    try {
        const {MailID,Password}= req.body;
        if(!(MailID && Password)){
            return res.status(400).send("All input fields are required.");
        }
        const user = await model.findOne({MailID});

        if(user &&(await bcrypt.compare(Password,user.Password))){
            const token = jwt.sign(
                { user_id: user._id, MailID },
                process.env.TOKEN_KEY,
                {
                  expiresIn: "5h",
                }
              );

            user.token = token;
            var response = await user.save();
            return res.status(200).json(response);
        }
        return res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log(error);
    }
}

exports.welcome= async (req,res,next)=>{
        return res.status(200).send("Welcome to FreeCodeCamp 🙌");
}
