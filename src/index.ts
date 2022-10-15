export interface Emitter {
    log: (msg: string) => void;
}

export class Logger {

    emitter: Emitter;
    context: object;
    level: string = "ALL";

    constructor(emitter: Emitter, level: string, context: object) {
        this.emitter = emitter
        this.context = context
        this.level = level
    }

    C(tags: object): Logger {
        return new Logger(this.emitter, this.level, { ...this.context, ...tags })
    }

    with(tags: object) : void {
        this.context = { ...this.context, ...tags }
    }

    print(tags: object) {
        this.emitter.log(JSON.stringify({timestamp: new Date().toISOString(), ...tags}))
    }

    I(message: string, tags?: object) {
        if (["INFO", "DEBUG", "ALL"].includes(this.level))
            this.print({level: "INFO", message: message, ...tags});
    }

    W(message: string, err: any, tags?: object) {
        if (["WARN", "DEBUG", "ALL"].includes(this.level))
            this.print({level: "WARN", message: message, err: err, ...tags});
    }

    E(message: string, err: any, tags?: object) {
        if (["ERROR", "DEBUG", "ALL"].includes(this.level))
            this.print({level: "ERROR", message: message, err: err, ...tags});
    }
}