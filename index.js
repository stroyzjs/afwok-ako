const Discord = require("discord.js");
const discord = require("discord.js");
const db = require("quick.db");     
const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const client = new Discord.Client();       
const ayarlar = require("./ayarlar.js")    
const moment = require("moment");
require("moment-duration-format");
const fs = require("fs");
const ms = require("ms");
const os = require("os");
const chalk = require("chalk");
const { red } = require("chalk");
const { MessageButton } = require("discord-buttons");
const { duration } = require("moment");
require("discord-buttons")(client);                
require('./util/Loader.js')(client);     

//////////////////////////////////////////////////

var prefix = ayarlar.prefix;

///////////////////////////////////////
const log = message => {
    console.log(`${message}`);
};

//////////////////////////////////////////////////

/////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    log(`Toplamda ${files.length} Adet Komut Yüklenecek.`);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        log(`${props.help.name} Adlı Komut Başarıyla Yüklendi.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
//////////////////////////////////////////////////

//////////////////////////
client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};
//////////////////////////////////////////////////
client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};


///////---------------KOMUTLAR--------------\\\\\\\\\\

///////---------------SA-AS-------------\\\\\\\\\\\\\\\\\
client.on('message', async (msg, member, guild) => {
    let i = await  db.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'sa'){
            
          const sa = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setFooter(`${msg.author.tag} Selam Verdi.`, msg.author.avatarURL())
          .addField('Aleykum Selam Hoşgeldin İyi misin ?','İnşallah İyisindir')
            msg.channel.send(sa).then(a=>a.delete({timeout:10000}));
        }
        }
      });
  
  client.on('message', async (msg, member, guild) => {
    let i = await  db.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'hi'){
            
          msg.reply('**Hi welcome**').then(a=>a.delete({timeout:10000})); 
        }
        }
      });
  
  client.on('message', async (msg, member, guild) => {
    let i = await  db.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'sea'){
            
          const sea = new Discord.MessageEmbed()
          .setColor('BLUE')
          .setFooter(`${msg.author.tag} Selam Verdi.`, msg.author.avatarURL())
          .addField('Aleykum Selam Hoşgeldin İyi misin ?','İnşallah İyisindir.')
            msg.channel.send(sea).then(a=>a.delete({timeout:10000})); 
        }
        }
      });
  client.on('message', async (msg, member, guild) => {
    let i = await  db.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'iyiyim'){
            
          const iyilik = new Discord.MessageEmbed()
          .setColor('DARK_BLUE')
          .setFooter(`${msg.author.tag} İyi Olmana Sevindim.`, msg.author.avatarURL())
          .addField('Ohhh Ne Güzel!','Allah Dahada İyilik Versin.')
            msg.channel.send(iyilik).then(a=>a.delete({timeout:10000}));  
        }
        }
      });
  client.on('message', async (msg, member, guild) => {
    let i = await  db.fetch(`saas_${msg.guild.id}`)
        if(i === 'açık') {
          if (msg.content.toLowerCase() === 'kötüyüm'){
            
          const kötülük = new Discord.MessageEmbed()
          .setColor('DARK_BLUE')
          .setFooter(`${msg.author.tag} Kötü Olmana Üzüldüm.`, msg.author.avatarURL())
          .addField('Senin Adına Üzüldüm.','Allah İyilik Versin Patron. Seviliyorsun Unutma')
            msg.channel.send(kötülük).then(a=>a.delete({timeout:10000}));  
        }
        }
      });
  
  
  
  //-----------------------Sa-As Son-----------------------\\
  //-----------------------Sa-As Son-----------------------\\

