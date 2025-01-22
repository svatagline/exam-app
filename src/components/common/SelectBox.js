import React from 'react'
import Select from 'react-select';

const SelectBox = ({
    options = [],
    value = {},
    handleChange,
    parentClass = '',
}) => {
    return (
        <>
            <div className={parentClass}  >
                <Select
                    value={value}
                    options={options}
                    onChange={handleChange}
                />
            </div>

        </>
    )
}

export default SelectBox