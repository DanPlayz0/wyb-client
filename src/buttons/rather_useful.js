const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
} = require('discord.js');
const guildLang = require('../util/Models/guildModel');

module.exports = {
  data: {
    name: 'rather_useful',
    description: 'rather useful',
  },
  async execute(interaction, client) {
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { Rather } = await require(`../languages/${result.language}.json`);
        const { Useful_Powers } = await require(`../data/power-${result.language}.json`);
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
            .setCustomId('rather_useful'),
        );
        let rbutton;
        if (Math.round(Math.random() * 15) < 3) {
          rbutton = [button, newButton];
        } else rbutton = [newButton];
        {

          let usefulpower1;
          let usefulpower2;
          if (result.customTypes === "regular") {
            usefulpower1 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
            usefulpower2 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
          } else if (result.customTypes === "mixed") {
            if (result.customMessages.filter(c => c.type === "useful") != 0) {
              usefulpower1 = result.customMessages.filter(c => c.type === "useful")[Math.floor(Math.random() * result.customMessages.filter(c => c.type === "useful").length)].msg || Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
            } else {
              usefulpower1 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
              usefulpower2 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
            }
            usefulpower2 = Useful_Powers[Math.floor(Math.random() * Useful_Powers.length)];
          } else if (result.customTypes === "custom") {
            if (result.customMessages.filter(c => c.type === "useful") == 0) return await interaction.reply({ ephemeral: true, content: "There's currently no custom WouldYou messages to be displayed! Either make some or change the type using \`/wytype <type>\`" })
            usefulpower1 = result.customMessages.filter(c => c.type === "useful")[Math.floor(Math.random() * result.customMessages.filter(c => c.type === "useful").length)].msg;
            usefulpower2 = result.customMessages.filter(c => c.type === "useful")[Math.floor(Math.random() * result.customMessages.filter(c => c.type === "useful").length)].msg;
          }

          let ratherembed = new EmbedBuilder()
            .setColor('#0598F6')
            .addFields(
              {
                name: Rather.embed.usefulname,
                value: `> 1️⃣ ${usefulpower1}`,
                inline: false,
              },
              {
                name: Rather.embed.usefulname2,
                value: `> 2️⃣ ${usefulpower2}`,
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
