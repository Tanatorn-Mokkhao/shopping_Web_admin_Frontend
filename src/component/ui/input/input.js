import React from 'react'


function Input(props) {
    let input = null
    switch (props.type) {
        case 'text':
            input = <input
                type= {props.type}
                value={props.value}
                onChange={props.onChange}
                placeholder={ props.placeholder}
            />
            break
            case 'password':
                input = <input
                    type= {props.type}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={ props.placeholder}
                />
            break
            case 'submit':
                input = <input
                    type={props.type}
                    value={props.value}
                    onClick={props.onClick}
                />
            break
        default:
            break
    }
    return input
}

export default Input
