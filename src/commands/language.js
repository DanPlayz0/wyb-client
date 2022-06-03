const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const guildLang = require("../util/Models/guildModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("language")
    .setDescription("Change the language for the current guild")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("english")
        .setDescription("Set the language to english")
    )
    .addSubcommand((subcommand, client) =>
      subcommand.setName("german").setDescription("Set the language to english")
    ),

  async execute(interaction) {
    guildLang
    .findOne({ guildID: interaction.guild.id })
    .then(async (result) => {
       const { Language } = require(`../languages/${result.language}.json`);

        if (
          interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)
        ) {
          switch (interaction.options.getSubcommand()) {
            case "english": {
              guildLang
                .findOne({ guildID: interaction.guild.id })
                .then(async () => {
                  await guildLang.findOneAndUpdate({
                    language: "en_EN",
                  });
                });
              var languageembed = new MessageEmbed()
              .setAuthor({
                name: `${client.user.username}`,
                iconURL: client.user.avatarURL(),
              })
                .setTitle("Language changed!")
                .setDescription("English has been selected as the language!")
                .setFooter({ text: "A Developers Dungeon Studios bot" });
              break;
            }

            case "german": {
              guildLang
                .findOne({ guildID: interaction.guild.id })
                .then(async () => {
                  await guildLang.findOneAndUpdate({
                    language: "de_DE",
                  });
                });
              var languageembed = new MessageEmbed()
              .setAuthor({
                name: `${client.user.username}`,
                iconURL: client.user.avatarURL(),
              })
                .setTitle("Sprache bearbeitet!")
                .setDescription("Deutsch wurde als Sprache ausgewählt!")
                .setFooter({ text: "Ein Developers Dungeon Studios bot" });
            }
          }
          await interaction.reply({
            embeds: [languageembed],
            ephemeral: true,
          });
        } else {
          var errorembed = new MessageEmbed()
          .setColor("RED")
            .setTitle("Error!")
            .setDescription(Language.embed.error);
          await interaction.reply({
            embeds: [errorembed],
            ephemeral: true,
          });
        }
      });
  },
};
