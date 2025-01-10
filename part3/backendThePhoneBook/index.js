const http = require('http');

const express = require('express');
const app = express();

const persons =[
  {
    "name": "Ada Lovelace",
    "number": "38-44-5323777",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Paola",
    "number": "",
    "id": 3344
  }
]

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id',(request,response) =>{
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !==id)

    response.status(204).end()
  })




const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`);