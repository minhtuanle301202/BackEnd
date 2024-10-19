// Filename : api.js

const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const StudentModel = require('./studentschema');

// Connecting to database
const query = 'mongodb+srv://tuanleminh2k3:bRSgaXZHq2COzKOM@mongodb.ytaze.mongodb.net/?retryWrites=true&w=majority&appName=MongoDB';

mongoose.connect(query)
  .then(() => console.log('MongoDB connected!'))
  .catch((err) => console.log('MongoDB connection error:', err.message));


module.exports = router;


router.post('/save', async function (req, res) {
  const newStudent = new StudentModel({
    StudentId: req.body.StudentId,
    Name: req.body.Name,
    Birthday: req.body.Birthday,
    Address: req.body.Address
  });

  try {
    await newStudent.save();
    res.send("Data Added Successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error inserting data");
  }
});



router.get('/findall', async function (req, res) {
  try {
    const data = await StudentModel.find();
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error fetching students');
  }
});

router.get('/findfirst/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const data = await StudentModel.findById(id);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error finding student');
  }
});

router.delete('/delete/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const data = await StudentModel.findByIdAndDelete(id);
    res.send("Data Deleted!");
  } catch (err) {
    console.log(err);
    res.status(500).send('Error deleting student');
  }
});

router.put('/update/:id', async function (req, res) {
  try {
    const id = req.params.id;
    const data = await StudentModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send("Data Updated Succefully!");
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating student');
  }
});