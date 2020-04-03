import React from 'react'
import LeaderLine from 'leader-line'

class Line extends React.Component {

    componentDidMount() {
        this.waitWhenRefIsReady();
        // scroll and resize listeners could be assigned here
    }

    componentWillUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    shouldComponentUpdate() {
        setTimeout(() => {
            // skip current even loop and wait
            // the end of parent's render call
            if (this.line) {
                this.line.position();
            }
        }, 0);
        // you should disable react render at all
        return false;
    }

    waitWhenRefIsReady() {
        // refs are generated via mutations - wait for them
        this.timer = setInterval(() => {
            if (this.props.start.current) {
                clearInterval(this.timer);
                this.drawLine();
            }
        }, 5);
    }

    drawLine() {
        const { start, end } = this.props;
        this.line = new LeaderLine(start.current, end.current);
    }

    render() {
        return null;
    }
}

export default Line;