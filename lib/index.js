define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Logger = void 0;
    class Logger {
        constructor(emitter, level, context) {
            this.level = "ALL";
            this.emitter = emitter;
            this.context = context;
            this.level = level;
        }
        C(tags) {
            return new Logger(this.emitter, this.level, Object.assign(Object.assign({}, this.context), tags));
        }
        with(tags) {
            this.context = Object.assign(Object.assign({}, this.context), tags);
        }
        print(tags) {
            this.emitter.log(JSON.stringify(Object.assign({ timestamp: new Date().toISOString() }, tags)));
        }
        I(message, tags) {
            if (["INFO", "DEBUG", "ALL"].includes(this.level))
                this.print(Object.assign({ level: "INFO", message: message }, tags));
        }
        W(message, err, tags) {
            if (["WARN", "DEBUG", "ALL"].includes(this.level))
                this.print(Object.assign({ level: "WARN", message: message, err: err }, tags));
        }
        E(message, err, tags) {
            if (["ERROR", "DEBUG", "ALL"].includes(this.level))
                this.print(Object.assign({ level: "ERROR", message: message, err: err }, tags));
        }
    }
    exports.Logger = Logger;
});
