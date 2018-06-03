const Discord = require ("discord.js");
const ytdl = require('ytdl-core');
const ms = require("ms");
const YouTube = require('simple-youtube-api');
const GOOGLE_API_KEY = "AIzaSyDUmo-BtB5oQr5Y3RSgYYBMj9rFKMr-W2s";
const prefix = "/";
const moment = require("moment");
const fs = require("fs");
const youtube = new YouTube(GOOGLE_API_KEY);
const queue = new Map();

var bot = new Discord.Client();
var servers = {};

let coins = require("./coins.json");
let xp = require("./xp.json");

bot.on("ready", function() {
    console.log("Ready");
    bot.user.setGame(`on ${bot.guilds.size} servers!`)
});
bot.on("message", async message => { 
    if(!coins[message.author.id]){
        coins[message.author.id] = {
          coins: 0
        };
      }
    
      let coinAmt = 1;
      let baseAmt = 1;
    
      if(coinAmt === baseAmt){
        coins[message.author.id] = {
          coins: coins[message.author.id].coins + coinAmt
        };
    }
      fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
        if (err) console.log(err)
      });
      console.log(message.author.username + ` + ${coinAmt}`);
    });
bot.on("message", async message => {
    let xpAdd = 1;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 100;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    message.channel.send(`:up: **${message.author.username}** a ajuns level **${curlvl + 1}**`);
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
});
bot.on("message", async message => {
if (message.author.bot) return undefined;
	if (!message.content.startsWith(prefix)) return undefined;

    const args = message.content.split(' ');
	const searchString = args.slice(1).join(' ');
	const url = args[1] ? args[1].replace(/<(.+)>/g, '$1') : '';
	const serverQueue = queue.get(message.guild.id);
    let messageArray = message.content.split(" ");
    let args2 = messageArray.slice(1);
    var args3 = message.content.substring(prefix.length).split(" ");

    switch (args3[0].toLowerCase()) {
      case "gay":  
        var E1 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Informatii: ", message.author.username + " este gay in proportie de " + r1[Math.floor(Math.random() * r1.length)])
        .setTimestamp();  
        message.channel.sendMessage(E1); 
            break;     
        case "play":
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel) {
            var E31 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E31);
        };;
        if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
                const video2 = await youtube.getVideoByID(video.id);  
                await handleVideo(video2, message, voiceChannel, true); 
            }
                var E31 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("✅ Playlist:", `**${playlist.title}** a fost adaugata in playlist`)
                .setTimestamp();
            return message.channel.send(E31);
        } else {
            try {
                var video = await youtube.getVideo(url);
            } catch (error) {
                try {
                    var videos = await youtube.searchVideos(searchString, 10);
                    let index = 0;
                    var E32 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Top 10 videoclipuri gasite:", `${videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n')}
Scire pe chat numarul corespunzator videoclipului pe care vrei sa il asculti `)
                .setTimestamp();
                    message.channel.send(E32);
                    try {
                        var response = await message.channel.awaitMessages(msg2 => msg2.content > 0 && msg2.content < 11, {
                            maxMatches: 1,
                            time: 100000,
                            errors: ['time']
                        });
                    } catch (err) {
                        console.error(err);
                        var E33 = new Discord.RichEmbed()
                        .setColor("#15f153")
                        .addField("Eroare", "Timpul a expiart sau nu ai pus un numar")
                        .setTimestamp();
                         return message.channel.send(E33);
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    var E34 = new Discord.RichEmbed()
                    .setColor("#15f153")
                    .addField("Eroare", "Mention owener")
                    .setTimestamp();
                return message.channel.send(E34);
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
            break;
        case "skip" :
        const voiceChannel2 = message.member.voiceChannel;
    if (!voiceChannel2) {
        var E31 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
        .setTimestamp();
    return message.channel.send(E31);
    };
    if (!serverQueue) return message.channel.send('There is nothing playing that I could skip for you.')
		serverQueue.connection.dispatcher.end('Skip command has been used!')
        return undefined;
            break;
        case "stop" :
        if (!message.member.voiceChannel) {
            var E38 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E38);
        }
        if (!serverQueue) {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Supreme nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E40);
        }
            serverQueue.songs = [];
        var server = servers[message.guild.id];
        if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
                var E39 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Supreme s-a deconectat",":x:")
            .setTimestamp();
            message.channel.sendMessage(E39);       
            break;
        case "volume" :
        if (!message.member.voiceChannel) {
            var E41 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Trebuie sa intri pe un Voice Channel ")
            .setTimestamp();
        return message.channel.send(E41);
        }
		if (!serverQueue) {
            var E42 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Supreme nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E42);
        }
        if (!args[1]) {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Volum:", `Volumul actiual este **${serverQueue.volume}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
		serverQueue.volume = args[1];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[1] / 5);
        {
            var E40 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Volum:", `Volumul a fost setat la **${args[1]}**`)
            .setTimestamp();
            return message.channel.send(E40);
        }
            break;
        case "now-playing" :
        if (!serverQueue) {
            var E44 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E44);
        }
            var E45 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Now playing:", `**${serverQueue.songs[0].title}**`);
            return message.channel.send(E45);
            break;
        case "playlist" :
        if (!serverQueue) {
            var E43 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Playlistul e gol")
            .setTimestamp();
            return message.channel.send(E43);
        }
        var E45 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("**Playlist:**", `${serverQueue.songs.map(song => `**-** ${song.title}`).join('\n')}
            
**Now playing:** ${serverQueue.songs[0].title}
                    `);
            return message.channel.send(E45);
            break;
        case "pause" :
        if (serverQueue && serverQueue.playing) {
			serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
                var E47 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Pause", ` ${serverQueue.songs[0].title} a fost pus pe pauza`)
                .setTimestamp();
                return message.channel.send(E47);
		}
            var E46 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Supreme nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E46);
            break;
        case "resume" :
        if (serverQueue && !serverQueue.playing) {
			serverQueue.playing = true;
			serverQueue.connection.dispatcher.resume();
            var E48 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Resume", `Se continua videoclipul ${serverQueue.songs[0].title}`)
                .setTimestamp();
                return message.channel.send(E48);
		}
        var E51 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Eroare", "Supreme nu este pe un Voice Channel")
            .setTimestamp();
            return message.channel.send(E51);
            break;
        case "help" :
             var E8 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("/help-music", '> detalii despre partea legata de muzica')
            .addField("/help-divertisment", '> detalii despre partea legata de divertisment')
            .addField("/help-admin", '> detalii despre partea legata de administatia serverului')
            .addField("Add Supreme on your server", '> https://discordapp.com/api/oauth2/authorize?client_id=452790973450420224&permissions=8&scope=bot')
            .setTimestamp();
            message.channel.sendMessage(E8);
            break;
        case "help-music" :
             var E9 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("/play ", '> Comanda pentru a asculta muzica')
            .addField("/skip", '> Comanda pentru a da skip la urmatoarea pesa din playlist')
            .addField("/stop", '> Comanda pentru a opri Muzica')
            .addField("/volume", '> Comanda pentru ajusta volumul botului muzica')
            .addField("/now-playing", '> Comanda pentru a vedea ce melodie se reda')
            .addField("/pause", '> Comanda pentru a pune pe pauza muzica')
            .addField("/resume", '> Comanda pentru a relua muzica')
            .setTimestamp();
            message.channel.sendMessage(E9);
            break;
        case "help-divertisment" : 
             var E10 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("/gay", '> Iti arata cat de gay esti')
            .addField("/emilut", '> Poze faine cu Emilut')
            .addField("/sexy", '> Iti arata cat de sexy estic') 
            .addField("/sanse", '> Iti arata ce sanse au doua obiecte') 
            .addField("/Supreme", '> Intraba-l pe Supreme ceva') 
            .addField("/xp", '> Iti arata xp-ul tau') 
            .addField("/bani", '> Iti arata bani tai') 
            .addField("/pay", '> Trimite bani unui user') 
            .addField("/avatar", '> Arata avatarul unui user') 
            .setTimestamp();
            message.channel.sendMessage(E10);
            break;
        case "help-admin" :
            var E18 = new Discord.RichEmbed()
           .setColor("#15f153")
           .addField("/report", '> raportaza un utilizator pentru un comportament neadecvat')
           .addField("/mute", '> interzice vorbirea unui utilizator')
           .setTimestamp();
           message.channel.sendMessage(E18);
           break;
        case "emilut" :
            return message.channel.send( r2[Math.floor(Math.random() * r2.length)] );
            break;
        case "meme":
            return message.channel.send( r3[Math.floor(Math.random() * r3.length)] );
            break;
        case "server-info":
            var E11 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Server creat la:", message.guild.createdAt)
            .addField("Ai intrat in **CristalVic** la:", message.member.joinedAt)
            .addField("Total membrii:", message.guild.memberCount)
            .setTimestamp();
            message.channel.sendMessage(E11);
            break;
        case "report":
            let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args2[0]));
            if(!rUser) {
                var E19 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Model", "%report <Mention Utilizaotr> + <Motiv>")
                .setTimestamp();
            return message.channel.send(E19);
            };
            let reason = args2.join(" ").slice(22);
            if(!reason) {
                var E20 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Model", "%report <Mention Utilizaotr> + <Motiv>")
                .setTimestamp();
            return message.channel.send(E20);
            };

            var E12 = new Discord.RichEmbed()
            .setDescription(`Report-Info`)
            .setColor("#15f153")
            .addField("Utilizator raportat:", `${rUser}`)
            .addField("Raportat de:", `${message.author}`)
            .addField("Pe Channel-ul:", message.channel)
            .addField("Raportat la:", message.createdAt)
            .addField("Raportat pentru:", reason)
            .setTimestamp();

            let reportchannel = message.guild.channels.find(`name`, "reporturi");
            if(!reportchannel) {
                var E21 = new Discord.RichEmbed()
                .setColor("#15f153")
                .addField("Erroare", "Nu exista accest channel , creeaza `#reporturi`")
                .setTimestamp();
                 return message.channel.send(E21)
            };

            let E13 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField(`Utilizatorul a fost raportat cu succes `, `:white_check_mark:`)
            .setTimestamp();
            message.channel.send(E13);
            reportchannel.send(E12);
            break;
        case "sanse":
        let obiect1 = args[1];
        if(!obiect1) {
            var E14 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Model", "%sanse <Obiect1> + <Obiect2>")
            .setTimestamp();
            return message.channel.sendMessage(E14); 
        };
        let obiect2 = args[2];
        if(!obiect2) {
        var E15 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Model", "%sanse <Obiect1> + <Obiect2>")
            .setTimestamp();
            return message.channel.sendMessage(E15); 
        };

        var E16 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Sanse", `${obiect1}` + " + " + `${obiect2}` + " se potrivesc in poportie de " + r1[Math.floor(Math.random() * r1.length)])
            .setTimestamp();
            message.channel.sendMessage(E16); 
            break;
        case "sexy":  
            var E17 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Sanse", message.author + " este sexy in proportie de " + r1[Math.floor(Math.random() * r1.length)])
            .setTimestamp();
            message.channel.sendMessage(E17); 
            break;     
        case "mute": 
        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
            var E28 = new Discord.RichEmbed()
            .setColor("#15f153")
            .addField("Erroare", "Nu ai permisiunea")
            .setTimestamp();
        return message.channel.send(E28);
        };
        let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args2[0]));
        if(!tomute) {
        var E22 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Model", "%mute <Mention Utilizator> + <Durata> + <Motiv>")
        .setTimestamp();
        return message.channel.send(E22);
        };
        if(tomute.hasPermission("MANAGE_MESSAGES")) {
        var E25 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Erroare", "Nu poti da mute acestui utilizator")
        .setTimestamp();
        return message.channel.send(E25);
        };
        let reason2 = args2.slice(3).join(" ");
        if(!reason2) {
        var E23 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Model", "%mute <Mention Utilizator> + <Durata> + <Motiv>")
        .setTimestamp();
        return message.channel.send(E23);
        }; 
        let muterole = message.guild.roles.find(`name`, "muted");
        if(!muterole){
          try{
            muterole = await message.guild.createRole({
              name: "muted",
              color: "#FF0000",
              permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false
              });
            });
          }catch(e){
            console.log(e.stack);
          }
        }
        let mutetime = args2[2];
        if(!mutetime) {
        var E24 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Model", "%mute <Mention Utilizator> + <Durata> + <Motiv>")
        .setTimestamp();
        return message.channel.send(E24);
        };
        
        await(tomute.addRole(muterole.id));
        
        var E26 = new Discord.RichEmbed()
        .setDescription(`Mute Info`)
        .setColor("#15f153")
        .addField("Utilizator sanctionat:", tomute.user.username)
        .addField("Sanctionat de", message.author.username)
        .addField("Pe channelul:", message.channel)
        .addField("Durata muteului", mutetime)
        .addField("Motiv:", reason2)
        .setTimestamp();
        
        var E27 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField(`Utilizatorul ${tomute.user.username} a fost sanctionat cu succes `, "Mai multe detalii pe `#sancituni`")
        .setTimestamp();
        message.channel.send(E27);
        
        let incidentschannel = message.guild.channels.find(`name`, "sanctiuni");
        if(!incidentschannel) {
        var E30 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Erroare", "Nu exista accest channel , creeaza `#sanctiuni`")
        .setTimestamp();
         return message.channel.send(E30)
        };
        incidentschannel.send(E26);
        
        
        setTimeout(function(){
          tomute.removeRole(muterole.id);
        var E29 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Mute Info", `Lui ${tomute.user.username} i-a exprat pedeapsa`)
        .setTimestamp();
        message.channel.send(E29);
        }, ms(mutetime)); 
            break;      
            case "CristalVic" :
            let reason3 = args2.slice(1).join(" ");
    var E1 = new Discord.RichEmbed()
    .setColor("#15f153")
    .addField("Intrebarea lui " + message.author.username, `${reason3}`)
    .addField('Raspunsul lui CristalVic:', r4[Math.floor(Math.random() * r4.length)])
    .setTimestamp()
    message.channel.sendMessage(E1); 
            break;
            case "bani" :
            if(!coins[message.author.id]){
                coins[message.author.id] = {
                  coins: 0
                };
              }
            
              let uCoins = coins[message.author.id].coins;
            
            
              let coinEmbed = new Discord.RichEmbed()
              .setColor("#15f153")
              .addField(message.author.username , uCoins + " bani" )
              message.channel.send(coinEmbed);
            break;
            case "pay" :
            if(!coins[message.author.id]){
                return message.channel.sendMessage(`${message.author.username} NU ai desui bani`)
              }
            
              let pUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[2]);
            
              if(!coins[pUser.id]){
                coins[pUser.id] = {
                  coins: 0
                };
              }
            
              let pCoins = coins[pUser.id].coins;
              let sCoins = coins[message.author.id].coins;
             if(pCoins === sCoins) return message.channel.sendMessage(`${message.author.username} NU iti poti da bani singur`)
              if(sCoins < args[3]) return message.reply("Not enough coins there!");
            
              coins[message.author.id] = {
                coins: sCoins - parseInt(args[3])
              };
            
              coins[pUser.id] = {
                coins: pCoins + parseInt(args[3])
              };
            
              message.channel.send(`${message.author.username} i-a dat lui ${pUser} ${args[3]} bani`);
              pUser.message(`Ai primit ${args[3]} bani de le ${message.author.username}`)
            
              fs.writeFile("./coins.json", JSON.stringify(coins), (err) => {
                if(err) cosole.log(err)
              });
            break;
            case "xp" :
            if(!xp[message.author.id]){
                xp[message.author.id] = {
                  xp: 0,
                  level: 1
               };
             }
               let curxp = xp[message.author.id].xp;
               let curlvl = xp[message.author.id].level;
               let nxtLvlXp = curlvl * 100;
               let difference = nxtLvlXp - curxp;
             
               let lvlEmbed = new Discord.RichEmbed()
               .setAuthor(message.author.username , message.author.avatarURL)
               .setColor("#15f153")
               .addField("Level", curlvl, true)
               .addField("XP", curxp, true)
               .setFooter(`Mai ai nevoie de ${difference} XP pentru level UP`);   
               message.channel.send(lvlEmbed);
            break;
            case "avatar" :
            let pAvatar = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[1]);
            var E52 = new Discord.RichEmbed()
        .setColor("#15f153")
        .setImage(pAvatar.user.avatarURL)
        .setTimestamp();
        message.channel.sendMessage(E52); 
            break;
        default:
        var T = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Comanda invalida",'Incearca %help')
        message.channel.sendMessage(T); 
    }
});

