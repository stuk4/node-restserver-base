import express from 'express';
import cors from 'cors';
import users from '../routes/user.js';
import auth from '../routes/auth.js';
import products from '../routes/products.js';
import categories from '../routes/categories.js'
import search from '../routes/search.js'
import uploads from '../routes/uploads.js'
import { dbConection } from '../database/config.js';
import fileUpload from 'express-fileupload';

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        this.paths ={
            auth:'/api/auth',
            users: '/api/users',
            categories:'/api/categories',
            products:'/api/products',
            search:'/api/search',
            uploads:'/api/upload',
        }

     
        // Conectar a mi bd
        this.connectDB()
        // Middlewares
        this.middlewares();
        // Routes of my app
        this.routes();
    }
    async connectDB(){
        await dbConection()
    }

    middlewares(){
        // Directorio publico
        this.app.use(cors());
        // Lectura y parseo del codigo
        this.app.use(express.json());

        // Directorio public
        this.app.use(express.static('public'));
        // FileUpload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles:true,
            tempFileDir:'/tmp/',
            createParentPath:true
        }))
    }

    routes(){
        this.app.use(this.paths.auth,auth);
        this.app.use(this.paths.users,users);
        this.app.use(this.paths.categories,categories)
        this.app.use(this.paths.products,products)
        this.app.use(this.paths.search,search)
        this.app.use(this.paths.uploads,uploads)
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log("Server on port: ",this.port);
        })
    }
}


export default Server
