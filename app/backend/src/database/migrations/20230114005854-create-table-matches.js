// 18 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches
// O avaliador consultará os dados da tabela matches, verificando se ela contém os dados iniciais corretos. Nessa seção temos o diagrama de entidades.
// jamir@jamir-X550CA:~/Projetos/back-end/sd-022-b-trybe-futebol-clube/app/backend$ npx sequelize migration:generate --name create-table-matches
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      home_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      home_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      away_team: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      away_team_goals: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      in_progress: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matches')
  }
}
