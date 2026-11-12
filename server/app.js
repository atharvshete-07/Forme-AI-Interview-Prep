require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors=require("cors");
const app = express();
const connectDB = require('./src/config/database');



app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

/*require all routes*/
const authRouter = require('./src/routes/auth.routes');
const interviewRouter=require('./src/routes/interview.routes')

/*use all routes*/
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter)

app.get('/', (req, res) => {
    res.send('Hello, World!');
}); 

const PORT =3000;  

async function startServer() {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not configured');
    }

    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer().catch((error) => {
    console.error('Server startup failed:', error);
    process.exitCode = 1;
});
