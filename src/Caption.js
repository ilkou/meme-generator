import React, {Component} from "react";
import 'react-bootstrap';

class Caption extends Component{
    render() {
        return (
            <div className="col-md-4 ">
                <div className="row" style={{backgroundColor: "#fff", padding: "10px 15px", margin: "10px"}}>
                    <div className="col-md-6">
                            <div className="border border-info rounded px-2 py-1">
                                <a href={this.props.link} download><img src={this.props.link} alt={this.props.name} style={{maxWidth: "100%", maxHeight: "300px"}}/></a>
                            </div>
                    </div>
                    <div className="col-md-6 card-body">

                        <small className="card-subtitle mb-2 text-muted">{this.props.name}</small>
                    </div>
                </div>
            </div>
        );
    }
}

export default Caption;
