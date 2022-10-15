export interface Emitter {
    log: (msg: string) => void;
}
export declare class Logger {
    emitter: Emitter;
    context: object;
    level: string;
    constructor(emitter: Emitter, level: string, context: object);
    C(tags: object): Logger;
    with(tags: object): void;
    print(tags: object): void;
    I(message: string, tags?: object): void;
    W(message: string, err: any, tags?: object): void;
    E(message: string, err: any, tags?: object): void;
}
