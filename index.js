var express = require('express');  
var bodyParser = require('body-parser');  
var request = require('request');  
var app = express();
var useragent = require('express-useragent');
var path    = require("path");
var stringSearcher = require('string-search');
// this is for chakribot
//const PAGE_ACCESS_TOKEN = "EAAEnw2c9cIsBAELqZAzfZCi7bbUctFplk8uQXGPBeNeEReqoZBnlM45atX68e8iStouCQGzBLPZCHoZBJOdGMiwk9HoTvueu7dZB8Krrx36WKtYfmhhF8ZAsLNWmKv0BSZArPvtAvZB0cOiaw7c8mXw2Aasbd7o8ZBfF376xvTcxNl5AZDZD"
const PAGE_ACCESS_TOKEN = "EAAEnw2c9cIsBAD1ZB7Hs08wo2f8kpanSdyfVkERDN7GZAhVfEZBuQi9ZC7ntwjz8ZCV05UrdnF9RiOPCH5ZADvkL7TZBNTs5oh6EtkSWikvbjI6j1aXEOSKIb4Kgc4iXggMP2PSXecAumGIoZAPHrUU7MV5oaevZBltto8TXZBneeKuAZDZD"
const fb_verify_token = "webhooktoken"
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());  
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
//app.listen((process.env.PORT || 5000));
app.use("/assets", express.static(__dirname + '/assets'));
//app.use(compression());
app.set('case sensitive routing', true);
//app.use(bodyParser.json());

// api call 

var http = require('http');

app.get('/jobalert',function(req,res){

    wikibot('it','8801673615816');

    res.sendStatus(200);


});

function wikibot(query, userid) {
  var queryUrl = "http://www.chakri.com/chkapi/rest/usernotification?key=16486";
  var url = queryUrl;
  
  var myTemplate = {
    recipient: {
      //id: userid
      phone_number:"8801673615816"
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: []
        }
      }
    }
  };
  var options = {
    //url: url,
    url: queryUrl,
    method: 'POST',
    body: myTemplate,
    json: true
  }

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var jobResponse = JSON.parse(body);

        //res.writeHead(200, {'Content-Type': 'text/plain'});
        for (var i=0; i<jobResponse.data.length; i++){
            var id = JSON.stringify(jobResponse.data[i].id);
            var job_title = JSON.stringify(jobResponse.data[i].job_title);
            var category = JSON.stringify(jobResponse.data[i].category);
            var item_url = JSON.stringify(jobResponse.data[i].item_url);

            console.log("Got a response: ", item_url);

            var myelement = {
                  title: "",
                  subtitle: "",
                  buttons: [{
                    type: "postback",
                    title: "Read more",
                    payload: "Nothing here, Please view in browser"
                  }, {
                    type: "web_url",
                    url: "",
                    title: "View in browser"
                  }]
          };
          
          myelement.title = category;
          myelement.subtitle = job_title.substr(0, 80).trim();
          //myelement.buttons[1].url =  item_url;
          myelement.buttons[1].url = item_url.replace(/^"(.*)"$/, '$1');
          //console.log ("link : "+item_url);
          myTemplate.message.attachment.payload.elements.push(myelement);
          //console.log(id,job_title,category,item_url);
      }  

      options.body = myTemplate;

      callSendAPI(myTemplate);

        //console.log("Got a response: ", jobResponse.data);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});


  /*request(queryUrl, function(error, response, body) {
    console.log ('test..........');

    if (error) {
      console.log(error);
    }
    try {
      body = JSON.parse(body);
      var pages = body.query.data;
      console.log (pages);
      for (var i = 0 in pages) {
        var myelement = {
          title: "",
          subtitle: "",
          buttons: [{
            type: "postback",
            title: "Read more",
            payload: "Nothing here, Please view in browser"
          }, {
            type: "web_url",
            url: "",
            title: "View in browser"
          }]
        };
        myelement.title = pages[i].category;
        myelement.subtitle = pages[i].job_title.substr(0, 80).trim();
        myelement.buttons[1].url =  pages[i].item_url;
        if (pages[i].extract != "") {
        myelement.buttons[0].payload = pages[i].extract.substr(0, 1000).trim();
        }
        myTemplate.message.attachment.payload.elements.push(myelement);
      }
      options.body = myTemplate;
    }
    catch (err) {
      console.log("error : " + err.message);
      options = {
        uri: url,
        method: 'POST',
        json: {
          "recipient": {
            "id": userid
          },
          "message": {
            "text": "Something went wrong, please try again."
          }
        }
      }
    }
    request(options, function(error, response, body) {
      if (error) {
        console.log(error.message);
      }
      console.log(body);
    });
  })*/
};


