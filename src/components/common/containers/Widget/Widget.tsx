import * as React from 'react';
import Card from 'components/common/containers/Card';
import Spinner from 'components/common/core/Spinner';
const styles = require('./styles.scss');
const classNames = require('classnames/bind');
const cx = classNames.bind(styles);

interface WidgetProps {
  title: string | JSX.Element;
  loading?: boolean;
  className?: string;
  children?: any;
}

export default function Widget(props: WidgetProps) {
  const { title, loading, className, children } = props;
  return (
    <Card className={cx(styles.widget, className)}>
      <h1 className={styles.title}>{title}</h1>

      {loading ?
        <Spinner className={styles.loader} size={40} />
        :
        children}

    </Card>
  );
}
