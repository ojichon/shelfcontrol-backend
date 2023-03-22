import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize("shelfcontrol", "postgres", "", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
});

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

class BooksRead extends Model {}
BooksRead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    cover_photo: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_published: {
      type: DataTypes.DATEONLY,
    },
    link_to_buy: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "BooksRead",
  }
);

class BooksNotRead extends Model {}
BooksNotRead.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    cover_photo: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    date_published: {
      type: DataTypes.DATEONLY,
    },
    link_to_buy: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "BooksNotRead",
  }
);

export { User, BooksRead, BooksNotRead, sequelize };
