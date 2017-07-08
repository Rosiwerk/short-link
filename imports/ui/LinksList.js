import React from "react";
import FlipMove from "react-flip-move";

import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import { Session } from "meteor/session";

import { Links } from "./../api/links";

import LinksListItem from "./LinksListItem";

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        };
    }
    componentDidMount() {
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe("links");
            const links = Links.find({
                visible: Session.get("showVisible")
            }).fetch();
            this.setState({ links });
        });
    }
    componentWillUnmount() {
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        if (this.state.links.length === 0) {
            return (
                <div className="item">
                    <p className="item__status-message">No links found</p>
                </div>
            )
        }

        return this.state.links.map((link) => {
            let shortUrl = Meteor.absoluteUrl(link._id);
            // Spread out (...) attaches every link property to props
            return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>
        });
    }
    render() {
        return (
            <div>
                <FlipMove enterAnimation="fade" leaveAnimation="fade" maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}
