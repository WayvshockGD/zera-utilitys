let Eris = require('eris');
let Resolvers = require('../lib/Resolvers');

let client = new Eris.Client('ODI0MDA4MjU3NTE2MzM5MjMx.YFpHfQ.xSLyiIxuNrXzuYnzKsFfPnrm348');
let prefix = 'z!';

client.once('ready', () => {console.log('ready.')});

client.on('messageCreate', (message) => {
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args?.shift()?.toLowerCase();

    if(cmd === 'test') {
        let user = Resolvers.getUser(args[0], message, message.channel.guild);
        if(!user) return message.channel.createMessage('That user was not found.');

        message.channel.createMessage({
            embed: {
                image: { url: user.dynamicAvatarURL('png', 256) }
            }
        });
        //console.log(user.discriminator);
    } else if (cmd === 'testchannel') {
        if(!args[0]) return message.channel.createMessage('Please a mention a channel or a id of the channel.')
        let c = Resolvers.getChannel(args[0], message.channel.guild);

        if(c === undefined) return message.channel.createMessage('There is no channel as that name / id.')

        //if(!c) return message.channel.createMessage('There is no channel as that name / id.')

        message.channel.createMessage(`${c.id}`)
    }
})

client.connect();