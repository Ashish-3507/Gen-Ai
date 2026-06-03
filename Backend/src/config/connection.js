import mongoose from "mongoose";

const connection = async()=>{
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGOOSE_URL)
        console.log(`The mongoose database is connected!! ${connectionInstance.Connection.host}`)
    } catch (error) {
        console.log(`Error while connection to the database: ${error}`);
        process.exit(1);
    }
}
export default connection;