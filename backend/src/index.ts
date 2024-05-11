import express, {NextFunction, Request, Response} from 'express';
import { DatabaseConfig } from './configs/db.config';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import AuthRoutes from "./routes/auth.routes";
import passport from "passport";
import PassportConfig from "./configs/passport.config";
import bodyParser from "body-parser";
import UserRoutes from "./routes/user.routes";
import CourseRoutes from "./routes/course.routes";
import cors from 'cors';
import TrainerRoutes from "./routes/trainer.routes";
import RegistrationRoutes from "./routes/registration.routes";

const app = express();
const port = process.env.PORT || 3000;

DatabaseConfig.connectDb();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// cors
const whitelist = ['*', 'http://localhost:4200']
const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allowed?: boolean) => void) => {
        if (whitelist.indexOf(origin!) !== -1 || whitelist.includes('*')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS.'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));

app.use(expressSession({
    secret: 'testsecret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// passport
PassportConfig(passport);

// static files
app.use(express.static(__dirname + '/public'));

// routes
app.use('/api', AuthRoutes);
app.use('/api', UserRoutes);
app.use('/api', CourseRoutes);
app.use('/api', TrainerRoutes);
app.use('/api', RegistrationRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});