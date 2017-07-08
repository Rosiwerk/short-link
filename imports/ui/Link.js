import React from "react";

import PrivateHeader from "./PrivateHeader";
import LinksListFilters from "./LinksListFilters";
import LinksList from "./LinksList";
import AddLink from "./AddLink";

export default (props) => {
    return (
        <div>
            <PrivateHeader title="Short Link"/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    )
}