app.get('/jobnotify', function (req, res) {  
   // res.send('This is TestBot Server');

   //The url we want is `www.nodejitsu.com:1337/`
/*var options = {
  host: 'http://www.chakri.com/chkapi/rest/usernotification?key=16486',
  path: '/',
  //since we are listening on a custom port, we need to specify it by hand
  //port: '1337',
  //This is what changes the request to a POST request
  method: 'get'
};
  

   //res.sendFile(path.join(__dirname+'/index.html'));
   var req = http.request(options, callback);
  //This is the data we are posting, it needs to be a string or a buffer
  //req.write("hello world!");
   req.end();*/
   var url = 'http://www.chakri.com/chkapi/rest/usernotification?key=16486';

http.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var jobResponse = JSON.parse(body);

        //res.writeHead(200, {'Content-Type': 'text/plain'});
        for (var i=0; i<jobResponse.data.length; i++){
            var id = JSON.stringify(jobResponse.data[i].id);
            var job_title = JSON.stringify(jobResponse.data[i].job_title);
            var category = JSON.stringify(jobResponse.data[i].category);
            var web_url = JSON.stringify(jobResponse.data[i].item_url);

            console.log(id,job_title,category,web_url);
        }

        //console.log("Got a response: ", jobResponse.data);
    });
}).on('error', function(e){
      console.log("Got an error: ", e);
});

res.sendStatus(200);

  // res.statusCode(200);



});








// Server frontpage
app.get('/', function (req, res) {  
   // res.send('This is TestBot Server');

   res.sendFile(path.join(__dirname+'/index.html'));
});

// Facebook Webhook
app.get('/webhook', function (req, res) {  
    if (req.query['hub.verify_token'] === fb_verify_token) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});


// handler receiving messages
app.post('/webhook', function (req, res) {  
    console.log ("post message ");
    console.log(JSON.stringify(req.body))

    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {
           


                // sendMessage(event.sender.id, {text: "chakri.com: " + event.message.text});
               receivedMessage(event);
             
            
        }
    }
    res.sendStatus(200);
});


/*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page. 
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
app.post('/webhook', function (req, res) {
  var data = req.body;

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function(pageEntry) {
      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function(messagingEvent) {
        if (messagingEvent.optin) {
          receivedAuthentication(messagingEvent);
        } else if (messagingEvent.message) {
          receivedMessage(messagingEvent);
        } else if (messagingEvent.delivery) {
          receivedDeliveryConfirmation(messagingEvent);
        } else if (messagingEvent.postback) {
          receivedPostback(messagingEvent);
        } else if (messagingEvent.read) {
          receivedMessageRead(messagingEvent);
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent);
        } else {
          console.log("Webhook received unknown messagingEvent: ", messagingEvent);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've 
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});



app.get('/jobs', function (req, res) {  
    
    /*if (req.query['hub.verify_token'] === fb_verify_token) {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }*/
    var phone = req.query.phone;
    console.log ('phone: ' + phone);
    
    sendJobNotification(phone);

    //res.sendStatus(200); 
    res.send('Job notification send to this number ' + phone);
});


/*
 * Authorization Event
 *
 * The value for 'optin.ref' is defined in the entry point. For the "Send to 
 * Messenger" plugin, it is the 'data-ref' field. Read more at 
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/authentication
 *
 */
function receivedAuthentication(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfAuth = event.timestamp;

  // The 'ref' field is set in the 'Send to Messenger' plugin, in the 'data-ref'
  // The developer can set this to an arbitrary value to associate the 
  // authentication callback with the 'Send to Messenger' click event. This is
  // a way to do account linking when the user clicks the 'Send to Messenger' 
  // plugin.
  var passThroughParam = event.optin.ref;

  console.log("Received authentication for user %d and page %d with pass " +
    "through param '%s' at %d", senderID, recipientID, passThroughParam, 
    timeOfAuth);

  // When an authentication is received, we'll send a message back to the sender
  // to let them know it was successful.
  sendTextMessage(senderID, "Authentication successful");
}


