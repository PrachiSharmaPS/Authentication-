const jwt = require("jsonwebtoken");
//-------------------------------[ AUTHENTICATION ]--------------------------------//

const authentication = async function(req,res,Next){
    try {
        let token = req.headers["authorization"];
     
        if (!token) {
          return res.status(400).send({ status: false, message: "Token must be present." });
        }
      
        token = token.replace("Bearer ","")
       

        jwt.verify(token, 'Secert-key', function (error, decoded) { 
    
          if (error) {
            return res.status(401).send({ status: false, message: error.message });
          }
          else {
            req.decodedToken = decoded

          
            Next()
          }
        })
      } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
      }
    
    }