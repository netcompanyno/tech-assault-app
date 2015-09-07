import React from 'react';

export default class Countdown extends React.Component {

    render() {
        if (this.props.secondsLeft > 10 || this.props.secondsLeft === 0) {
            return <span />;
        }

        return (
            <div className="countdown">{this.props.secondsLeft}</div>
        );
    }


}