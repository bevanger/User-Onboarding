import React from 'react'

export default function userForm (props) {
    const {
        values, 
        submit, 
        change, 
        disabled, 
        errors,
    } = props


const onSubmit = evt => {
    evt.preventDefault()
    submit()
}

const onChange = evt => {
    const {name, value, type, checked} = evt.target
    const valueToUse = type === 'checkbox' ? checked: value
    change(name, valueToUse)
}

return (
<form className='form container' onSubmit={onSubmit}>
    <div className='form-group submit'>

        <div>
            <div>{errors.name}</div>
            <div>{errors.email}</div>
            <div>{errors.password}</div>
            <div>{errors.terms}</div>
        </div>
    </div>

    <div className = 'form-group inputs'>
        <h4>General Information</h4>
        {/* Text Inputs */}
        <label>Name
            <input
                value={values.name}
                onChange={onChange}
                name='name'
                type='text'
            />
        </label>

        <label>Email
            <input
                value={values.email}
                onChange={onChange}
                name='email'
                type='text'
            />
        </label>

        <label>Password
            <input
            value={values.password}
            onChange={onChange}
            name='password'
            type='text'
            />
        </label>

        <label>Terms of Service
            <input
                type='checkbox'
                name='terms'
                onChange={onChange}
                checked={values.terms}
            />
        </label>
        <button disabled={disabled}>Submit</button>
    </div>
</form>
)
};