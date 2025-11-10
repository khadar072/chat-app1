import multer from "multer";

// store file in memory instead of disk
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;
