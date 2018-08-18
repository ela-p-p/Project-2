
//load up all the tables with dummy data
//or accept user input to add url, tag, snip

db.Fullurl.create({
    url: "www.awesome.com",
    userid: '1'
}).then(url => {
    let urlId = url.id
    db.Snippet.create({
        snippet: "coding",
    }).then(snips => {
        snips.FullurlId = urlId
        snips.save().then(() => {
            db.Tag.create({
                tag: "java"
            }).then(tags => {
                tags.setSnippets(snips).then(taggable => {
                    console.log(taggable[0])
                }, err => {
                })
            })
        })
    })
})

//display all info for user on page load
//use jquery .load() it's re-usable, where windows.document ready is only once
db.Fullurl.findAll({
    where: {
        userid: '1'
        //need user info from passport app
    },
    include: [{
        model: db.Snippet,
        include: [{
            model: db.Tag,
            through: {
                attributes: ['TagId']
            }
        }
        ]
    }
    ]
}).then(all => {

    const allResultObj = all.map(url => {

        return Object.assign(
            {}, {
                id: url.id,
                url: url.url,
                userdescription: url.userdescription,
                userid: url.userid.map(snippet => {

                    return Object.assign(
                        {}, {
                            id: snippet.id,
                            snippet: snippet.snippet,
                            Fullurlid: snippet.Fullurlid.map(tags => {

                                return Object.assign(
                                    {}, {
                                        id: tag.id,
                                        tag: tag.tag
                                    }
                                )
                            })
                        }
                    )
                })
            }
        )
    });
    res.json(allesultObj)
});
//Object.assign() is a nice little method to tidy up the user data back end, so only what we need is routed




//add a tag to a snippet

db.Tag.create({
    tag: "knitting"
}).then(addTag => {
    addTag.addSnippets([1])
});


//select a tag, get assoc snippet and url

db.Tag.findAll({
    where: {
        tag: 'knitting'
    },
    include: [{
        model: db.Snippet,
        through: {
            attributes: ['SnippetId'],
        },
        include: [{
            model: db.Fullurl,
        }]
    }]
}).then(tags => {
    const 
})




//removed due to scope, using passport login.

//create a new User
db.User.create({
    displayName: 'Angelina', email: 'angelinasemail@gmail.com', password: 'EEFF321'
}).then(user => {
    //console.log(user)
});


//removed due to scope...


//create a project and add a User to it.  Need to grab inputs and toggle of accesstype.  Need User ID (from login) from local storage.  Do we require Project Name to be Unique? it is right now
db.Project.create({
    projectName: 'Trip to Rome!', description: 'All the fun things we can do in Rome', accesstype: 'Public'
}).then(project => {
    project.addUsers([4]);
    // console.log(project)
});


//membertype default is Admin on project creation - but view on Join?, and Admin can change status using this code
db.Projectgroupmember.update({ membertype: 'View' },
    {
        returning: true, where: { UserId: '4' }
    }).then(update => {
        // console.log(update)
    });


//join a group/project-default 'View' membertype   
db.Projectgroupmember.update({ UserId: '3' },
    {
        returning: true, where: { ProjectId: '8' }
    }).then(update => {
        // console.log(update)
    });



