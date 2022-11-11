const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');
const guildLang = require('../util/Models/guildModel');
const generateRather = require('../util/generateRather');
module.exports = {
  data: {
    name: 'rather_useless',
    description: 'rather useless',
  },
  async execute(interaction, client) {
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { Rather } = await require(`../languages/${result.language}.json`);
        const { Useless_Powers } = await require(`../data/power-${result.language}.json`);
        if (!result.replay) return await interaction.reply({ ephemeral: true, content: Rather.replays.disabled })
        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Invite')
            .setStyle(5)
            .setEmoji('🤖')
            .setURL(
              'https://discord.com/oauth2/authorize?client_id=981649513427111957&permissions=274878294080&scope=bot%20applications.commands',
            ),
        );
        const newButton = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setLabel('Replay')
            .setStyle(1)
            .setEmoji('🔄')
            .setCustomId('rather_useless'),
        );
        let rbutton;
        if (Math.round(Math.random() * 15) < 3) {
          rbutton = [button, newButton];
        } else rbutton = [newButton];
        {
          let powers = await generateRather(result, Useless_Powers, "useless");
          let ratherembed = new EmbedBuilder()
            .setColor('#F00505')
            .addFields(
              {
                name: Rather.embed.uselessname,
                value: `> 1️⃣ ${powers.power1}`,
                inline: false,
              },
              {
                name: Rather.embed.uselessname2,
                value: `> 2️⃣ ${powers.power2}`,
                inline: false,
              },
            )
            .setFooter({
              text: `${Rather.embed.footer}`,
              iconURL: client.user.avatarURL(),
            })
            .setTimestamp();

          await interaction
            .reply({
              embeds: [ratherembed],
              components: rbutton,
              fetchReply: true,
            })
            .catch((err) => {
              return;
            });
        }
      });
  },
};
