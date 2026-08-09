import multer from 'multer';

const upload = multer({
    storage: multer.memoryStorage(),
    limit:{
        filesizw: 10*1024*1024 //10mb
    }
})

export default upload;