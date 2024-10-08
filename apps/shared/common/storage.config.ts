import { diskStorage } from 'multer';
import * as path from 'path';

export const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, '..', '..', '..', '..', 'apps', 'users', 'upload'),
    );
  },
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  },
});

function generateFilename(file) {
  return `${Date.now()}.png`;
}