var  r1 = [
    "0%",
    "1%",
    "2%",
    "3%",
    "4%",
    "5%",
    "6%",
    "7%",
    "8%",
    "9%",
    "10%",
    "11%",
    "12%",
    "13%",
    "14%",
    "15%",
    "16%",
    "17%",
    "18%",
    "19%",
    "20%",
    "21%",
    "22%",
    "23%",
    "24%",
    "25%",
    "26%",
    "27%",
    "28%",
    "29%",
    "30%",
    "31%",
    "32%",
    "33%",
    "34%",
    "35%",
    "36%",
    "37%",
    "38%",
    "39%",
    "40%",
    "41%",
    "42%",
    "43%",
    "44%",
    "45%",
    "46%",
    "47%",
    "48%",
    "49%",
    "50%",
    "51%",
    "52%",
    "53%",
    "54%",
    "55%",
    "56%",
    "57%",
    "58%",
    "59%",
    "60%",
    "61%",
    "62%",
    "63%",
    "64%",
    "65%",
    "66%",
    "67%",
    "68%",
    "69%",
    "70%",
    "71%",
    "72%",
    "73%",
    "74%",
    "75%",
    "76%",
    "77%",
    "78%",
    "79%",
    "80%",
    "81%",
    "82%",
    "83%",
    "84%",
    "85%",
    "86%",
    "87%",
    "88%",
    "89%",
    "90%",
    "91%",
    "92%",
    "93%",
    "94%",
    "95%",
    "96%",
    "97%",
    "98%",
    "99%",
    "100%"
  ]
