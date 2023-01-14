// 14 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de teams
import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  id!: number;
  teamName!: string;
}

Team.init({
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: INTEGER(),
  },
  teamName: {
    type: STRING(),
  },
}, {
  sequelize: db,
  modelName: 'Team',
  tableName: 'teams',
  timestamps: false,
  underscored: true,
});

export default Team;
