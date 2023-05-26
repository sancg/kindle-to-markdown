const args_term = process.argv.splice(2);

const default_config = {
    batch: 0,
    user: 0,
    partial: false,
    b: "batch",
    u: "user",
    p: "partial",
};

const parseArgs = (args, base = default_config) => {
    const reg_terminal = /^\-\-?/;
    return args.reduce((obj, item, index, args) => {
        if (reg_terminal.test(item) && index + 1 < args.length) {
            let key = item.replace(reg_terminal, "").toLowerCase().trim();
            if (/batch|user|partial/.test(base[key])) {
                key = base[key];
            }
            const value = parseInt(args[index + 1]);
            obj[key] = value;
            return obj;
        }

        return obj;
    }, base);
};

console.log(parseArgs(args_term));

module.exports = { parseArgs };
