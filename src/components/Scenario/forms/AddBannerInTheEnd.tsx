import React, {useState} from 'react';

export const AddBannerInTheEnd = ({initialValues, onSubmit}: any) => {
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
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div>
                <label htmlFor="extra_url-to-add">extra_url-to-add</label>
                <input
                    name="extra_url-to-add"
                    type="text"
                    value={values['extra_url-to-add']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>

            <input type="submit" />
        </form>
    );
};
