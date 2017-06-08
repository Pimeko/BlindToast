import { schema } from 'normalizr';

export const schemaUser = new schema.Entity('users', {idAttribute: 'id'});
