import mongoose from "mongoose";

let connect = false;
export const db = async () => {
    try {
        if (!connect) {
            await mongoose.connect("mongodb://127.0.0.1:27017", {
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

