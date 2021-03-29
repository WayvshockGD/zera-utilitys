let Eris = require('eris');

class Resolvers {

    /**
     * @param {Eris.Client} client The client object.
     * @param {Eris.Guild} guild The guild object by eris.
     * @param {Eris.Message} message The message Object. 
     * @param {string} args The argument that will be used.
     * @returns {Eris.User}
     */
    getUser(args, message, guild, client) {
        let user;
        if(!args) return message.author;
        let arg = args.replace('<', '').replace('>', '').replace('#', '').replace('!', '').replace('@', '');

        let regex = /^([0-9]+)$/g.test(arg);

        if (regex === false) {
        let u = client.guilds.map(g => g.searchMembers(args, 1));
            user = guild.members.find(u => u.username === arg);
            console.log(u.join(', '));
            if(user === undefined) return false;
        } else if (regex === true) {
            user = guild.members.find(u => u.id === arg);
            if(user === undefined) return false;
        }

        //console.log(user.avatarURL);

        return user.user;
    }

        /**
     * @param {Eris.Guild} guild The guild object by eris.
     * @param {Eris.Message} message The message Object. 
     * @param {string} args The argument that will be used.
     * @param {boolean} getMessageAuthor [true=returns message author|false=does not return message author]
     * @returns {Eris.Member}
     */
    getMember(guild, message, args, getMessageAuthor) {
        let member;
        if (getMessageAuthor === true) {
            if(!args) return message.member;
        }
        let arg = args.replace('<', '').replace('>', '').replace('#', '').replace('!', '').replace('@', '');

        let regex = /^([0-9]+)$/g.test(arg);

        if (regex === false) {
            member = guild.members.find(u => u.username === arg);
            if(member === undefined) return false;
        } else if (regex === true) {
            member = guild.members.find(u => u.id === arg);
            if(member === undefined) return false;
        }

        return member;
    }

    /**
     * @param {Eris.Guild} guild The guild object by eris.
     * @param {string} args The argument that will be used.
     */
    getChannel(args, guild) {
        let channel;
        let arg = args.replace('<', '').replace('>', '').replace('#', '').replace('!', '').replace('@', '');
        let regex = /^([0-9]+)$/g.test(arg)

        if (regex === false) {
            channel = guild.channels.find(c => c.name === arg);
        } else if (regex === true) {
            channel = guild.channels.find(c => c.id === arg);
        }


        //console.log(channel.topic);
        //console.log(arg);
        if(channel === undefined) return false;
        return channel;
    }
}

module.exports = new Resolvers();