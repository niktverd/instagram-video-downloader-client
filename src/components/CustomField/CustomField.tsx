import React, {ReactNode} from 'react';

import {Field, FieldAttributes} from 'formik';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CustomFieldProps = FieldAttributes<any> & {
    children?: ReactNode;
    label?: ReactNode;
    helperText?: ReactNode;
};

export const CustomField = ({children, label, helperText, name, ...props}: CustomFieldProps) => {
    const fieldId = String(props.id ?? name);

    return (
        <div style={{marginBlockEnd: 20}}>
            <label htmlFor={fieldId}>{label || name}</label>
            <div>
                <Field id={fieldId} name={name} {...props}>
                    {children}
                </Field>
            </div>
            {helperText && (
                <div style={{marginTop: 6, fontSize: 12, color: '#888'}}>{helperText}</div>
            )}
        </div>
    );
};
