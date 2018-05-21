import React, { Component } from 'react';

class StatefulChildComponent extends Component {
    constructor() {
        super();

        this.state = {}
    }
    render() {
        return (
            <div>
                Hello from StatefulChildComponent
            </div>
        );
    }
}

export default StatefulChildComponent;