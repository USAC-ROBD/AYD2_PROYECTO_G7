class CommandInvoker {
    constructor() {
        this.commands = [];
    }

    addCommand(command) {
        this.commands.push(command);
    }

    async executeCommands() {
        const results = [];
        for (const command of this.commands) {
            results.push(await command.execute());
        }
        return results;
    }
}

export { CommandInvoker };