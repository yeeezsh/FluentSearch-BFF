import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
} from '@nestjs/graphql';
import { promises } from 'fs';
import { printSchema } from 'graphql';
import { UserResolver } from './src/user/user.resolver';

const { writeFile } = promises;
async function generateSchema() {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create([UserResolver]);
  await writeFile('./schema.gql', printSchema(schema));
  Logger.log('done');
}

generateSchema();
