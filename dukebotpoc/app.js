// This loads the environment variables from the .env file
require('dotenv-extended').load();
var restify = require('restify');
var builder = require('botbuilder');
//var cognitiveservices = require('../../lib/botbuilder-cognitiveservices');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3980, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back (prefixed with 'You said:')
var bot = new builder.UniversalBot(connector, function (session) {
	if(session.message.text=="hi")
		session.send("Helloo");
	else
    session.send("You said: %s", session.message.text);
});

//<Recognizer> 
// Add global LUIS recognizer to bot 
 /*var luisAppUrl = process.env.LUIS_APP_URL || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8c7a3abe-a998-4709-a9d4-bfa2793f3ef9?subscription-key=debec9e5cba24fc28656f7eae27df019'; 
 var notesRecognizer = bot.recognizer(new builder.LuisRecognizer(luisAppUrl)); */

//You can provide your own model by specifing the 'LUIS_MODEL_URL' environment variable
//This Url can be obtained by uploading or creating your model from the LUIS portal: https://www.luis.ai/
var recognizer = new builder.LuisRecognizer(process.env.LUIS_MODEL_URL);
bot.recognizer(recognizer);
 // </Recognizer> 


//=========================================================
//Recognizers
//=========================================================

/*var qnarecognizer = new cognitiveservices.QnAMakerRecognizer({
	knowledgeBaseId: '3cecefd4-032e-4024-be3a-70282d15d61b', 
	subscriptionKey: '14f2e53d7e084af6a5d8a70cc1058e37',
 top: 4});

var model='http://localhost:3978/api/messages';
var recognizer = new builder.LuisRecognizer(model);

//=========================================================
//Bot Dialogs
//=========================================================
var intents = new builder.IntentDialog({ recognizers: [recognizer, qnarecognizer] });
bot.dialog('/', intents);

intents.matches('luisIntent1', builder.DialogAction.send('Inside LUIS Intent 1.'));

intents.matches('luisIntent2', builder.DialogAction.send('Inside LUIS Intent 2.'));

intents.matches('qna', [
 function (session, args, next) {
     var answerEntity = builder.EntityRecognizer.findEntity(args.entities, 'answer');
     session.send(answerEntity.entity);
 }
]);

intents.onDefault([
 function(session){
     session.send('Sorry!! No match!!');
	}
]);*/

