const express = require("express");
const User = require("../models/userModel")
const router = express.Router();
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
    const {name, email, password, gender} = req.body

    if(!name || !email || !password || !gender) {
        res.status(400).json({error: "Fill all the details"})
    }
    try {
        const preuser = await User.findOne({email: email})

        if(preuser) {
            res.status(400).json({error : "This email already exists"})
        } 
        const user = req.body;
        const newUser = new User(user)
        await newUser.save()

        res.status(200).json({message: user})

    } catch(error) {
        res.status(400).json(error);
        console.log("catch block error");
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })
        if(!user) {
            return res.json({status : "error", user: false})
        } else {
            const token  = jwt.sign({
                name: user.name,
                email: user.email
            }, "secret123")
            return res.json({status : "ok", user: token})
        }

    }
    catch(error) {
        return res.status(500).send(error.message);
    }
})

const cards = [
    {
        id: 1,
        title: 'Card 1',
        center: [20.5937, 78.9629],
        zoom: 4
      },
      {
        id: 2,
        title: 'Card 2',
        center: [28.7041, 77.1025],
        zoom: 10
      },
      {
        id: 3,
        title: 'Card 3',
        center: [12.9716, 77.5946],
        zoom: 12
      }
];

router.get('/dashboard', (req, res) => {
    // Dummy data for cards
    
    try {
        return res.json(cards);
        console.log(cards)
    } catch(error) {
        return res.status(500).send(error.message);
    }
    
  });

  router.get('/map/:id', (req, res) => {
    const card = cards.find(card => card.id === parseInt(req.params.id));
    if (!card) {
      res.status(404).send('Card not found');
    } else {
      res.json(card);
      //console.log(req.params.id)
    }
  });

module.exports = router