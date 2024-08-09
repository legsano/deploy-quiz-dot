import React, { useState } from 'react';
import '../style/warningbox.css';


export default function WarningBox({ isWarnBoxVisible, toggleWarnBox, onConfirm }) {

    // const [isWarnBoxVisible, setWarnBoxVisible] = useState(false);

    // <WarningBox isWarnBoxVisible={isWarnBoxVisible} toggleWarnBox={toggleWarnBox} onConfirm={onConfirm} />

    // function toggleWarnBox() {
    //     setWarnBoxVisible(!isWarnBoxVisible)
    // }

    // function onConfirm() {
    //     setWarnBoxVisible(!isWarnBoxVisible)
    // }


    return (
        <div className={`warningContainer ${isWarnBoxVisible ? 'visible' : ''}`}>
            <div className="confirmationBox">
                <div className="confCont">
                    <p>Are you sure ?</p>

                    <div className="confButCont">
                        <button onClick={toggleWarnBox}>No</button>
                        <button onClick={onConfirm}>Yes</button>
                    </div>

                </div>

            </div>
        </div>

    );
}
