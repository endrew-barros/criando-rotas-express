const express = require('express')
const app = express()
const PORT = 3000
app.use(express.json())

let data = []

app.post('/register', (req,res)=>{
    const newRegister = req.body
    data.push(newRegister)
    res.status(201).json({menssage: 'Register create an sucess'})
})
app.get('/list', (req,res)=>{
    res.status(200).json({menssage: 'here goes the data',data})
})

app.get('/list/:userId', (req,res)=>{
    //cpature id
    const {userId} = req.params
    // I search in date
    const usuario = data.find(usuario=> usuario.id === Number(userId))
    //check if user ixist
    if(usuario){
        //return user
        return res.status(200).json({menssage: 'user found', usuario})
    }
    //any other result
    return res.status(401).json({menssage: 'user not found', usuario})
})
//edit register by id
app.put('/edit/:userId', (req,res)=>{
    const {userId} = req.params
    const {nome, telefone} = req.body
    const usuario = data.find(usuario=> usuario.id=== Number(userId))
    if(usuario){
        data = data.map(usuario=>{
            if(usuario.id ===Number(userId)){
                return {...usuario,nome,telefone}
            }
            return usuario
        })
    res.status(200).json({message: 'succefully changed', data})
    }
    res.status(401).json({message: 'user not found'})
})
app.delete('/delete/:userId',(req,res)=>{
    // const userId req.params.userId
})

app.listen(PORT, ()=>{
    console.log(`server is runner http://localhost:${PORT}`)
})