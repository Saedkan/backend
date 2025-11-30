import { gql } from 'apollo-server-express';
import { baseTypeDefs } from './base.types.js';
import { inputTypeDefs } from './input.types.js';
import { userTypeDefs } from './user.types.js';
import { projectTypeDefs } from './project.types.js';
import { taskTypeDefs } from './task.types.js';
import { tagTypeDefs } from './tag.types.js';
import { commentTypeDefs } from './comment.types.js';
import { minimalTypeDefs } from './minimal.js';
export const typeDefs = gql `
  ${minimalTypeDefs}
  ${baseTypeDefs}
  ${inputTypeDefs}
  ${userTypeDefs}
  ${projectTypeDefs}
  ${taskTypeDefs}
  ${tagTypeDefs}
  ${commentTypeDefs}
`;
