const Eris = require("eris");

class Moderation {

    /**
     * @param {string} args 
     * @param {Eris.Guild} guild
     * @param {Eris.Message} message
     * @description Returns a 404(number) if the bot cannot ban.
     */
    async ban(args, guild, message) {

        let argument = args[0].replace('<', '').replace('>', '').replace('#', '').replace('!', '').replace('@', '');

        let regex = /^([0-9]+)$/g.test(argument);

        if(regex === true) {
            var user = guild.members.find(u => u.id === argument);
            if (user === undefined) return false;
            if (user.id === message.author.id) return 'no';
        } else if (regex === false) {
            return false;
        } 

        try {
            await user.ban(7, `Banned ${user.username} - Moderator: ${message.author.username}`);
            return true;
        } catch (error) {
            console.log(`There was an error at banning a user.\n${error}`);
            return { code: 404, reason: error };
        }
    }

        /**
     * @param {string} args 
     * @param {Eris.Guild} guild
     * @param {Eris.Message} message
     * @description Returns a 404(number) if the bot cannot ban.
     */
         async kick(args, guild, message) {

            let argument = args[0].replace('<', '').replace('>', '').replace('#', '').replace('!', '').replace('@', '');
    
            let regex = /^([0-9]+)$/g.test(argument);
    
            if(regex === true) {
                var user = guild.members.find(u => u.id === argument);
                if (user === undefined) return false;
                if (user.id === message.author.id) return 'no';
            } else if (regex === false) {
                return false;
            } 
    
            try {
                await user.kick(`Kicked ${user.username} - Moderator: ${message.author.username}`);
                return true;
            } catch (error) {
                console.log(`There was an error at kicking a user.\n${error}`);
                return { code: 404, reason: error };
            }
        }
}

module.exports = new Moderation();