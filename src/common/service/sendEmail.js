import nodemailer from "nodemailer";
import { randomInt } from 'node:crypto';

export const sendEmail = async({to , subject , html , attachments})=>{

const transporter = nodemailer.createTransport({ 
service : "gmail",
auth : {
    user : "magdymohab110@gmail.com",
    pass : "jppqlbfptyvwtcog"
}
})

  const info = await transporter.sendMail({
    from: '"sarahah app" <magdymohab110@gmail.com>',
    to,
    subject,
    html: html || "<h1>Hello world?</h1>",
    attachments : attachments || []
  });


  return info.accepted.length > 0 ? true : false;
}

export const generate_otp = async()=>{
return randomInt( 100000 , 1000000).toString();
}
