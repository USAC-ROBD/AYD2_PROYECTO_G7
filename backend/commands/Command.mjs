class Command {
    execute() {
        throw new Error('El método execute debe ser implementado');
    }
}

export { Command };