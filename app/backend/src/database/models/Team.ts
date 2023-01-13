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

// import { Model, INTEGER, STRING } from 'sequelize';
// import db from '.';

// class User extends Model {
//   declare id: number;
//   declare username: string;
//   declare role: string;
//   declare email: string;
//   declare password: string;
// }

// User.init(
//   {
//     id: {
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       type: INTEGER,
//     },
//     username: STRING,
//     role: STRING,
//     email: STRING,
//     password: STRING,
//   },
//   {
//     sequelize: db,
//     modelName: 'user',
//     tableName: 'users',
//     timestamps: false,
//   },
// );

// export default User;
