import path from 'path';
import express,{Request, Response} from 'express';
import multer from 'multer';
const router = express.Router();



// configurates how the files are gonna be stored
const storage = multer.diskStorage({
  destination: function (req: Express.Request, file: Express.Multer.File, callback: (error: Error | null, destination: string) => void) {
    callback(null, '../../../uploads/');
  },
  filename: function (req: Request, file: Express.Multer.File, callback: (error: Error | null, filename: string) => void) {
    
    callback(null,`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
   

const upload = multer({storage});

router.post('/', upload.single('image'), (req : Request , res : Response) => {
  console.log('called uplaod route');
  res.send(`/${req?.file?.path}`);
 
});

export default router;
