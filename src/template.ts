import { program } from 'commander';
import pkg from '../package.json';
import { createPrompt } from './commands/init';

program.usage('<command>');
program.version(pkg.version);

program
  .command('init')
  .description('init project')
  .action(() => createPrompt());
