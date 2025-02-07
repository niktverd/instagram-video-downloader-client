import React, {useState} from 'react';

import {Checkbox} from '@gravity-ui/uikit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
                <label htmlFor="extraBannerUrl">extraBannerUrl</label>
                <input
                    name="extraBannerUrl"
                    type="text"
                    value={values['extraBannerUrl']}
                    onChange={handleChange}
                    autoComplete="off"
                />
            </div>
            <div>
                <Checkbox
                    checked={values.enabled}
                    content="Enabled"
                    onUpdate={(checked) => setValues({...values, enabled: checked})}
                />
            </div>
            <div>
                <Checkbox
                    checked={values.onlyOnce}
                    content="Use each video only once"
                    onUpdate={(checked) => setValues({...values, onlyOnce: checked})}
                />
            </div>

            <input type="submit" />
        </form>
    );
};
