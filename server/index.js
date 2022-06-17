// const path = require("path")
// const express = require("express")
// const morgan = require("morgan")
// const helmet = require("helmet")
// const bodyParser = require("body-parser")

// const { notFound, errorHandler } = require("./middlewares")

// require("dotenv").config()

// const schema = require("./db/schema")
// const db = require("./db/connection")
// const employees = db.get("employees")

// const app = express()

// app.use(helmet())
// app.use(morgan("dev"))
// app.use(bodyParser.json())

// app.use(notFound)
// app.use(errorHandler)
// app.use(express.static(path.resolve(__dirname, "../client/build")))

// app.get("/api", (req, res) => {
//   res.json({ message: "Hello from server!" })
// })

// /* Get all employees */
// app.get("/", async (req, res, next) => {
//   try {
//     const allEmployees = await employees.find({})
//     res.json(allEmployees)
//   } catch (error) {
//     next(error)
//   }
// })

// /* Get a specific employee */
// app.get("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const employee = await employees.findOne({
//       _id: id,
//     })

//     if (!employee) {
//       const error = new Error("Employee does not exist")
//       return next(error)
//     }

//     res.json(employee)
//   } catch (error) {
//     next(error)
//   }
// })

// /* Create a new employee */
// app.post("/", async (req, res, next) => {
//   try {
//     const { firstName, lastName, emailId, job } = req.body
//     const result = await schema.validateAsync({ firstName, lastName, emailId, job })

//     const employee = await employees.findOne({
//       firstName,
//     })

//     // Employee already exists
//     if (employee) {
//       res.status(409) // conflict error
//       const error = new Error("Employee already exists")
//       return next(error)
//     }

//     const newuser = await employees.insert({
//       firstName,
//       job,
//        lastName,
//       emailId,
//     })

//     console.log("New employee has been created")
//     res.status(201).json(newuser)
//   } catch (error) {
//     next(error)
//   }
// })

// /* Update a specific employee */
// app.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const { firstName, lastName, emailId, job } = req.body
//     const result = await schema.validateAsync({ firstName, lastName, emailId, job })
//     const employee = await employees.findOne({
//       _id: id,
//     })

//     // Employee does not exist
//     if (!employee) {
//       return next()
//     }

//     const updatedEmployee = await employees.update(
//       {
//         _id: id,
//       },
//       {
//         $set: result,
//       },
//       { upsert: true }
//     )

//     res.json(updatedEmployee)
//   } catch (error) {
//     next(error)
//   }
// })

// /* Delete a specific employee */
// app.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params
//     const employee = await employees.findOne({
//       _id: id,
//     })

//     // Employee does not exist
//     if (!employee) {
//       return next()
//     }
//     await employees.remove({
//       _id: id,
//     })

//     res.json({
//       message: "Success",
//     })
//   } catch (error) {
//     next(error)
//   }
// })

// app.use(notFound)
// app.use(errorHandler)

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../client/build", "index.html"))
// })

// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`)
// })
