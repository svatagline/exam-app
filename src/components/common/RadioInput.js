import React from 'react' 

const RadioInput = ({ 
    handleChange, 
    isChecked = false,
    title='',
    name=''
}) => {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" name={name} onChange={handleChange} checked={isChecked} type="radio" id="flexRadioDefault1" />
                <label className="form-check-label" htmlFor="flexRadioDefault1"  >
                    {title}
                </label>
            </div>


        </>
    )
}

export default RadioInput