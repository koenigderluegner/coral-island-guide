import chalk from "chalk";

export class Logger {

    static readonly PAD_SIZE = 10;

    static log(...data: any) {
        console.log(chalk.gray('LOG:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static info(...data: any) {
        console.log(chalk.blue('INFO:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static error(...data: any) {
        console.log(chalk.red('ERROR:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static warn(...data: any) {
        console.log(chalk.yellow('WARN:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static success(...data: any) {
        console.log(chalk.green('SUCCESS:'.padEnd(this.PAD_SIZE, ' ')), ...data)
    }

    static progress(progress: number) {
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        const percentage = progress.toFixed(2).padStart(3, '0') + '%';
        process.stdout.write(chalk.blue('PROGRESS:'.padEnd(Logger.PAD_SIZE)) + ' ' + percentage);
        if (progress === 100) console.log()
    }
}
