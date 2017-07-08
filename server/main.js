import { Meteor } from 'meteor/meteor';
import { WebApp } from "meteor/webapp";

import "../imports/api/users";
import {Links} from "../imports/api/links";
import "../imports/startup/simple-schema-configuration.js";

Meteor.startup(() => {
    WebApp.connectHandlers.use((req, res, next) => {
        let _id = req.url.slice(1);
        // .find would return an array, .findOne
        // expects there is only 1 document so when it
        // actually finds, it returns the document
        let link = Links.findOne({ _id });

        if (link) {
            res.statusCode = 302;
            res.setHeader("Location", link.url);
            res.end();
            Meteor.call("links.trackVisit", _id);
        } else {
            next();
        }
    });
});
