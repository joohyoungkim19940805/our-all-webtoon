import 'module-alias/register';
import { addAliases } from 'module-alias';

addAliases({
  '@common': `${__dirname}/common`,
  '@services': `${__dirname}/services`,
});