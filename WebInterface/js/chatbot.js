window.chatroom = new window.Chatroom({
    host: "http://localhost:5052",
    container: document.querySelector(".chat-container"),
    welcomeMessage: "Hi, I am SUE. How may I help you?",
    speechRecognition: "en-UK"
});
window.chatroom.openChat();

// Send messages directly to chat, without going through the Rasa AI
function sendUpdateToChat(type, id, name, videoProportion, audioProportion) {
    let messages = window.chatroom.ref.state.messages;
    let botId = messages[0].uuid;
    let now = new Date();

		let discoveredMsg = {
        "message": {
            "type": "text",
            "text": "Discovered New " + type + ": " + name
        },
        "time": now.getTime(),
        "username": "bot",
        "uuid": botId
    };

    let descriptionMsg = {
        "message": {
            "type": "text",
            "text": "Relevance of modalities in this explanation:"
        },
        "time": now.getTime(),
        "username": "bot",
        "uuid": botId
    };

    let descriptionMsgVideo = {
        "message": {
            "type": "text",
            "text": "Video: " + videoProportion + "%"
        },
        "time": now.getTime(),
        "username": "bot",
        "uuid": botId
    };

    let descriptionMsgAudio = {
        "message": {
            "type": "text",
            "text": "Audio: "  + audioProportion + "%"
        },
        "time": now.getTime(),
        "username": "bot",
        "uuid": botId
    };

    let buttonMsg = {
        "message":{
            "type":"button",
            "buttons":[{
                "title":"Explain",
                "payload":"show" + type.replace(/\s+/g, '') + "Media-" + id
            },{
                "title":"Open event",
                "payload":"open" + type.replace(/\s+/g, '') + "Details-" + id
            }
          ]
        },
        "time": now.getTime(),
        "username": "bot",
        "uuid": botId
    };

    window.chatroom.ref.state.messageQueue.push(discoveredMsg);
    window.chatroom.ref.state.messageQueue.push(descriptionMsg);
    window.chatroom.ref.state.messageQueue.push(descriptionMsgVideo);
    window.chatroom.ref.state.messageQueue.push(descriptionMsgAudio);
    window.chatroom.ref.state.messageQueue.push(buttonMsg);
};


async function showEventMedia(id) {
  let messages = window.chatroom.ref.state.messages;
  let botId = messages[0].uuid;
  let now = new Date();

  let ids = [parseInt(id)];
  let events = await findEvents(ids);
  let thisEvent = JSON.parse(events[0].options.properties)
  let keys = Object.keys(thisEvent)

  let image = thisEvent[keys[0]].detImage;
  let audio = thisEvent[keys[0]].detAudio;

  let imageMsg = {
      "message":{
          "type":"image",
          "image": "http://localhost:8000/video/" + image
      },
      "time": now.getTime(),
      "username": "bot",
      "uuid": botId
  };

  let audioMsg = {
      "message":{
          "type":"text",
          "text": "http://localhost:8000/audio/" + audio
      },
      "time": now.getTime(),
      "username": "bot",
      "uuid": botId
  };


  window.chatroom.ref.state.messageQueue.push(imageMsg);
  window.chatroom.ref.state.messageQueue.push(audioMsg);
};
