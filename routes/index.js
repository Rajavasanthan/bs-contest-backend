var express = require('express');
var router = express.Router();
var { title } = require('../models/titles');
var { contest } = require('../models/contest');
require('dotenv').config();
var nodemailer = require('nodemailer');
var smtpTransport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "Giridharan@gridsandguides.com",
    pass: "Grids@7788"
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/title', async (req, res) => {
  try {
    let data = await title.find();
    if (data) {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})


router.post('/title', async (req, res) => {
  try {
    let data = await new title(req.body);
    if (data) {
      data.save()
      res.status(200).json({ message: 'title inserted successfully' })
    }
  } catch (error) {
    res.status(404).json({ message: 'something went wrong' })
  }
})

router.post('/contest', async (req, res) => {
  try {
    let isUser = await contest.find({ email: req.body.email, phone: req.body.phone })
    if (isUser.length > 0) {
      res.status(200).json({ message: "User Already Exists", code: 2 })
    } else {
      if (req.body.firstName) {
        let user = await new contest(req.body);

        if (user) {
          await user.save();
          let userData = await contest.findById({ _id: user._id }).populate('title', 'title');
          mailOptions = {
            from: 'Giridharan@gridsandguides.com', // sender address
            to: "shortfilms@blacksheepvalue.com", // list of receivers
            subject: "BLACKSHEEP'S PAER SOLLUM PADAM", // plain text body
            html: `<h3>User Details</h3><p>First Name : ${userData.firstName}</p><p>Last Name : ${userData.lastName}</p><p>Age : ${userData.age}</p><p>Email : ${userData.email}</p><p>Phone No : ${userData.phone}</p><p>Title : ${userData.title.title}</p>` // html body
          };
          smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
              console.log(error);
              res.status(500).send('Error');
            } else {
              console.log("Message sent: " + response.message);
              res.status(200).json({message:'success',code:1});
            }
          })
        }


      } else {
        throw error
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
})

module.exports = router;
