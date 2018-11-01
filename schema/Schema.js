const graphql = require('graphql');
const axios = require('axios');
const _ = require('lodash');
const config = require('../config');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList
} = graphql;

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        users: {
            type: new GraphQLList(UserType),
            resolve(parentValue){
                return axios
                    .get( config.service.users )
                    .then( res => _.filter( res.data, { companyId: parentValue.id } ) )
            }
        }
    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        gender: { type: GraphQLString },
        company: {
            type: CompanyType,
            resolve(parentValue){
                return axios.get( config.service.companies + parentValue.companyId )
                    .then(res=>res.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve( parentValue, args ) {
                return axios
                    .get(config.service.users + args.id)
                    .then( res => res.data );

            }
        },
        company:{
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args){
                return axios
                    .get(config.service.companies + args.id)
                    .then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});