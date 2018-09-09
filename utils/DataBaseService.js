import MySQL from 'mysql';
import { host, dbUser, dbPassword, db } from './consts';

export default class DataBaseService{
    constructor(){
        this.connection = MySQL.createConnection({
            host,
            user: dbUser,
            password: dbPassword,
            database: db,
        });
        this.connection.connect();
        this.res = '';
    }
    select(data, tables, conditions){
        if(Array.isArray(data)) data = data.join(', ');
        else if(typeof(data) === 'object'){
            let strs = [];
            Object.keys(data).map(key => {
                strs.push(Array.isArray(data[key])
                    ?`${key}.${data[key].join(`, ${key}.`)}`
                    :`${key}.${data[key]}`);
            });
            data = strs.join(', ');
        }
        if(Array.isArray(tables)) tables = tables.join(', ');
        console.log(`SELECT ${data} FROM ${tables} WHERE ${conditions};`);
    }

    async call(procedure, params, callback){
        if(Array.isArray(params)) params = '\''+params.join('\', \'')+'\'';
        this.connection.query(
            `CALL ${procedure}(${params?params:''});`, callback
        );
    }
}