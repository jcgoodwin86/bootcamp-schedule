import {createSchema, definePermissions, ANYONE_CAN, NOBODY_CAN,table, string, json} from '@rocicorp/zero';

const module = table("module")
  .columns({
    id: string(),
    data: json(),
  })
  .primaryKey("id");

export const schema = createSchema(1,{
  tables: [module],
});

export const permissions = definePermissions(schema,() => ({
  module: {
    row: {
        insert: NOBODY_CAN,
        select: ANYONE_CAN,
        delete: NOBODY_CAN,
    },
}}));