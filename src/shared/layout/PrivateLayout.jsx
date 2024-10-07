import { get } from "lodash";
import React from 'react';
import BlockUi from "react-block-ui";
import { useSelector } from 'react-redux';
import BFHeader from "../components/header";

export const PrivateLayout = ({ children, ...rest }) => {
    const showBlockUI = useSelector((state) =>
        get(state, "utils.blocking", false)
    );

    return <BlockUi tag="div" blocking={showBlockUI}>
        <BFHeader />
        <main>{children}</main>
    </BlockUi>;
};