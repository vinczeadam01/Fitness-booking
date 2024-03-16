import mongoose, {ConnectOptions} from "mongoose";

export class DatabaseConfig {
    public static connectDb(): void {
        const dbUrl = `mongodb://db:27017/${process.env.MONGO_DB_NAME ?? ''}`

        const connectionOptions: ConnectOptions = {
            user: process.env.MONGO_USER ?? '',
            pass: process.env.MONGO_PASSWORD ?? '',
        }

        mongoose.connect(dbUrl, connectionOptions)
            .then(() => {
                console.log('Database connected')
            })
            .catch((error) => {
                console.log('Error connecting to database: ', error)
            })
    }
}
