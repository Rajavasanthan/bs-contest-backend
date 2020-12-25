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
        req.body.age = Number(req.body.age);
        let user = new contest(req.body);
        if (user) {
          await user.save();
          let userData = await contest.findById({ _id: user._id }).populate('title', 'title');
         let maillist = [
            'jayaprakash@blacksheepvalue.com',
            'Samprabha@blacksheepvalue.com'
          ]
        
          mailOptions = {
            from: 'Giridharan@gridsandguides.com', // sender address shortfilms@blacksheepvalue.com
            to: "", // list of receivers
            subject: "BLACKSHEEP'S PAER SOLLUM PADAM", // plain text body
            html: `<h3>User Details</h3><p>First Name : ${userData.firstName}</p><p>Last Name : ${userData.lastName}</p><p>Age : ${userData.age}</p><p>Email : ${userData.email}</p><p>Phone No : ${userData.phone}</p><p>Title : ${userData.title.title}</p>` // html body
          };
          maillist.forEach(function (to, i , array) {
            mailOptions.to = to;
            smtpTransport.sendMail(mailOptions, function (err) {
              if (err) { 
                console.log('Sending to ' + to + ' failed: ' + err);
              } else { 
                console.log('Sent to ' + to);
              }
              if (i == maillist.length - 1) { 
                msg.transport.close();
              }
            });
          })
        }
        res.status(200).json({message:'Successfully Uploaded'})
      } else {
        throw new Error('Failed to Save User')
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'something went wrong' })
  }
})

module.exports = router;
