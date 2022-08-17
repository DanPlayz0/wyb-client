const { CommandInteraction, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const guildLang = require("../util/Models/guildModel.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("custom")
    .setDescription("custom")
    .addStringOption((option) => option.setName("custom").setDescription("Custom what would you do.").setRequired(true)),

  /**
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    let wouldyouembed;
    guildLang
      .findOne({ guildID: interaction.guild.id })
      .then(async (result) => {
        const { WouldYou } =
          await require(`../languages/${result.language}.json`);
        const { Useless_Superpowers, Useful_Superpowers } =
          await require(`../data/superpower-${result.language}.json`);

          wouldyouembed = new EmbedBuilder()
          .setTitle("Would you want this superpower?")
          .setDescription(`> ${interaction.options.get("custom").value}`)
          .setColor("#0598F6")
          .setFooter({ text: `${WouldYou.embed.footer}` })
          .setTimestamp()
        //   .setDescription(`Would you ${interaction.options.get("custom").value}?`);
        //   .addFields({
        //     name: WouldYou.embed.Usefulname,
        //     value: `> ${superpower}`,
        //     inline: false,
        //   });
        try  {
        const message = await interaction.reply({
          embeds: [wouldyouembed],
          fetchReply: true,
        });

        try {
          await message.react("✅");
          await message.react("❌");
        //   const filter = (reaction) => {
        //     return reaction.emoji.name == "✅" || reaction.emoji.name == "❌";
        //   };

        //   const collector = message.createReactionCollector({filter, time: 20000});
        //   collector.on("collect", async () => {
        //   });

        //   collector.on("end", async () => {

        //     let totalreactions = message.reactions.cache.get('✅').count -1 + message.reactions.cache.get('❌').count - 1;
        //     let percentage = Math.round(((message.reactions.cache.get('✅').count - 1) / (totalreactions)) * 100)
        //     let emoji = null;
        //     let color = null;
        //     let userstotal = (totalreactions < 2) ? `${WouldYou.stats.user}` : `${WouldYou.stats.users}`;


        //     if (message.reactions.cache.get('✅').count -1 + message.reactions.cache.get('❌').count - 1 == 0) {
        //       percentage = 0;
        //       emoji = "🤷";
        //       color = "#F0F0F0";
        //     }

        //     if(percentage > 50) {
        //       color = "#0598F6"
        //       emoji = '✅'
        //     } else if(percentage < 50) {
        //       color = "#F00505"
        //       emoji = '❌'
        //     } else {
        //       color = "#F0F0F0"
        //       emoji = '🤷'
        //     }

        //     wouldyouembed = new EmbedBuilder()
        //     .setColor(color)
        //     .setFooter({ text: `${WouldYou.embed.footer}` })
        //     .setTimestamp()
        //     // {
        //     //     name: WouldYou.embed.Uselessname,
        //     //     value: `> ${superpower}`,
        //     //     inline: false,
        //     //   }, 
        //     .addFields(
        //     {
        //       name: "Stats",
        //       value: `> **${percentage}%** ${WouldYou.stats.of} **${totalreactions} ${userstotal}** ${WouldYou.stats.taking} ${emoji}`,
        //     }
        //     );

        //     try {
        //         await message.reactions.removeAll()
        //     } catch (error) {
        //         console.log(error)
        //     }

        //     await interaction.editReply({
        //       embeds: [wouldyouembed],
        //     });

        //     collector.stop();
        //   });
        } catch (error) {}
      } catch (error) {}
      });
  },
};
