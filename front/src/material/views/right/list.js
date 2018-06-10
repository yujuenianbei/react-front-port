import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import TabRightOne from './listContentOne'

const styles = {
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    slide: {
        padding: 10,
    },
};

class TabRight extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }

    handleChange = (value) => {
        this.setState({
            slideIndex: value,
        });
    };

    render() {
        return (
            <div>
                <Tabs
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    tabItemContainerStyle={{backgroundColor: this.props.muiTheme.palette.textColor,height:50}}
                >
                    <Tab label="One" value={0} />
                    <Tab label="Two" value={1} />
                </Tabs>

                <SwipeableViews
                    index={this.state.slideIndex}
                    onChangeIndex={this.handleChange}
                >
                    <div>
                        <TabRightOne />
                    </div>
                    <div style={styles.slide}>
                        slide n°2
                    </div>
                </SwipeableViews>
            </div>
        );
    }
}

export default muiThemeable()(TabRight)