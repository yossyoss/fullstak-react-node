const express = require("express")
const schema = require("../db/schema")
const db = require("../db/connection")

const employees = db.get("employees")

const router = express.Router()

/* Get all employees */
router.get("/", async (req, res, next) => {
  try {
    const allEmployees = await employees.find({})
    res.json(allEmployees)
  } catch (error) {
    next(error)
  }
})

/* Get a specific employee */
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await employees.findOne({
      _id: id,
    })

    if (!employee) {
      const error = new Error("Employee does not exist")
      return next(error)
    }

    res.json(employee)
  } catch (error) {
    next(error)
  }
})

/* Create a new employee */
router.post("/", async (req, res, next) => {
  try {
    const { firstName, lastName, emailId } = req.body
    const result = await schema.validateAsync({ firstName, lastName, emailId })

    const employee = await employees.findOne({
      firstName,
    })

    // Employee already exists
    if (employee) {
      const error = new Error("Employee already exists")
      res.status(409) // conflict error
      return next(error)
    }

    const newuser = await employees.insert({
      firstName,
      lastName,
      emailId,
    })

    res.status(201).json(newuser)
  } catch (error) {
    next(error)
  }
})

/* Update a specific employee */
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const { firstName, lastName, emailId } = req.body
    const result = await schema.validateAsync({ firstName, lastName, emailId })
    const employee = await employees.findOne({
      _id: id,
    })

    // Employee does not exist
    if (!employee) {
      return next()
    }

    const updatedEmployee = await employees.update(
      {
        _id: id,
      },
      { $set: result },
      { upsert: true }
    )

    res.json(updatedEmployee)
  } catch (error) {
    next(error)
  }
})

/* Delete a specific employee */
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const employee = await employees.findOne({
      _id: id,
    })

    // Employee does not exist
    if (!employee) {
      return next()
    }
    await employees.remove({
      _id: id,
    })

    res.json({
      message: "Employee has been deleted",
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
