import React, { useState } from "react";
import { useFetchProfileData, useImpromptu } from 'api/api'

/**
 * Suspense fetch api
 */
const Comp1 = () => {

    const [source, refresher, times] = useFetchProfileData()

    return (
        // view tree
        <>
            <div>
                {source ? JSON.stringify(source.users.read()) : 'loading'}
            </div>
        </>
    );
};

export default Comp1;
