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

const app = express();
const port = process.env.PORT || 3000;

DatabaseConfig.connectDb();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// passport
PassportConfig(passport);

app.use(expressSession({ secret: 'testsecret' }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use(AuthRoutes);
app.use(UserRoutes);
app.use(CourseRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});