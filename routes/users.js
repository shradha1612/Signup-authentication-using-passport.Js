const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
//bring user model
const User = require("../models/User");

//login page
router.get("/login", (req, res) => res.render("login"));

//register page
router.get("/register", (req, res) => res.render("register"));

//register handling
// router.post('/register',(req,res)=>{
//     res.send('pass')
// })

//request handling
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  //check required fields (validation)
  if (!name || !email || !password || !password2) {
    errors.push({ msg: "Please fill all the fields" });
  }

  //check password match
  if (password != password2) {
    errors.push({ msg: "Password do not match" });
  }

  //check pass length
  if (password.length < 5) {
    errors.push({ msg: "Password should be atleast 5 character" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    //validation
    //res.send('pass')
    User.findOne({ email: email }).then((user) => {
      if (user) {
        //user exist
        errors.push({ msg: "Email is already registered" });
        res.render("register", {
          errors: errors, //same as error
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });
        
        //hash
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;

            newUser.password = hash;
            newUser.save()
              .then((user) => {
                res.redirect("/login");
              })
              .catch((err) => console.log(err));
          });
        });
        //    console.log(newUser)
        //    res.send('hello');
      }
    });
  }
});
module.exports = router;



