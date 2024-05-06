import multer from 'multer'

const storage = multer.diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, './src/storage/restaurants/')
  },
  filename: function (_req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`)
  }
})

export const upload = multer({ storage })