var  r2 = [
  "https://imgur.com/a/3xIG8",
  "https://imgur.com/a/pjZro",
  "https://imgur.com/a/sY3aE",
  "https://imgur.com/a/QRjLf"
]
var r3 = [
   "https://imgur.com/vmpzDtf",
   "https://imgur.com/7tC1MM6",
   "https://imgur.com/XiWmj56",
   "https://imgur.com/pCxvnl8",
   "https://imgur.com/FYno1Lp",
   "https://imgur.com/CWeeruD",
   "https://imgur.com/dMO3Kdw",
   "https://imgur.com/LaQ9waz",
   "https://imgur.com/q2jrVlA",
   "https://imgur.com/kxqyOOS",
   "https://imgur.com/KKGF50i",
   "https://imgur.com/K2nBM1h",
   "https://imgur.com/TRAN6hf",
   "https://imgur.com/h8Ek4TR",
   "https://imgur.com/hWRsL29",
   "https://imgur.com/20js0PC",
   "https://imgur.com/7F7cfgP",
   "https://imgur.com/452j4UZ"
]

var  r4 = [
    "Da",
    "Nu",
    "Nu stiu",
    "Idk"
  ]
  
async function handleVideo(video, msg, voiceChannel, playlist = false) {
	const serverQueue = queue.get(msg.guild.id);
	console.log(video);
	const song = {
		id: video.id,
		title: Discord.escapeMarkdown(video.title),
		url: `https://www.youtube.com/watch?v=${video.id}`
	};
	if (!serverQueue) {
		const queueConstruct = {
			textChannel: msg.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true
		};
		queue.set(msg.guild.id, queueConstruct);

		queueConstruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueConstruct.connection = connection;
			play(msg.guild, queueConstruct.songs[0]);
		} catch (error) {
			console.error(`I could not join the voice channel: ${error}`);
			queue.delete(msg.guild.id);
			return msg.channel.send(`I could not join the voice channel: ${error}`);
		}
	} else {
		serverQueue.songs.push(song);
		console.log(serverQueue.songs);
		if (playlist) return undefined;
        else  {
        var E35 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField(":white_check_mark: Playlist:", `**${song.title}** a fost adougata in playlist`)
        .setTimestamp();
         return msg.channel.send(E35)
        }
	}
	return undefined;
}

function play(guild, song , message , channel) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		return;
	}
	console.log(serverQueue.songs);

	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
		.on('end', reason => {
			if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
			else console.log(reason);
			serverQueue.songs.shift();
			play(guild, serverQueue.songs[0]);
		})
		.on('error', error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    
        var E50 = new Discord.RichEmbed()
        .setColor("#15f153")
        .addField("Now Playing", `**${song.title}** `)
        .setTimestamp();
        serverQueue.textChannel.send(E50)
    }
bot.login(process.env.BOT_TOKEN);
