import React from "react";
import {baseUrl} from "../consts"

class Bill extends React.Component {
    constructor(props) {
        super(props);

        const link = this.getLink();
        this.state = { link }
    }

    render () {
        return <div className={'main-wrapper'}>
            <div className="upload">
                <h3>Share the this link with your mates:</h3>
                <div className="upload-status">
                    <span>{this.state.link}</span>
                </div>
            </div>
        </div>
    };

    getBillId(str) {
        const args = str.split('&');
        return args[0].split('=')[1];
    }

    getLink() {
        let id = this.getBillId(this.props.location.search.slice(1));
        return `${baseUrl}/${id}`
    }
}
export default Bill;