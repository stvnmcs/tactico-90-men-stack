const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get("/", async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user.userId);
        res.render('events/index.ejs', {events: currentUser.events, user: currentUser});
      } catch (error) {
        console.log(error)
        res.redirect('/')
      }
});



router.get('/new', async (req, res) => {
    res.render('events/new.ejs', {user: req.session.user});
});



router.post('/', async (req, res) => {
    try {
      console.log(req.body)
      const currentUser = await User.findById(req.session.user.userId);
      currentUser.events.push(req.body);
      await currentUser.save();
      res.redirect(`/users/${currentUser.userId}/events`);
    } catch (error) {
      console.log(error);
      res.redirect('/')
    }
});
  

router.get("/:eventId", async (req, res) => {
    try{
        const userId = req.session.user.userId;
        const currentUser = await User.findById(userId);
        const event = currentUser.events.id(req.params.eventId);
        res.render("events/show.ejs", {
            event: event,
            user: currentUser,
        }); 

     }catch (error) {
        console.log(error);
        res.redirect("/")

    }
    //res.send(`here is your request param: ${req.params.eventId}`);
});

router.delete('/:eventId', async (req, res) => {
    try {
      
      const currentUser = await User.findById(req.session.user.userId);
      
      currentUser.events.id(req.params.eventId).deleteOne();
     
      await currentUser.save();
      
      res.redirect(`/users/${currentUser.userId}/events`);
    } catch (error) {
      
      console.log(error);
      res.redirect('/')
    }
});

router.get('/:eventId/edit', async (req, res) => {
  try {
      const userId = req.session.user.userId;
      const currentUser = await User.findById(userId);
      const event = currentUser.events.id(req.params.eventId);
      event.set(req.body);
      await currentUser.save();
      res.render("events/edit.ejs", {event, user: currentUser});
      
  } catch (error) {
    console.log(error);
    res.redirect("/")
  }
});

router.put('/:eventId', async (req, res) => {
  const userId = req.session.user.userId;
  const currentUser = await User.findById(userId);
  const event = currentUser.events.id(req.params.eventId);
  event.set(req.body);
  await currentUser.save();
  res.redirect(`/users/${userId}/events/${req.params.eventId}`);
});
  

module.exports = router;
