import figlet from 'figlet';
import chalk from 'chalk';
import ora from 'ora';
import cliProgress from 'cli-progress';
import gradient from 'gradient-string';
import inquirer from 'inquirer';

const EMOJI_ROCKET = '🚀';
const EMOJI_LIGHT = '💡';
const EMOJI_SPARKS = '✨';
const EMOJI_LOCK = '🔒';
const EMOJI_CHECK = '✅';

function bigTitle(text) {
    return new Promise((res, rej) => {
        figlet.text(text, { horizontalLayout: 'default' }, (err, data) => {
            if (err) return rej(err);
            console.log(gradient.rainbow.multiline(data));
            res();
        });
    });
}

function showHeader() {
    console.log(chalk.bold.bgBlack(' =============================================='));
    console.log(chalk.bold(`${EMOJI_ROCKET}  BWM XMD v8 — NextGen AI Launch`));
    console.log(chalk.bold(` 👤  Ibrahim Adams — Founder & Lead`));
    console.log(chalk.bold.bgBlack('==============================================\n'));
}

function wait(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function spinnerTask(text, seconds = 4) {
    const s = ora({ text, spinner: 'dots' }).start();
    await wait(seconds * 1000);
    s.succeed(`${text} ${EMOJI_CHECK}`);
}

async function progressTask(message, seconds = 8) {
    console.log(chalk.dim(message));
    const bar = new cliProgress.SingleBar({
        format: `${chalk.cyan('{bar}')} {percentage}% | {value}/{total} sec | {msg}`,
        hideCursor: true,
        barsize: 30
    }, cliProgress.Presets.shades_classic);
    const total = seconds;
    bar.start(total, 0, { msg: message });
    for (let i = 0; i <= total; i++) {
        bar.update(i, { msg: message });
        await wait(1000);
    }
    bar.stop();
    console.log(chalk.green(`\n[${EMOJI_CHECK}] ${message} - Completed\n`));
}

async function fakeDownload(filename, seconds = 6) {
    await spinnerTask(`Downloading ${filename}`, Math.max(2, Math.round(seconds / 2)));
    await progressTask(`Installing ${filename}`, seconds);
}

async function autoRunSequence() {
    await bigTitle('BWM XMD');
    showHeader();
    console.log(chalk.bold(`${EMOJI_LIGHT} Initializing BWM XMD v8 core systems...\n`));

    await spinnerTask('Verifying identity: Ibrahim Adams', 3);
    await spinnerTask('Establishing secure cloud matrix', 4);
    await progressTask('Opening neural channels', 6);

    await fakeDownload('neural-core-v8.pkg', 6);
    await fakeDownload('bwmxmd-agent.bin', 6);
    await spinnerTask('Syncing global nodes', 5);

    await progressTask('Decrypting historic snapshots', 8);
    console.log(chalk.green.bold('[✓] All critical modules online'));
    console.log(chalk.yellow(`\n${EMOJI_SPARKS} SYSTEM STATUS: RUNNING — Awaiting next command...\n`));
}

async function promptLoop() {
    const commands = [
        { name: 'deploy', desc: 'Deploy — pushes a dramatic upload' },
        { name: 'upload', desc: 'Simulate file upload to BWM cloud' },
        { name: 'scan', desc: 'Run a movie-style deep scan' },
        { name: 'ai-update', desc: 'Simulate AI model patch/update' },
        { name: 'synth', desc: 'Generate synthetic audio/visual payload' },
        { name: 'status', desc: 'Show status & logs' },
        { name: 'shutdown', desc: 'Graceful (fake) shutdown' },
    ];

    while (true) {
        const answers = await inquirer.prompt([
            {
                type: 'list',
                name: 'cmd',
                message: 'Choose a cool command to run (or Ctrl+C to exit):',
                choices: commands.map(c => ({ name: `${c.name} — ${c.desc}`, value: c.name }))
            }
        ]);

        const cmd = answers.cmd;
        console.log(chalk.cyan(`\n> Running command: ${chalk.bold(cmd)} ${EMOJI_ROCKET}\n`));

        switch (cmd) {
            case 'deploy':
                await spinnerTask('Authorizing deploy for Ibrahim Adams', 3);
                await fakeDownload(`bwmxmd-deploy-${Date.now()}.tar.gz`, 7);
                await progressTask('Finalizing deployment', 5);
                break;
            case 'upload':
                await spinnerTask('Preparing secure upload', 2);
                await fakeDownload(`upload-stream-${Math.floor(Math.random() * 9999)}.bin`, 6);
                await progressTask('Verifying checksum', 4);
                break;
            case 'scan':
                await progressTask('Running deep system scan', 10);
                await spinnerTask('Analyzing processes & anomalies', 4);
                console.log(chalk.green('[✓] No real threats found — just showtime.'));
                break;
            case 'ai-update':
                await spinnerTask('Fetching model shards (v8.0.1)', 4);
                await progressTask('Applying AI patch', 8);
                console.log(chalk.magenta('✨ AI Model patched — performance +23% (simulated)'));
                break;
            case 'synth':
                await spinnerTask('Warming synthetic engines', 3);
                await progressTask('Rendering synthetic payload', 7);
                console.log(chalk.yellow('🔊 Sample audio clip generated — play to wow friends (simulated)'));
                break;
            case 'status':
                console.log(chalk.blue('\n--- LIVE STATUS ---'));
                console.log(chalk.green(`Uptime: ${Math.floor(process.uptime())}s`));
                console.log(chalk.green('Active nodes: 12 (simulated)'));
                console.log(chalk.green('Connected agents: Ibrahim-Adams, bwmxmd-core-01'));
                console.log(chalk.blue('--- END STATUS ---\n'));
                break;
            case 'shutdown':
                await spinnerTask('Notifying network peers', 3);
                await progressTask('Stopping services', 5);
                console.log(chalk.red.bold('\n[🛑] BWM XMD v8 — SESSION CLOSED \n'));
                process.exit(0);
                break;
            default:
                console.log(chalk.gray('Command not recognized — this is a demo.'));
        }

        console.log(chalk.green(`\n[${EMOJI_CHECK}] Ibrahim Adams — BWM XMD ready for next command.`));
    }
}

(async function main() {
    try {
        await autoRunSequence();
        await promptLoop();
    } catch (e) {
        console.error('Error:', e);
    }
})();
