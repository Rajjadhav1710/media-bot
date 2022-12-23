require("dotenv").config();
const { Telegraf } = require("telegraf");

const bot = new Telegraf(process.env.BOT_ACCESS_TOKEN);

bot.start((ctx)=>{
    ctx.reply("Welcome To Media Bot")
});

bot.command("nature",(ctx)=>{
    //chat action (sendChatAction):typing...
    ctx.sendChatAction("upload_photo");
    // ctx.telegram.sendPhoto(ctx.chat.id,{source:__dirname+"/res/nature2.jpg"});
    //we can also pass some extra parameters
    ctx.telegram.sendPhoto(ctx.chat.id,{source:__dirname+"/res/nature2.jpg"},{reply_to_message_id:ctx.message.message_id});
});

bot.command("adventure",(ctx)=>{
    ctx.sendChatAction("upload_video");
    ctx.telegram.sendVideo(ctx.chat.id,{source:__dirname+"/res/nature1.MP4"},{reply_to_message_id:ctx.message.message_id});
    //for gif use sendAnimation
});

bot.command("profile",(ctx)=>{
    ctx.sendChatAction("upload_photo");
    ctx.telegram.sendPhoto(ctx.chat.id,"https://lh3.googleusercontent.com/ogw/AOh-ky1Jev51V2jJ9ltR0T9qlVliAc5wMkk-8VwhTPhlTOY=s64-c-mo",{reply_to_message_id:ctx.message.message_id});
});

//another method is to use file id, whenever we send file on telegram it generates unique file id for each file
//fastest way to send via file id
bot.command("kailash",(ctx)=>{
    // ctx.sendChatAction("upload_photo"); shortcut
    ctx.telegram.sendChatAction(ctx.chat.id,"upload_photo");
    ctx.telegram.sendDocument(ctx.chat.id,"BQACAgUAAxkBAAMjY0ZouPdstgHuqpc4TFaHjFQbwsQAAqcJAALXGDFWmgI_A3G8uc8qBA",{reply_to_message_id:ctx.message.message_id});
});

// bot.on("message",(ctx)=>{
//     console.log(ctx.update.message.document.file_id);
//     console.log("hi");
// });

//send set of media
bot.command("images",(ctx)=>{
    // ctx.sendChatAction("upload_photo"); shortcut
    ctx.telegram.sendChatAction(ctx.chat.id,"upload_photo");
    ctx.telegram.sendMediaGroup(ctx.chat.id,[
    {
        type:"photo",
        media:{
            source:__dirname+"/res/MyName.png" //file id or url or server file
        }
    },
    {
        type:"photo",
        media:{
            source:__dirname+"/res/nature2.jpg" //file id or url or server file
        }
    },
    {
        type:"photo",
        media:{
            source:__dirname+"/res/me.jpg" //file id or url or server file
        }
    },
    {
        type:"video",
        media:{
            source:__dirname+"/res/nature1.mp4" //file id or url or server file
        }
    }
    ],{reply_to_message_id:ctx.message.message_id});
});

//send location
bot.command("home",(ctx)=>{
    ctx.telegram.sendLocation(ctx.chat.id,22.243705,73.200124);
});
bot.launch();