//////////////////////////EKLEYİNCE MESAJ\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
client.on('guildCreate', guild => {
    const bilgiEmbed = new Discord.MessageEmbed()
        .setAuthor('Airlex Geldi !!') // başlık
        .setColor('AQUA') // renk
        .setDescription('**Beni Sunucuna Eklediğin İçin Çok Teşekkürler** \n \n ```Komutlarımı Görmek İçin a!yardım Yazman Yeterli```') // açıklama
        .setFooter('Airlex Hoşgeldin') // alt kısım
        .setImage('')// resim

    if (guild.me.hasPermission('MANAGE_CHANNELS')) {
        guild.channels.create(client.user.username, {
            type: 'text',
            topic: 'Beni eklediğin için Teşekkür ederim Beni Eklediğin İçin Pişman Olmicaksın :)',
            permissionOverwrites: [{ id: guild.id, deny: ['VIEW_CHANNEL'] }]
        }).then(c => {
            c.send(`**Prefixim __a!__ İyi Kullanımlar Dilerim :)**`, bilgiEmbed)
            setTimeout(() => {
                c.send('@everyone').then(m => m.delete({ timeout: 500 }))
            }, 3000)
        });
    };
});
/////////////////////EKLEYİNCE MESAJ SON\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

const küfür = ["abaza", "abazan", "ag", "a\u011fz\u0131na s\u0131\u00e7ay\u0131m", "ahmak", "allah", "allahs\u0131z", "am", "amar\u0131m", "ambiti", "am biti", "amc\u0131\u011f\u0131", "amc\u0131\u011f\u0131n", "amc\u0131\u011f\u0131n\u0131", "amc\u0131\u011f\u0131n\u0131z\u0131", "amc\u0131k", "amc\u0131k ho\u015faf\u0131", "amc\u0131klama", "amc\u0131kland\u0131", "amcik", "amck", "amckl", "amcklama", "amcklaryla", "amckta", "amcktan", "amcuk", "am\u0131k", "am\u0131na", "am\u0131nako", "am\u0131na koy", "am\u0131na koyar\u0131m", "am\u0131na koyay\u0131m", "am\u0131nakoyim", "am\u0131na koyyim", "am\u0131na s", "am\u0131na sikem", "am\u0131na sokam", "am\u0131n feryad\u0131", "am\u0131n\u0131", "am\u0131n\u0131 s", "am\u0131n oglu", "am\u0131no\u011flu", "am\u0131n o\u011flu", "am\u0131s\u0131na", "am\u0131s\u0131n\u0131", "amina", "amina g", "amina k", "aminako", "aminakoyarim", "amina koyarim", "amina koyay\u0131m", "amina koyayim", "aminakoyim", "aminda", "amindan", "amindayken", "amini", "aminiyarraaniskiim", "aminoglu", "amin oglu", "amiyum", "amk", "amkafa", "amk \u00e7ocu\u011fu", "amlarnzn", "aml\u0131", "amm", "ammak", "ammna", "amn", "amna", "amnda", "amndaki", "amngtn", "amnn", "amona", "amq", "ams\u0131z", "amsiz", "amsz", "amteri", "amugaa", "amu\u011fa", "amuna", "ana", "anaaann", "anal", "analarn", "anam", "anamla", "anan", "anana", "anandan", "anan\u0131", "anan\u0131", "anan\u0131n", "anan\u0131n am", "anan\u0131n am\u0131", "anan\u0131n d\u00f6l\u00fc", "anan\u0131nki", "anan\u0131sikerim", "anan\u0131 sikerim", "anan\u0131sikeyim", "anan\u0131 sikeyim", "anan\u0131z\u0131n", "anan\u0131z\u0131n am", "anani", "ananin", "ananisikerim", "anani sikerim", "ananisikeyim", "anani sikeyim", "anann", "ananz", "anas", "anas\u0131n\u0131", "anas\u0131n\u0131n am", "anas\u0131 orospu", "anasi", "anasinin", "anay", "anayin", "angut", "anneni", "annenin", "annesiz", "anuna", "aptal", "aq", "a.q", "a.q.", "aq.", "ass", "atkafas\u0131", "atm\u0131k", "att\u0131rd\u0131\u011f\u0131m", "attrrm", "auzlu", "avrat", "ayklarmalrmsikerim", "azd\u0131m", "azd\u0131r", "azd\u0131r\u0131c\u0131", "babaannesi ka\u015far", "baban\u0131", "baban\u0131n", "babani", "babas\u0131 pezevenk", "baca\u011f\u0131na s\u0131\u00e7ay\u0131m", "bac\u0131na", "bac\u0131n\u0131", "bac\u0131n\u0131n", "bacini", "bacn", "bacndan", "bacy", "bastard", "basur", "beyinsiz", "b\u0131z\u0131r", "bitch", "biting", "bok", "boka", "bokbok", "bok\u00e7a", "bokhu", "bokkkumu", "boklar", "boktan", "boku", "bokubokuna", "bokum", "bombok", "boner", "bosalmak", "bo\u015falmak", "cenabet", "cibiliyetsiz", "cibilliyetini", "cibilliyetsiz", "cif", "cikar", "cim", "\u00e7\u00fck", "dalaks\u0131z", "dallama", "daltassak", "dalyarak", "dalyarrak", "dangalak", "dassagi", "diktim", "dildo", "dingil", "dingilini", "dinsiz", "dkerim", "domal", "domalan", "domald\u0131", "domald\u0131n", "domal\u0131k", "domal\u0131yor", "domalmak", "domalm\u0131\u015f", "domals\u0131n", "domalt", "domaltarak", "domalt\u0131p", "domalt\u0131r", "domalt\u0131r\u0131m", "domaltip", "domaltmak", "d\u00f6l\u00fc", "d\u00f6nek", "d\u00fcd\u00fck", "eben", "ebeni", "ebenin", "ebeninki", "ebleh", "ecdad\u0131n\u0131", "ecdadini", "embesil", "emi", "fahise", "fahi\u015fe", "feri\u015ftah", "ferre", "fuck", "fucker", "fuckin", "fucking", "gavad", "gavat", "geber", "geberik", "gebermek", "gebermi\u015f", "gebertir", "ger\u0131zekal\u0131", "gerizekal\u0131", "gerizekali", "gerzek", "giberim", "giberler", "gibis", "gibi\u015f", "gibmek", "gibtiler", "goddamn", "godo\u015f", "godumun", "gotelek", "gotlalesi", "gotlu", "gotten", "gotundeki", "gotunden", "gotune", "gotunu", "gotveren", "goyiim", "goyum", "goyuyim", "goyyim", "g\u00f6t", "g\u00f6t deli\u011fi", "g\u00f6telek", "g\u00f6t herif", "g\u00f6tlalesi", "g\u00f6tlek", "g\u00f6to\u011flan\u0131", "g\u00f6t o\u011flan\u0131", "g\u00f6to\u015f", "g\u00f6tten", "g\u00f6t\u00fc", "g\u00f6t\u00fcn", "g\u00f6t\u00fcne", "g\u00f6t\u00fcnekoyim", "g\u00f6t\u00fcne koyim", "g\u00f6t\u00fcn\u00fc", "g\u00f6tveren", "g\u00f6t veren", "g\u00f6t verir", "gtelek", "gtn", "gtnde", "gtnden", "gtne", "gtten", "gtveren", "hasiktir", "hassikome", "hassiktir", "has siktir", "hassittir", "haysiyetsiz", "hayvan herif", "ho\u015faf\u0131", "h\u00f6d\u00fck", "hsktr", "huur", "\u0131bnel\u0131k", "ibina", "ibine", "ibinenin", "ibne", "ibnedir", "ibneleri", "ibnelik", "ibnelri", "ibneni", "ibnenin", "ibnerator", "ibnesi", "idiot", "idiyot", "imansz", "ipne", "iserim", "i\u015ferim", "ito\u011flu it", "kafam girsin", "kafas\u0131z", "kafasiz", "kahpe", "kahpenin", "kahpenin feryad\u0131", "kaka", "kaltak", "kanc\u0131k", "kancik", "kappe", "karhane", "ka\u015far", "kavat", "kavatn", "kaypak", "kayyum", "kerane", "kerhane", "kerhanelerde", "kevase", "keva\u015fe", "kevvase", "koca g\u00f6t", "kodu\u011fmun", "kodu\u011fmunun", "kodumun", "kodumunun", "koduumun", "koyarm", "koyay\u0131m", "koyiim", "koyiiym", "koyim", "koyum", "koyyim", "krar", "kukudaym", "laciye boyad\u0131m", "lavuk", "libo\u015f", "madafaka", "mal", "malafat", "malak", "manyak", "mcik", "meme", "memelerini", "mezveleli", "minaamc\u0131k", "mincikliyim", "mna", "monakkoluyum", "motherfucker", "mudik", "oc", "ocuu", "ocuun", "O\u00c7", "o\u00e7", "o. \u00e7ocu\u011fu", "o\u011flan", "o\u011flanc\u0131", "o\u011flu it", "orosbucocuu", "orospu", "orospucocugu", "orospu cocugu", "orospu \u00e7oc", "orospu\u00e7ocu\u011fu", "orospu \u00e7ocu\u011fu", "orospu \u00e7ocu\u011fudur", "orospu \u00e7ocuklar\u0131", "orospudur", "orospular", "orospunun", "orospunun evlad\u0131", "orospuydu", "orospuyuz", "orostoban", "orostopol", "orrospu", "oruspu", "oruspu\u00e7ocu\u011fu", "oruspu \u00e7ocu\u011fu", "osbir", "ossurduum", "ossurmak", "ossuruk", "osur", "osurduu", "osuruk", "osururum", "otuzbir", "\u00f6k\u00fcz", "\u00f6\u015fex", "patlak zar", "penis", "pezevek", "pezeven", "pezeveng", "pezevengi", "pezevengin evlad\u0131", "pezevenk", "pezo", "pic", "pici", "picler", "pi\u00e7", "pi\u00e7in o\u011flu", "pi\u00e7 kurusu", "pi\u00e7ler", "pipi", "pipi\u015f", "pisliktir", "porno", "pussy", "pu\u015ft", "pu\u015fttur", "rahminde", "revizyonist", "s1kerim", "s1kerm", "s1krm", "sakso", "saksofon", "salaak", "salak", "saxo", "sekis", "serefsiz", "sevgi koyar\u0131m", "sevi\u015felim", "sexs", "s\u0131\u00e7ar\u0131m", "s\u0131\u00e7t\u0131\u011f\u0131m", "s\u0131ecem", "sicarsin", "sie", "sik", "sikdi", "sikdi\u011fim", "sike", "sikecem", "sikem", "siken", "sikenin", "siker", "sikerim", "sikerler", "sikersin", "sikertir", "sikertmek", "sikesen", "sikesicenin", "sikey", "sikeydim", "sikeyim", "sikeym", "siki", "sikicem", "sikici", "sikien", "sikienler", "sikiiim", "sikiiimmm", "sikiim", "sikiir", "sikiirken", "sikik", "sikil", "sikildiini", "sikilesice", "sikilmi", "sikilmie", "sikilmis", "sikilmi\u015f", "sikilsin", "sikim", "sikimde", "sikimden", "sikime", "sikimi", "sikimiin", "sikimin", "sikimle", "sikimsonik", "sikimtrak", "sikin", "sikinde", "sikinden", "sikine", "sikini", "sikip", "sikis", "sikisek", "sikisen", "sikish", "sikismis", "siki\u015f", "siki\u015fen", "siki\u015fme", "sikitiin", "sikiyim", "sikiym", "sikiyorum", "sikkim", "sikko", "sikleri", "sikleriii", "sikli", "sikm", "sikmek", "sikmem", "sikmiler", "sikmisligim", "siksem", "sikseydin", "sikseyidin", "siksin", "siksinbaya", "siksinler", "siksiz", "siksok", "siksz", "sikt", "sikti", "siktigimin", "siktigiminin", "sikti\u011fim", "sikti\u011fimin", "sikti\u011fiminin", "siktii", "siktiim", "siktiimin", "siktiiminin", "siktiler", "siktim", "siktim", "siktimin", "siktiminin", "siktir", "siktir et", "siktirgit", "siktir git", "siktirir", "siktiririm", "siktiriyor", "siktir lan", "siktirolgit", "siktir ol git", "sittimin", "sittir", "skcem", "skecem", "skem", "sker", "skerim", "skerm", "skeyim", "skiim", "skik", "skim", "skime", "skmek", "sksin", "sksn", "sksz", "sktiimin", "sktrr", "skyim", "slaleni", "sokam", "sokar\u0131m", "sokarim", "sokarm", "sokarmkoduumun", "sokay\u0131m", "sokaym", "sokiim", "soktu\u011fumunun", "sokuk", "sokum", "soku\u015f", "sokuyum", "soxum", "sulaleni", "s\u00fclaleni", "s\u00fclalenizi", "s\u00fcrt\u00fck", "\u015ferefsiz", "\u015f\u0131ll\u0131k", "taaklarn", "taaklarna", "tarrakimin", "tasak", "tassak", "ta\u015fak", "ta\u015f\u015fak", "tipini s.k", "tipinizi s.keyim", "tiyniyat", "toplarm", "topsun", "toto\u015f", "vajina", "vajinan\u0131", "veled", "veledizina", "veled i zina", "verdiimin", "weled", "weledizina", "whore", "xikeyim", "yaaraaa", "yalama", "yalar\u0131m", "yalarun", "yaraaam", "yarak", "yaraks\u0131z", "yaraktr", "yaram", "yaraminbasi", "yaramn", "yararmorospunun", "yarra", "yarraaaa", "yarraak", "yarraam", "yarraam\u0131", "yarragi", "yarragimi", "yarragina", "yarragindan", "yarragm", "yarra\u011f", "yarra\u011f\u0131m", "yarra\u011f\u0131m\u0131", "yarraimin", "yarrak", "yarram", "yarramin", "yarraminba\u015f\u0131", "yarramn", "yarran", "yarrana", "yarrrak", "yavak", "yav\u015f", "yav\u015fak", "yav\u015fakt\u0131r", "yavu\u015fak", "y\u0131l\u0131\u015f\u0131k", "yilisik", "yogurtlayam", "yo\u011furtlayam", "yrrak", "z\u0131kk\u0131m\u0131m", "zibidi", "zigsin", "zikeyim", "zikiiim", "zikiim", "zikik", "zikim", "ziksiiin", "ziksiin", "zulliyetini", "zviyetini"];

