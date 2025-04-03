import mongoose from "mongoose";

let connect = false;
export const db = async () => {
    try {
        if (!connect) {
            await mongoose.connect(process.env.MONGO_URL!, {
                dbName: "Airnnb"
            })
            connect = true
            console.log("Connect successful")
        }
        console.log("already connected")
    } catch (error) {
        console.log(error);
    }
}

