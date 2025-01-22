import React from 'react'

const InputBox = ({
    title = '',
    type = 'text',
    name = '',
    value = '',
    error = {},
    handleChange,
    handleBlur,
    placeholder,
    inputClass = '',
    labelClass = '',
    parentClass = '',
    errorClass = '',
    prepend,
    disabled
}) => {
    return (
        <>
            <div className={`form-group ${parentClass}`} >
                <label className={labelClass}>{title}</label>
                <div className={`${inputClass} ${prepend && 'input-group'}`}>
                    <input
                        type={type}
                        className={`form-control `}
                        placeholder={placeholder}
                        name={name}
                        value={value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={disabled}
                    />
                    {prepend && prepend}

                </div>
            {error && error['show'] && error?.msg ? (
                <div style={{ color: 'red' }} className={errorClass}>{error?.msg}</div>
            ) : null}
            </div>

        </>
    )
}

export default InputBox