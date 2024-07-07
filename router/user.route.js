// const express = require('express')
import express from "express";

const router = express.Router()

const {signup, signin} = require('../controller/user.contoller.js')

router.post('/register', signup)
router.post('/login', signin)

module.exports = router