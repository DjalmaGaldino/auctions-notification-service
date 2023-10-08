import AWS from 'aws-sdk'

const ses = new AWS.SES({ region: 'eu-west-1'})

async function sendMail(event, context) {
  const record = event.Records[0]
  console.log('record processing', record)

  const email = JSON.parse(record.body)
  const { subject, body, recipient } = email

  const params = {
    Source: 'albuquerquedjalma@gmail.com',
    Destination: { 
     ToAddresses: [ recipient ]
    }, 
    Message: {
     Body: {    
      Text: {
       Charset: "UTF-8", 
       Data: body
      }
     }, 
     Subject: {
      Charset: "UTF-8", 
      Data: subject
     }
    }
   }

   try {
    const result = await ses.sendEMail(params).promise()
    console.log(result)
   } catch (error) {
    console.error(error)
   }
}

export const handler = sendMail;


