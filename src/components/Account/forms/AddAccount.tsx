import React, {useState} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddAccount = ({initialValues, onSubmit}: any) => {
    const [values, setValues] = useState(initialValues || {});

    const onSubmitLocal: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({...values, [name]: event.target.value});
    };

    return (
        <form onSubmit={onSubmitLocal}>
            <div>
                <label htmlFor="id">ID</label>
                <input
                    name="id"
                    type="text"
                    value={values.id}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="token">Token</label>
                <input
                    name="token"
                    type="text"
                    value={values['token']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <input type="submit" />
        </form>
    );
};
