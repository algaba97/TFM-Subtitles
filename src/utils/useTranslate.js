
const aws = require('aws-sdk');



const useTranslate = () => {

    aws.config.region = process.env.REACT_APP_AWS_TRANSLATE_REGION;
    aws.config.credentials = new aws.Credentials({
        accessKeyId:process.env.REACT_APP_AWS_TRANSLATE_ID,
        secretAccessKey:process.env.REACT_APP_AWS_TRANSLATE_SECRET
     });
    var awsTranslate = new aws.Translate({region: aws.config.region});


  const params = {
    Text: 'Hola',
    SourceLanguageCode: 'es',
    TargetLanguageCode: 'en',
  };
  const translate = async(text) =>{
    debugger;
   const translation = await awsTranslate.translateText({...params}).promise();
   console.log( translation.TranslatedText);
   debugger;
   return "";
  } 

  return { translate };
}

export default useTranslate;