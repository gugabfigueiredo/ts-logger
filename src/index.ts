export interface Emitter {
    log: (msg: string) => void;
}

export class Logger {

    emitter: Emitter;
    context: object;
    level: string;

    constructor(emitter: Emitter, level: string = LOG_LEVEL.ALL, context: object = {}) {
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
        if ([LOG_LEVEL.INFO, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.print({level: "INFO", message: message, ...tags});
    }

    W(message: string, err: any, tags?: object) {
        if ([LOG_LEVEL.WARN, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.print({level: "WARN", message: message, err: err, ...tags});
    }

    E(message: string, err: any, tags?: object) {
        if ([LOG_LEVEL.ERROR, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.print({level: "ERROR", message: message, err: err, ...tags});
    }
}

export const LOG_LEVEL = {
    ERROR: "ERROR",
    INFO: "INFO",
    WARN: "WARN",
    DEBUG: "DEBUG",
    ALL: "ALL"
}