import chalk from 'chalk';
import downloadRepo from 'download-git-repo';
import type { QuestionCollection } from 'inquirer';
import inquirer from 'inquirer';
import symbols from 'log-symbols';
import fs from 'node:fs';
import ora from 'ora';
const REACT_REPO = 'BlackBerry009/boilerplate-project-react#main';

const questions: QuestionCollection = [
  {
    name: 'type',
    type: 'list',
    choices: ['Vue', 'React'],
  },
  {
    name: 'name',
    type: 'input',
    message: '请输入项目名称',
  },
];
export const createPrompt = () => {
  inquirer.prompt(questions).then((answers) => {
    const { type, name } = answers;
    if (type === 'React') {
      if (fs.existsSync(`./${name}`)) {
        console.log(
          chalk.red(symbols.error),
          chalk.red('The project is already exist.'),
        );
        return;
      }
      const spin = ora('downloading pls wait...').start();
      downloadRepo(`${REACT_REPO}`, `./${name}`, { clone: true }, (err: any) => {
        if (err) {
          console.log(
            chalk.red(symbols.error),
            chalk.red(`Generation failed. ${err}`),
          );
          return;
        }
        spin.stop();
        console.log(
          chalk.green(symbols.success),
          chalk.green('Generation completed!'),
        );
        console.log('\n To get started');
        console.log(`\n    cd ${name} \n`);
      });
    } else if (type === 'Vue') {
      console.log(
        chalk.red(symbols.error),
        chalk.red('not have vue boilerplate yet...'),
      );
    }
  });
};
