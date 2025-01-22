import React from 'react'
import ButtonSpinner from './Spinner'

const Button = ({
    varient = '',
    title = '',
    loader = false,
    class_name = "",
    disabled = false,
    onClickFunction,
    ...rest
}) => {
    return (
        <button
            className={`btn btn-${varient}  ${class_name}`}
            disabled={disabled}
            onClick={onClickFunction}
            {...rest}
        > <ButtonSpinner loading={loader} /> {title}</button>
    )
}

export default Button