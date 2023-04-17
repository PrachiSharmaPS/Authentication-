const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userModel = require("./userModel")

//-------------------------------------[ CREATE USER ]---------------------------------------//
const createUser = async function (req, res) {
    try {
      let data = req.body;
  
      if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please give some data" }); }
  
      let { fistName, lastName, email,  password } = data;
  
      if (!fistName) { return res.status(400).send({ status: false, message: "FirstName is mandatory" }); }
      if (! lastName) { return res.status(400).send({ status: false, message: "lastName is mandatory" }); }
      if (!email) { return res.status(400).send({ status: false, message: "Email is mandatory" }); }
      if (! password) { return res.status(400).send({ status: false, message: "Phone is mandatory" }); }

      
      //..hashing
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
    
  
      const userData = { fistName: fistName,  lastName:  lastName,  email: email, password: hash,  }
      
      const user = await userModel.create(userData);
      return res.status(201).send({ status: true, message: "User created successfully", data: user });
  
    }
    catch (error) {
      return res.status(500).send({ status: false, message: error.message });
    }
  }
  
  //----------------------------------------[ LOGIN USER ]-------------------------------------//
  const loginUser = async function (req, res) {
    try {
      let data = req.body
      if (Object.keys(data).length == 0) { return res.status(400).send({ status: false, message: "Please enter login details" }); }
  
      const { email, password } = data
  
      if (!email) { return res.status(400).send({ status: false, messsage: "Email is required" }); }
      if (!password) { return res.status(400).send({ status: false, messsage: "Password is required" }); }
  
      const userData = await userModel.findOne({ email: email })
      if (!userData) { return res.status(404).send({ status: false, message: "Email is incorrect" }); }
  
      const comparePassword = await bcrypt.compare(password, userData.password)
      if (!comparePassword) { return res.status(401).send({ status: false, msg: "Password is incorrect" }); }
  
      //token contain iat, exp, userId 
      const token = jwt.sign({ userId: userData._id }, "Secert-key", { expiresIn: "5h" } )
  
      return res.status(200).send({ status: true, message: "User login successfull", data: { userId: userData._id, token: token } })
    }
    catch (error) {
      return res.status(500).send({ status: false, message: error.message })
    }
  }
  
  module.exports = {createUser,loginUser}