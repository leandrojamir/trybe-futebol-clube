// 18 - Desenvolva em /app/backend/src/database nas pastas correspondentes, uma migration e um model para a tabela de matches
import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  declare homeTeam: number;
  declare homeTeamGoals: number;
  declare awayTeam: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: INTEGER(),
  },
  homeTeam: {
    allowNull: false,
    type: INTEGER(),
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER(),
  },
  awayTeam: {
    allowNull: false,
    type: INTEGER(),
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER(),
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN(),
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'homeMatch' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'awayMatch' });

export default Match;
