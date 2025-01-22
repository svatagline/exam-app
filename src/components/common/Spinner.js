import React from 'react'

const ButtonSpinner = ({loading, className}) => {
    return (
        <div className={`spinner-border spinner-border-sm ${className} ${loading?"":"d-none"}`} role="status"  >
            <span className="sr-only"></span>
        </div>
    )
}

export default ButtonSpinner