
const aws = require('aws-sdk');



const useTranslate = () => {

    aws.config.region = process.env.REACT_APP_AWS_TRANSLATE_REGION;
    aws.config.credentials = new aws.Credentials({
        accessKeyId:process.env.REACT_APP_AWS_TRANSLATE_ID,
        secretAccessKey:process.env.REACT_APP_AWS_TRANSLATE_SECRET
     });
    var awsTranslate = new aws.Translate({region: aws.config.region});


  const params = {
    SourceLanguageCode: 'pt',
    TargetLanguageCode: 'en',
  };
  const translate = async(text) =>{
   const translation = await awsTranslate.translateText({Text:text, ...params}).promise();
   return translation.TranslatedText;
  } 

  return { translate };
}

export default useTranslate;