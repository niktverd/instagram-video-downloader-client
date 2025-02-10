import React, {useState} from 'react';

import {Button, Checkbox, useToaster} from '@gravity-ui/uikit';
import {omit} from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AddBannerInTheEnd = ({initialValues, onSubmit}: any) => {
    const [values, setValues] = useState(initialValues || {});
    const [textArrayName, setTextArrayName] = useState('');

    const {add} = useToaster();

    const onSubmitLocal: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit?.(values);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const name = event.target.name;
        setValues({...values, [name]: event.target.value});
    };

    const handleAddTextArrayClick = () => {
        if (!textArrayName) {
            // eslint-disable-next-line no-console
            console.error('textArrayName must not be empty');
            add({
                name: Math.random() + 'textArrayName_must_not_be_empty',
                content: 'textArrayName must not be empty',
            });
            return;
        }

        if (values?.texts?.[textArrayName]) {
            // eslint-disable-next-line no-console
            console.error('textArrayName is already in texts');
            add({
                name: Math.random() + 'textArrayName_is_already_in_texts',
                content: 'textArrayName is already in texts',
            });
            return;
        }

        setValues({...values, texts: {...(values.texts || {}), [textArrayName]: []}});
        setTextArrayName('');
    };

    const handleAddOneTextClick = (key: string) => () => {
        const vals = values.texts?.[key] || [];
        setValues({...values, texts: {...values.texts, [key]: [...vals, '']}});
    };

    const handleDeleteOneTextClick = (key: string) => () => {
        const texts = {...values.texts};
        setValues({...values, texts: omit(texts, key)});
    };

    const handleChangeOneText =
        (key: string, index: number): React.ChangeEventHandler<HTMLInputElement> =>
        (event) => {
            const texts = {...values.texts};
            const topic = [...texts[key]];
            topic[index] = event.target.value;

            texts[key] = topic;

            setValues({...values, texts});
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
            <div>
                <h4>Texts</h4>
                <div>
                    <input
                        value={textArrayName}
                        onChange={(event) => setTextArrayName(event.target.value)}
                    />
                    <Button onClick={handleAddTextArrayClick}>add array</Button>
                </div>
                {Object.entries(values.texts || {}).map(([key, vals = []]) => {
                    return (
                        <div key={key}>
                            <h5>{key}</h5>
                            <div>
                                <Button onClick={handleAddOneTextClick(key)}>add</Button>
                                <Button onClick={handleDeleteOneTextClick(key)}>delete</Button>
                            </div>
                            <div>
                                {(vals as string[]).map((val, indx) => {
                                    return (
                                        <div key={indx + val}>
                                            <input
                                                value={val}
                                                onChange={handleChangeOneText(key, indx)}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                            <pre>{JSON.stringify(vals)}</pre>
                        </div>
                    );
                })}
            </div>

            <input type="submit" />
        </form>
    );
};
