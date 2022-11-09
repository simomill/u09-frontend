import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import 'react-loader-spinner';

const Loader = () => {
    return (
        <div className="formGroup">
            <h1 className="logo -mt-20">DSPLAY</h1>
            <TailSpin
                height="80"
                width="80"
                color="#164E63"
                aria-label="tail-spin-loading"
                radius="1"
            />
        </div>
    );
};

export default Loader;
