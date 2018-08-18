module.exports = function (sequelize, DataTypes) {
    var Snippet = sequelize.define('Snippet', {
        snippet: {
            type: DataTypes.STRING,
            allowNull: true
        }
    
        // fullurlid
    });
    Snippet.associate = function (model) {
        Snippet.belongsToMany(model.Tag, {
            through: model.Taggable     
        });
        //many to many=> many snippets can have many tags
        Snippet.belongsTo(model.Fullurl, {
            //one to many=> each snippet belongs to a URL
        }); 
    };
    
    return Snippet;
};


