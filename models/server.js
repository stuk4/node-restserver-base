import express from 'express';
import cors from 'cors';
import users from '../routes/user.js';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        // Middlewares
        this.middlewares();
        // Routes of my app
        this.routes();
    }

    middlewares(){
        // Directorio publico
        this.app.use(cors());
        // Lectura y parseo del codigo
        this.app.use(express.json());

        // Directorio public
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usersPath,users);
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log("Server on port: ",this.port);
        })
    }
}


export default Server
