// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import StaticDatePicker from '@mui/lab/StaticDatePicker';
// import { generateUploadURL } from '../../thirdparty/s3'
// import { format, addHours } from 'date-fns'
// import axios from 'axios'

// function disableRandomDates(date) {
//     // console.log(format(new Date(date), 'dd/MM/yyyy') === format(new Date(), 'dd/MM/yyyy'))
//     return format(new Date(date), 'dd/MM/yyyy') === format(new Date('2021-12-10T13:42:58.389+00:00'), 'dd/MM/yyyy')
//     // return format(date, 'dd/MM/yyyy - HH:mm')
//   }

// export default function Test() {
//   const [value, setValue] = React.useState(new Date());
//   const [productPictures, setProductPictures] = React.useState([]);
//   const testS3 = async () => {
//     const url = await generateUploadURL()
//     console.log(url)

//     // await fetch(url, {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "multipart/form-data"
//     //   },
//     //   body: productPictures
//     // })
//   }

//   const renderPicture = (e) => {
//     setProductPictures([
//         ...productPictures,
//         e.target.files[0]
//     ])
// }

//   return (
//     <>
//        <input type="file"  onChange={renderPicture}></input>
//       <button onClick={testS3 }>click</button>
//     {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
//       <StaticDatePicker
//         orientation="landscape"
//         openTo="day"
//         value={value}
//         shouldDisableDate={disableRandomDates}
//         onChange={(newValue) => {
//           setValue(newValue);
//         }}
//         renderInput={(params) => <TextField {...params} />}
//       />
//       </LocalizationProvider> */}
//       </>
//   );
// }

// import React, { useState } from "react";
// import aws from "aws-sdk";
// import shortid from "shortid";

// const region = "ap-southeast-1";
// const bucketName = "upload-image-s3-bucket";
// const accessKeyId = "AKIAXASYMEYEHDSRKP7I";
// const secretAccessKey = "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";

// const myBucket = new aws.S3({
//   region,
//   accessKeyId,
//   secretAccessKey,
// });

// const Test = () => {
//   const [progress, setProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [preViewImg, setPreViewImg] = useState('')

//   const handleFileInput = (e) => {
//     setSelectedFile(e.target.files[0]);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);

//     reader.onloadend = function (e) {
//       console.log(reader.result);
//       setPreViewImg(reader.result)
//     };
//   };

//   const uploadFile = (file) => {
//     const fileType = file.type.split("/")[1];
//     console.log(fileType);
//     const imageName = `${file.name}_${shortid.generate()}.${fileType}`;
//     const params = {
//       Bucket: bucketName,
//       ContentType: file.type,
//       Key: imageName,
//       Body: file,
//       Expires: 60,
//     };

//     // myBucket.putObject(params)
//     //     .on('httpUploadProgress', (evt) => {
//     //         setProgress(Math.round((evt.loaded / evt.total) * 100))
//     //     })
//     //     .send((err) => {
//     //         if (err) console.log(err)
//     //     })
//     return new Promise((resolve, reject) => {
//       myBucket.putObject(params, function checkErr(err) {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(this.request.params);
//         }
//       });
//     });
//   };
//   // const uploadFiles (files) {
//   //   const promiseArray = []
//   //   files.forEach((file) => {
//   //     promiseArray.push(uploadToBucket(file))
//   //   })
//   //   return promiseArray
//   // }

//   const handleUload = async () => {
//     const imageUrl = await uploadFile(selectedFile);
//     const uploadPhotos = {
//       src: `https://upload-image-s3-bucket.s3.ap-southeast-1.amazonaws.com/${imageUrl.Key}`,
//     };
//     // const uploadPhotos = imageUrl.map(url => ({
//     //   src: `${myBucket.endpoint}${url.Key}`
//     // }))
//     console.log(uploadPhotos);
//   };

//   return (
//     <div>
//       <div>Native SDK File Upload Progress is {progress}%</div>
//       <input type="file" onChange={handleFileInput} />
//       {/* <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button> */}
//       <button onClick={handleUload}> Upload to S3</button>
//       <img src="https://upload-image-s3-bucket.s3.ap-southeast-1.amazonaws.com/1639039205212_1"></img>
//       <img src={preViewImg} />
//     </div>
//   );
// };

// export default Test;


import React, { useState } from "react";
import { Grid, Box, TextField, MenuItem } from "@mui/material";
import DateIsotoString  from '../../component/dateIsotoString/dateIsotoString'
const Test = () => {

  return (
    <div>
      <Box
      sx={{
        width: 300,
        height: 300,
        backgroundColor: 'primary.dark',
        '&:hover': {
          backgroundColor: 'primary.main',
          // opacity: [0.9, 0.8, 0.7],
        },
      }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} style={{ position: "relative",backgroundColor: "red"}} >
            <span style={{ position: "absolute",marginLeft:"100px"}}>x</span>
            <img src="https://pronto-core-cdn.prontomarketing.com/2/wp-content/uploads/sites/2826/2018/12/1_6kK9j74vyOmXYm1gN6ARhQ.png" style={{ width: "120px", height: 120}} />
            </Grid>
          <Grid item xs={6}>2</Grid>
        </Grid>
      </Box>
      { DateIsotoString('2021-11-16T17:00:00.000Z')}
    </div>
  );
};

export default Test;