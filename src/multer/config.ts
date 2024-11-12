import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the upload folder (videos/)
    const uploadDir = "./uploads/videos";

    // Ensure the folder exists, if not, create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir); // Destination folder for the files
  },
  filename: (req, file, cb) => {
    // Set the file name to be the original name with a timestamp
    const fileName =
      path.basename(file.originalname, path.extname(file.originalname)) +
      "_" +
      Date.now() +
      path.extname(file.originalname);
    cb(null, fileName);
  },
});

// Initialize multer with the defined storage engine
export const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only accept video files (e.g., .mp4, .mov, .avi)
    const allowedTypes = /mp4|mov|avi|mkv/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only video files are allowed."));
    }
  },
});
