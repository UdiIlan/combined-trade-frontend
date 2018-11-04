import * as React from 'react';
const graph = require('../../../assets/images/Graph.png');



interface GraphProps {
}

export default class Graph extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                 <img src={graph}/>
            </div>
            );
    }
}