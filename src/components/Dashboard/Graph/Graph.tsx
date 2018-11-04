import * as React from 'react';
const graph = require('assets/images/Graph.png');
const styles = require('./styles.scss');


interface GraphProps {
}

export default class Graph extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.graph}>
                 <img className={styles.graphImg} src={graph}/>
            </div>
            );
    }
}