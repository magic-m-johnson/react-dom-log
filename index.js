if (console && console.error) {
    console._error = console.error
    console.__error = (...args) => {
        if (args.length > 1 && args[0].substr(-2) === '%s') {
            let full = args.shift()
            full = full.substr(0, full.length - 2).replace(/ *\n+ */, ' ')
            const trace = args.pop()

            while (full.indexOf('%s') >= 0 && args.length) {
                full = full.replace(/%s/, args.shift())
            }

            let first = full.indexOf('.') >= 0 ? full.split('.')[0] + '.' : full
            const type = first.indexOf('Warning: ') === 0 ? 'warn' : '_error'

            if (type === 'warn') {
                first = first.substr(9)
            }

            console[type](first)
            console._error('[DOMLOG] ' + full, {
                trace: trace
                    .trim()
                    .split(/ *\n+ */)
                    .map((a) => a.trim())
            })
        }
    }
}

