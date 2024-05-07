const jwt = require("jsonwebtoken");
const JWT_SECRET = "chinugupta1234567";

const fetchuser = (req, res, next) => {
 // get the user from the jwt token and add id to the req object
  const token = req.header("auth-token"); //we took token from header  in which a authtoken is present
  if (!token) {
    res.status(401).send({error:"user is not authorized or token is missing or expired"});
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; //in this we took the user data fron jwt and assign it into req.user
   next();
  } catch (error) {
    res.status(401).send({ error: "please authenticate using a valid token" });
  }


  
  // const token = req.header("auth-token");
  // console.log("Token:", token);

  // try {
  //   const data = jwt.verify(token, JWT_SECRET);
  //   console.log("Decoded Data:", data);
  //   req.user = data;
  //   next();
  // } catch (error) {
  //   console.error("Token Verification Error:", error);
  //   res.status(401).send({ error: "Please authenticate using a valid token" });
  // }
};

module.exports = fetchuser;
