
const aws = require('aws-sdk');
const google = require('@google-cloud/translate').v2;
const credentials = require('../../credentials.json');

// Instantiates a client


const useTranslate = (type = "Amazon", SourceLanguageCode = 'pt', TargetLanguageCode = 'en') => {
  let awsTranslate;
  let googleTranslate;

  if (type === "Amazon") {
    aws.config.region = process.env.REACT_APP_AWS_TRANSLATE_REGION;
    aws.config.credentials = new aws.Credentials({
      accessKeyId: process.env.REACT_APP_AWS_TRANSLATE_ID,
      secretAccessKey: process.env.REACT_APP_AWS_TRANSLATE_SECRET
    });
    awsTranslate = new aws.Translate({ region: aws.config.region });
  }
  else {
   googleTranslate = new google.Translate({
      credentials: credentials,
      projectId:process.env.REACT_APP_GOOGLE_PROJECTID});
  }


  const translate = async (text) => {
    if (type === "Amazon") {
      const translation = await awsTranslate.translateText({ Text: text, SourceLanguageCode: SourceLanguageCode, TargetLanguageCode: TargetLanguageCode }).promise();
      return translation.TranslatedText;
    }
    else {
      const response = await googleTranslate.translate(text, TargetLanguageCode);
      
      return response[0];
    }

  }

  return { translate };
}


export default useTranslate;