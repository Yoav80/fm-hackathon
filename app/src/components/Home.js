import React from "react";
import axios from "axios";
import { createEndpoint } from "../consts"

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedFile: null, loaded: 0, error: null}
    }

    render () {
        return <div className={'main-wrapper'}>
            <h1>Welcome to the Bill calculator App</h1>
            <h2>Take a picture of the bill to start the calculation</h2>
            {!this.state.error ?
                <div className="upload">
                    {this.state.selectedFile ?
                        <div className="upload-status">
                            <button onClick={this.handleUpload}>Upload {this.state.selectedFile.name}</button>
                            <span>Uploaded: {Math.round(this.state.loaded, 2)} %</span>
                        </div>
                        :
                        <div className="upload-status">
                            <input type="file" name="" id="" onChange={this.handleSelectedFile}/>
                        </div>
                    }
                </div>
                :
                <div className="upload" >
                    <div className="error">
                        {this.state.error ? <span>Error: {this.state.error}</span> : ''}
                    </div>
                </div>
            }
        </div>
    };

    handleUpload = () => {
        const data = new FormData();
        data.append('image', this.state.selectedFile, this.state.selectedFile.name);

        axios.post(createEndpoint, data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    })
                },
            })
            .then(res => {
                let link = this.getLink(res);
                if (link) {
                    window.location.assign(`/bill?billId=${link}`);
                } else {
                    this.setError('oops, no link returned');
                }
            })
            .catch(err => {
                this.setError(err.statusText);
            })

    };

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };

    setError(err) {
        this.setState({error: err});
        console.error('something went bad!', err);
    }

    getLink(res) {
        let d = res.data;
        if (d && d.link) {
            return d.link
        }
        return false;
    }
}
export default Home;