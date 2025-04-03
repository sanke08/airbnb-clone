// import mongoose from "mongoose";

// let connect = false;
// export const db = async () => {
//     try {
//         if (!connect) {
//             await mongoose.connect(process.env.MONGO_URL!, {
//                 dbName: "Airnnb"
//             })
//             connect = true
//             console.log("Connect successful")
//         }
//         console.log("already connected")
//     } catch (error) {
//         console.log(error);
//     }
// }



import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    throw new Error("Please define the MONGO_URL environment variable");
}

// Global cache object to reuse connection
// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

export const db = async () => {
    if (cached.conn) {
        console.log("✅ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("⏳ Connecting to MongoDB...");
        cached.promise = mongoose.connect(MONGO_URL, {
            dbName: "Airnnb",
        });
    }

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
};
