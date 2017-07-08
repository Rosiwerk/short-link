import { Meteor } from "meteor/meteor";

import React from "react";

import Modal from "react-modal";

export default class AddLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            isOpen: false,
            error: ""
        };
    }
    onSubmit(event) {
        const { url } = this.state;

        event.preventDefault();

        Meteor.call("links.insert", url, (err, res) => {
            if (!err) {
                this.setState({ url: "", isOpen: false, error: "" });
            } else {
                this.setState({ error: err.reason });
            }
        });
    }
    onChange(e) {
        this.setState({url: e.target.value});
    }
    handleModalClose() {
        this.setState({isOpen: false, url: '', error: ''});
    }
    render() {
        return (
            <div>
                <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={() => this.setState({isOpen: false, url: "", error: ""})}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add new Links</h1>
                    {this.state.error ? <p>{this.state.error}</p> : null}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                            type="text"
                            placeholder="URL"
                            ref="url"
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}
                        />
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--link button--secondary" onClick={() => this.setState({isOpen: false, url: "", error: ""})}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
