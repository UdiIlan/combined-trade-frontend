import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

export interface ProgressBarProps {
    intent?: 'default' | 'danger';
    value?: number;
    className?: string;
}

export default class ProgressBar extends React.Component<ProgressBarProps, any> {

    render() {

        const { intent, value, className } = this.props;
        const intentColor = !intent || intent === 'default' ? undefined : 'secondary';

        return (
            <LinearProgress className={className} variant='determinate' value={value} color={intentColor} />
        );
    }

}