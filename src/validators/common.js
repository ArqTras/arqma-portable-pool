/* eslint-disable prefer-promise-reject-errors */

export const greater_than_zero = (input) => {
    return input > 0
}

export const payment_id = (input) => {
    return input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && (input.length == 16 || input.length == 64))
}

export const privkey = (input) => {
    return input.length === 0 || (/^[0-9A-Fa-f]+$/.test(input) && input.length == 64)
}

export const service_node_key = (input) => {
    return input.length === 64 && /^[0-9A-Za-z]+$/.test(input)
}

export const address = (input, gateway) => {
    // Validate the address
    return new Promise((resolve, reject) => {
        try {
            if (/^[0-9A-Za-z]+$/.test(input)) {
                return gateway.once("validate_address", (data) => {
                    console.log(data, 'validated address <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
                    if (data.address && data.address !== input) {
                       return reject(false)
                    } else {
                        if (data.valid) {
                            return resolve(true)
                        } else {
                            return reject(false)
                        }
                    }
                })
                return gateway.send("wallet", "validate_address", {
                    address: input
                })
            } else {
               console.log('sheeit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
               reject(false)
            }
        } catch(e) {
            console.log('sheeit <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<', e, '<<<<<>>>>>>>', gateway)
            reject(false)
        }
    })
}
