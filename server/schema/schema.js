// const { projects, clients} = require('../sampleData')

const Project = require('../models/Project')
const Client = require('../models/Client')



const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLNonNull, GraphQLEnumType } = require('graphql')

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({clientId: parent.id});
            }
        }
    })
})

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: { 
            type: ClientType,
            resolve(parent, args) {
                // return clients.find(client => client.id === parent.clientId)
                return Client.findById(parent.clientId);
            }
        }
    })
  })

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve() {
                // return clients
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                // return clients.find(client => client.id === args.id)
                return Client.findById(args.id);
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve() {
                // return projects
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parentValue, args) {
                // return projects.find(project => project.id === args.id)
                return Project.findById(args.id);
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient: {
            type: ClientType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},

            },
            resolve(parent, args) {
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                });
                return client.save()
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args) {
                const projects = await Project.find({ clientId: args.id });
        
                await Promise.all(
                    projects.map(project => Project.deleteOne({ _id: project._id }))
                );
        
                return Client.findByIdAndDelete(args.id);
            }
        },
        addProject: {
            type: ProjectType,
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                description: {type: GraphQLNonNull(GraphQLString)},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        },
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                const project = new Project({
                    name: args.name,
                    description: args.description,
                    status: args.status,
                    clientId: args.clientId
                })
                return project.save()
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args) {
                return Project.findByIdAndDelete(args.id);
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
                name: { type: GraphQLString},
                description: {type: GraphQLString},
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not Started'},
                            'progress': {value: 'In Progress'},
                            'completed': {value: 'Completed'}
                        },
                    }),
                },
            },
            resolve(parent, args) {
                return Project.findByIdAndUpdate(
                    args.id,
                    {
                        $set: {
                            name: args.name,
                            description: args.description,
                            status: args.status
                        }
                    },
                    {new: true}
                )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})