const tf = require('@tensorflow/tfjs')
const mobilenet = require('@tensorflow-models/mobilenet');
global.fetch = require('node-fetch');
require('@tensorflow/tfjs-node')
const express = require('express')
const bodyParser = require('body-parser')
var multer = require('multer')
var cors = require('cors');
const path = require('path');


const app = new express()

app.use(bodyParser.json())

app.use(cors());
const fs = require('fs');
const jpeg = require('jpeg-js');


const NUMBER_OF_CHANNELS = 3



const readImage = (imageName) => {
    const pixels = jpeg.decode(imageName, true)
    return pixels
  }

const imageByteArray = (image, numChannels) => {
  const pixels = image.data
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++) {
    for (let channel = 0; channel < numChannels; ++channel) {
      values[i * numChannels + channel] = pixels[i * 4 + channel];
    }
  }

  return values
}

const imageToInput = (image, numChannels) => {
  const values = imageByteArray(image, numChannels)
  const outShape = [image.height, image.width, numChannels];
  const input = tf.tensor3d(values, outShape, 'int32');

  return input
}

const loadModel = async path => {
  const mn = new mobilenet.MobileNet(1, 1);
  mn.path = `https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_1.0_224/model.json`
  await mn.load()
  return mn
}



const classify = async (imagetoClassify)=>{
  
  const model = fs.readFileSync('mobilenet/model.json')
  const image = readImage(imagetoClassify)
  const input = imageToInput(image, NUMBER_OF_CHANNELS)

  const  mn_model = await loadModel(model)
  const predictions = await mn_model.classify(input)

  const predictShort = predictions[0].className;
  
  console.log('The image is classified as', predictShort)

  return predictShort
//   return predictions;
}


app.listen('3002')

app.get('/', (req,res)=>{
    res.send("Please check your console for classification")
    let result = classify()
    console.log(result)
})

app.post('/api/hello', (req, res)=>{

  const sentData = req.body.name
  res.status(200).send({
    success: 'true',
    message: 'Image Service Running..',
    sentData
  })
});

app.post('/api/hello/image', (req,res)=>{

// Multer is a node.js middleware for handling multipart/form-data such as images. 


// Storing files on disk
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname+"/public")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+".jpg")
    }
  })

  //Stores the file with the given field name.
  var upload = multer({storage: storage}).single('myImage');

  upload(req, res, function(err){
    if(err){
      console.log("err", err);
      res.send({"ret": "err"});
        return
    }
    imgPath = __dirname+"/public/myImage.jpg";
    img = fs.readFileSync(imgPath)
    predict = classify(img).then(x=>{
      res.send("The Image is recognized as "+x)
    })
    console.log("files:",req.file);
    // console.log("res:", req.body);

    // ---------- To remove the file stored in file system ------------
    // fs.unlink(imgPath, (err) => {
    //   if (err) {
    //     console.error(err)
    //     return
    //   }
    
    //   //file removed
    // })
  })

});
