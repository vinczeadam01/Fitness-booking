import express, { Request, Response } from 'express';
import { DatabaseConfig } from './configs/db';
import { User } from './models/user';

const app = express();
const port = process.env.PORT || 3000;

DatabaseConfig.connectDb();

app.get('/', (req: Request, res: Response) => {
    const user = new User({
        email: 'user@user.com',
        'password': 'password'
    });
    user.save()
        .then((result) => {
            res.send("success:" + result.toString());
        })
        .catch((error) => {
            res.send("error:" + error.toString());
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});