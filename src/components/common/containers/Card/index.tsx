import * as React from 'react';
import { default as MUCard } from '@material-ui/core/Card';

export default function Card(props) {
    const { className, children, ...otherProps } = props;
    return (
        <MUCard className={className}>
            {children}
        </MUCard>
    );
}
