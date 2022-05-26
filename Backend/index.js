const connectToMongo = require('./db');

const express = require('express')
var cors = require('cors') 

  

connectToMongo();
const app = express()
app.use(cors())
const port = process.env.PORT || 5000
app.use(express.json());
// Available Routes

app.get('/', (req, res)=>{
  console.log(req)
  res.send('working')
})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/stocks', require('./routes/stocks'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}) 
module.exports=app;