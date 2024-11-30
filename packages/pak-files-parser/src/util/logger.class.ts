import chalk from "chalk";
import * as readline from 'readline'

export class Logger {

    static readonly PAD_SIZE = 10;

    static log(...data: unknown[]) {
        console.log(chalk.gray('LOG:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static info(...data: unknown[]) {
        console.log(chalk.blue('INFO:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static error(...data: unknown[]) {
        console.log(chalk.red('ERROR:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static warn(...data: unknown[]) {
        console.log(chalk.yellow('WARN:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static success(...data: unknown[]) {
        console.log(chalk.green('SUCCESS:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static progress(progress: number) {
        readline.clearLine(process.stdout, 0)
        readline.cursorTo(process.stdout, 0)
        const percentage = progress.toFixed(2).padStart(3, '0') + '%';
        process.stdout.write(chalk.blue('PROGRESS:'.padEnd(Logger.PAD_SIZE)) + ' ' + percentage);
        if (progress === 100) console.log()
    }
}
