// 14 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams
// O avaliador consultará os dados da tabela teams, verificando se ela contém os dados iniciais corretos. Nessa seção temos o diagrama de entidades.
// npx sequelize migration:generate --name create-table-teams
// jamir@jamir-X550CA:~/Projetos/back-end/sd-022-b-trybe-futebol-clube/app/backend$ npx sequelize migration:generate --name create-table-teams
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
      },
      team_name: {
        allowNull: false,
        type: Sequelize.STRING
      }
    })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('teams')
  }
};