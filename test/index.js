let Eris = require('eris');
const { Moderaton } = require('..');
let Resolvers = require('../lib/Resolvers');

let client = new Eris.Client('ODI0MDA4MjU3NTE2MzM5MjMx.YFpHfQ.xSLyiIxuNrXzuYnzKsFfPnrm348');
let prefix = 'z!';

client.once('ready', () => {console.log('ready.')});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(prefix)) return;
    
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args?.shift()?.toLowerCase();

    if(cmd === 'test') {
        let user = Resolvers.getUser(args.join(' '), message, message.channel.guild, client);
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

        if(!c) return message.channel.createMessage('There is no channel as that name / id.')

        //if(!c) return message.channel.createMessage('There is no channel as that name / id.')

        message.channel.createMessage(`${c.id}`)
    } else if (cmd === 'testmem') {
        let member = Resolvers.getMember(message.channel.guild, message, args.join(' '));
        if(!member) return message.channel.createMessage('There is no user as that name or id.')
        let roles = [];

        for (let r of member.roles) {
            roles.push(`<@&${r}>`);
        }

        let embed = {
            description: `${roles.join(', ')}`
        }

        message.channel.createMessage({ embed: embed });
    } else if (cmd === 'ban') {
        if(!args.join(' ')) return console.log('no user.')
        let user = await Moderaton.ban(args, message.channel.guild, message);

        if(user) {
            return message.channel.createMessage(`Banned ${args[0]}`);
        }

        if(!user) return message.channel.createMessage('No user has been found as that id.');
        if(user === 'no') return message.channel.createMessage('no');

            if (user.code === 404) return message.channel.createMessage({
                embed: {
                    description: 'Could not ban.',
                    fields: [
                        { name: 'Reason', value: `${user.reason}` },
                        { name: 'Code', value: `${user.code}` }
                    ]
                }
            })
    } else if (cmd === 'kick') {
        if(!args.join(' ')) return console.log('no user.')
        let user = await Moderaton.kick(args, message.channel.guild, message);

        if(user) {
            return message.channel.createMessage(`Kicked ${args[0]}`);
        }

        if(!user) return message.channel.createMessage('No user has been found as that id.');
        if(user === 'no') return message.channel.createMessage('no');

            if (user.code === 404) return message.channel.createMessage({
                embed: {
                    description: 'Could not ban.',
                    fields: [
                        { name: 'Reason', value: `${user.reason}` },
                        { name: 'Code', value: `${user.code}` }
                    ]
                }
            })
    }
})

client.connect();