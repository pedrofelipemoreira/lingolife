import multer from "multer";
import path from "path";

// Destination store  the  images

const imageStorage = multer.diskStorage({
    destination: function (req, file, cb) {

        let folder = ""

        if(req.baseUrl.includes("uesers")){
            folder = "users"
        }

        cb(null, `public/images/${folder}`)

    },

    filename: function(rq, file, cb){

        cb(null, Date.now() + path.extname(file.originalname))

    }
})

const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb(new Error("por favor, envie apenas jpg ou png!!"))
        }
        cb(undefined, true)
    }
})

export default imageUpload