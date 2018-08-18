module.exports = function (sequelize, DataTypes) {
    var Tag = sequelize.define('Tag', {
        tag: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    //one to one=> each tag belongs to a certain snippet or many
    Tag.associate = function (model) {
        Tag.belongsToMany(model.Snippet, {
            through: model.Taggable           
        });
    }
    //many to many=> each tag belongs to one url or many
    return Tag;
};