/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message' 
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some 
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've 
 * created. If we receive a message with an attachment (image, video, audio), 
 * then we'll simply confirm that we've received the attachment.
 * 
 */
function receivedMessage(event) {
  
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var isEcho = message.is_echo;
  var messageId = message.mid;
  var appId = message.app_id;
  var metadata = message.metadata;

  // You may get a text or attachment but not both
  var messageText = message.text;
  var messageAttachments = message.attachments;
  var quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    console.log("Received echo for message %s and app %d with metadata %s", 
      messageId, appId, metadata);
    return;
  } else if (quickReply) {
    var quickReplyPayload = quickReply.payload;
    console.log("Quick reply for message %s with payload %s",
      messageId, quickReplyPayload);

    sendTextMessage(senderID, "Quick reply tapped");
    return;
  }

  if (messageText) {

    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText) {
      case 'image':
        sendImageMessage(senderID);
        break;

      case 'gif':
        sendGifMessage(senderID);
        break;

      case 'audio':
        sendAudioMessage(senderID);
        break;

      case 'video':
        sendVideoMessage(senderID);
        break;

      case 'file':
        sendFileMessage(senderID);
        break;

      case 'button':
        sendButtonMessage(senderID);
        break;

      case 'generic':
        sendGenericMessage(senderID);
        break;

      case 'receipt':
        sendReceiptMessage(senderID);
        break;

      case 'quick reply':
        sendQuickReply(senderID);
        break;        

      case 'read receipt':
        sendReadReceipt(senderID);
        break;        

      case 'typing on':
        sendTypingOn(senderID);
        break;        

      case 'typing off':
        sendTypingOff(senderID);
        break;        

      case 'account linking':
        sendAccountLinking(senderID);
        break;

      default:
        if (messageText=="hi")
        {
          messageText = "Welcome to Chakri.com. Are you looking for jobs ? if so then type : jobs ."
          sendTextMessage(senderID, messageText);  
        }else
        {
          sendTextMessage(senderID, messageText);
        }
        
    }
  } else if (messageAttachments) {
    sendTextMessage(senderID, "Message with attachment received");
  }
}



// generic function sending messages
function sendMessage(recipientId, message) {  
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: process.env.PAGE_ACCESS_TOKEN | PAGE_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

/*
 * Send an image using the Send API.
 *
 */
function sendImageMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL + "/assets/rift.png"
        }
      }
    }
  };

  callSendAPI(messageData);
}


/*
 * Send a Gif using the Send API.
 *
 */
function sendGifMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "image",
        payload: {
          url: SERVER_URL + "/assets/instagram_logo.gif"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send audio using the Send API.
 *
 */
function sendAudioMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "audio",
        payload: {
          url: SERVER_URL + "/assets/sample.mp3"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a video using the Send API.
 *
 */
function sendVideoMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "video",
        payload: {
          url: SERVER_URL + "/assets/allofus480.mov"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a file using the Send API.
 *
 */
function sendFileMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "file",
        payload: {
          url: SERVER_URL + "/assets/test.txt"
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a text message using the Send API.
 *
 */
function sendTextMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: " chakri.com: " + messageText,
      metadata: "DEVELOPER_DEFINED_METADATA"
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a button message using the Send API.
 *
 */
function sendButtonMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "This is test text",
          buttons:[{
            type: "web_url",
            url: "https://www.oculus.com/en-us/rift/",
            title: "Open Web URL"
          }, {
            type: "postback",
            title: "Trigger Postback",
            payload: "DEVELOPER_DEFINED_PAYLOAD"
          }, {
            type: "phone_number",
            title: "Call Phone Number",
            payload: "+16505551234"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Send a Structured Message (Generic Message type) using the Send API.
 *
 */
function sendGenericMessage(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: SERVER_URL + "/assets/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: SERVER_URL + "/assets/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/*
 * Send a receipt message using the Send API.
 *
 */
function sendReceiptMessage(recipientId) {
  // Generate a random receipt ID as the API requires a unique ID
  var receiptId = "order" + Math.floor(Math.random()*1000);

  var messageData = {
    recipient: {
      id: recipientId
    },
    message:{
      attachment: {
        type: "template",
        payload: {
          template_type: "receipt",
          recipient_name: "Peter Chang",
          order_number: receiptId,
          currency: "USD",
          payment_method: "Visa 1234",        
          timestamp: "1428444852", 
          elements: [{
            title: "Oculus Rift",
            subtitle: "Includes: headset, sensor, remote",
            quantity: 1,
            price: 599.00,
            currency: "USD",
            image_url: SERVER_URL + "/assets/riftsq.png"
          }, {
            title: "Samsung Gear VR",
            subtitle: "Frost White",
            quantity: 1,
            price: 99.99,
            currency: "USD",
            image_url: SERVER_URL + "/assets/gearvrsq.png"
          }],
          address: {
            street_1: "1 Hacker Way",
            street_2: "",
            city: "Menlo Park",
            postal_code: "94025",
            state: "CA",
            country: "US"
          },
          summary: {
            subtotal: 698.99,
            shipping_cost: 20.00,
            total_tax: 57.67,
            total_cost: 626.66
          },
          adjustments: [{
            name: "New Customer Discount",
            amount: -50
          }, {
            name: "$100 Off Coupon",
            amount: -100
          }]
        }
      }
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a message with Quick Reply buttons.
 *
 */
function sendQuickReply(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: "What's your favorite movie genre?",
      quick_replies: [
        {
          "content_type":"text",
          "title":"Action",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_ACTION"
        },
        {
          "content_type":"text",
          "title":"Comedy",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_COMEDY"
        },
        {
          "content_type":"text",
          "title":"Drama",
          "payload":"DEVELOPER_DEFINED_PAYLOAD_FOR_PICKING_DRAMA"
        }
      ]
    }
  };

  callSendAPI(messageData);
}

/*
 * Send a read receipt to indicate the message has been read
 *
 */
function sendReadReceipt(recipientId) {
  console.log("Sending a read receipt to mark message as seen");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "mark_seen"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator on
 *
 */
function sendTypingOn(recipientId) {
  console.log("Turning typing indicator on");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_on"
  };

  callSendAPI(messageData);
}

/*
 * Turn typing indicator off
 *
 */
function sendTypingOff(recipientId) {
  console.log("Turning typing indicator off");

  var messageData = {
    recipient: {
      id: recipientId
    },
    sender_action: "typing_off"
  };

  callSendAPI(messageData);
}

/*
 * Send a message with the account linking call-to-action
 *
 */
function sendAccountLinking(recipientId) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "Welcome. Link your account.",
          buttons:[{
            type: "account_link",
            url: SERVER_URL + "/authorize"
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);
}

/**
*
*
*/

function sendJobNotification(phone_number)
{


   
   var messageData = {
    recipient: {
     // id: recipientId
     //"phone_number": "8801673615816"
     //"phone_number": "8801731867337"
     "phone_number" : phone_number
     //"phone_number" : "8801748152992"
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "Banking job",
            subtitle: "Assistant Professor, Banking and Insurance",
            item_url: "http://www.chakri.com/job/show/31495/Assistant-Professor-Banking-and-Insurance",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "http://www.chakri.com/job/show/31495/Assistant-Professor-Banking-and-Insurance",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "Education Sector",
            subtitle: "Lecturer, School of Law",
            item_url: "http://www.chakri.com/job/show/31468/Lecturer-School-of-Law",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "http://www.chakri.com/job/show/31468/Lecturer-School-of-Law",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };

	

	callSendAPI(messageData);

}








/*
 * Call the Send API. The message data goes in the body. If successful, we'll 
 * get the message id in a response 
 *
 */
function callSendAPI(messageData) {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: PAGE_ACCESS_TOKEN  },
    method: 'POST',
    json: messageData

  }, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      if (messageId) {
        console.log("Successfully sent message with id %s to recipient %s", 
          messageId, recipientId);
      } else {
      console.log("Successfully called Send API for recipient %s", 
        recipientId);
      }
    } else {
      console.error("Failed calling Send API", response.statusCode, response.statusMessage, body.error);
    }
  });  
}


// Start server at <port>
app.listen(port, (err) => {
    console.log(`Available at http://localhost:${port}`);
    if (err) {
        console.log(err);
    }
})