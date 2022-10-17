export interface Emitter {
    log: (msg: string) => void;
}

export class Logger {

    emitter: Emitter;
    context: {[k: string]: any};
    level: string;

    constructor(emitter: Emitter, level: string = LOG_LEVEL.ALL, context: object = {}) {
        this.emitter = emitter
        this.context = context
        this.level = level
    }

    C(tags: {[k: string]: any}): Logger {
        return new Logger(this.emitter, this.level, { ...this.context, ...tags })
    }

    with(tags: {[k: string]: any}) : void {
        this.context = { ...this.context, ...tags }
    }

    log(tags: {[k: string]: any}) {
        this.emitter.log(JSON.stringify({timestamp: new Date().toISOString(), ...this.context, ...tags}))
    }

    I(message: string, tags?: {[k: string]: any}) {
        if ([LOG_LEVEL.INFO, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.log({level: "INFO", message: message, ...tags});
    }

    W(message: string, err: any, tags?: {[k: string]: any}) {
        if ([LOG_LEVEL.WARN, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.log({level: "WARN", message: message, err: err, ...tags});
    }

    E(message: string, err: any, tags?: {[k: string]: any}) {
        if ([LOG_LEVEL.ERROR, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.log({level: "ERROR", message: message, err: err, ...tags});
    }

    F(message: string, err: any, tags?: {[k: string]: any}) {
        if ([LOG_LEVEL.ERROR, LOG_LEVEL.DEBUG, LOG_LEVEL.ALL].includes(this.level))
            this.log({level: "FATAL", message: message, err: err, ...tags});
        process.exit(1);
    }
}

export const LOG_LEVEL = {
    ERROR: "ERROR",
    INFO: "INFO",
    WARN: "WARN",
    DEBUG: "DEBUG",
    ALL: "ALL"
}