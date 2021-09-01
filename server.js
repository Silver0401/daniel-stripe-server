const express = require("express")
const app = express()
let port = process.env.PORT || 4000
app.use(express.json())

const missingList = [12, 23, 34, 45, 56]

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
  
})


for (let c = 2; c <= 66; c++){
  if (missingList.includes(c)){} 
  else {
    app.get(`/Diapositiva${c}`, (req,res) => {

      res.sendFile(__dirname + `/resources/Diapos1/Diapositiva${c}.jpeg`)

    })
  }
}

for (let c = 1; c <= 60; c++){
  app.get(`/Diapo${c}`, (req,res) => {
    res.sendFile(__dirname + `/resources/Diapos2/Diapo${c}.jpeg`)
  })
}



app.listen(port, () => console.log(`App server initalized on port ${port}`))

