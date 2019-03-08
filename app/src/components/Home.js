import React from "react";
import axios from "axios";

const endpoint = 'http://localhost:3000/';
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
                        <span>Something went wrong</span>
                        {this.state.error.statusText ? <span>StatusText: {this.state.error.statusText}</span> : ''}
                        {this.state.error.status ? <span>Error Code: {this.state.error.status}</span> : ''}
                    </div>
                </div>
            }
        </div>
    };

    handleUpload = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile, 'image');

        axios.post(endpoint, data, {
                onUploadProgress: ProgressEvent => {
                    debugger;
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    })
                },
            })
            .then(res => {
                console.log(res.statusText)
            })
            .catch(err => {
                debugger;
                this.setState({error: err.response ? err.response : {}});
            })

    };

    handleSelectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    };
}
export default Home;