client.on("messageUpdate", async (old, nev) => {

    if (old.content != nev.content) {
        let i = await db.fetch(`küfür.${nev.member.guild.id}.durum`);
        let y = await db.fetch(`küfür.${nev.member.guild.id}.kanal`);
        if (i) {

            if (küfür.some(word => nev.content.includes(word))) {
                if (nev.member.hasPermission("BAN_MEMBERS")) return;
                //if (ayarlar.gelistiriciler.includes(nev.author.id)) return ;
                const embed = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${nev.author} , **Ben varken küfürmü etmeye çalıştın?**`)
                    .addField("Küfür:", nev)

                nev.delete();
                const embeds = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${nev.author} , **Mesajı editle küfür etmekmi?**`)
                client.channels.cache.get(y).send(embed)
                nev.channel.send(embeds).then(msg => msg.delete({
                    timeout: 5000
                }));

            }
        } else {}
        if (!i) return;
    }
});

client.on("message", async msg => {


    if (msg.author.bot) return;
    if (msg.channel.type === "dm") return;
    let y = await db.fetch(`küfür.${msg.member.guild.id}.kanal`);

    let i = await db.fetch(`küfür.${msg.member.guild.id}.durum`);
    if (i) {
        if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
            try {
                if (!msg.member.hasPermission("MANAGE_GUILD")) {
                    //  if (!ayarlar.gelistiriciler.includes(msg.author.id)) return ;
                    msg.delete({
                        timeout: 750
                    });
                    const embeds = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`<@${msg.author.id}> , **Küfür etmeye çalıştı ama ben varken asla!**`)
                    msg.channel.send(embeds).then(msg => msg.delete({
                        timeout: 5000
                    }));
                    const embed = new Discord.MessageEmbed().setColor("#ff7e00").setDescription(`${msg.author} , **Küfür etmeye çalıştı ama ben varken asla!**`).addField("Mesajı:", msg)
                    client.channels.cache.get(y).send(embed)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }
    if (!i) return;
});


client.login(ayarlar.token)
