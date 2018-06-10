import React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';

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

class TabRightOne extends React.Component {

    render() {
        return (
            <div>
                <List>
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                    <ListItem primaryText="Starred" leftIcon={<ActionGrade />} />
                    <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                    <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                    <ListItem primaryText="Inbox" leftIcon={<ContentInbox />} />
                </List>
                <List>
                    <ListItem primaryText="All mail" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Trash" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Spam" rightIcon={<ActionInfo />} />
                    <ListItem primaryText="Follow up" rightIcon={<ActionInfo />} />
                </List>
            </div>

        );
    }
}

export default muiThemeable()(TabRightOne)