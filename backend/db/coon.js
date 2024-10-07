import mongoose from "mongoose";

async function main(){

    try {

        mongoose.set("strictQuery", true);
        
        await mongoose.connect("mongodb+srv://PedroFelipe:vEXgHNh2Chp0a9sw@clusterlingolife.6rafq.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLingoLife");

        console.log("Conectado ao banco!!")

    } catch (error) {
        console.log(error);
    }

}

export default main;