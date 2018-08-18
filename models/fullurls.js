module.exports = function (sequelize, DataTypes) {
    var Fullurl = sequelize.define('Fullurl', {
        url: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        userdescription: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        userid: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }

    });
    Fullurl.associate = function (model) {
        //one to many => each url can have many comments
        Fullurl.hasMany(model.Snippet, {
            //one to many => each url can have many snippets
        });

    }
    return Fullurl;
};
