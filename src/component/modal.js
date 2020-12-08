import React,{Component} from 'react'
import './../css/app.css';
import Modal from 'react-modal';
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import { Line, Circle } from 'rc-progress';
import Badge from "../../node_modules/react-bootstrap/cjs/Badge";
const customStyles = {
    content : {
        top                   : '30%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        width:'50%',
        transform             : 'translate(-50%, -50%)'
    }
};
const circleContainerStyle = {
    width: '50px',
    height: '50px',
    display: 'inline-block',
};
class modal extends Component {
    state= {
        show:true,
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    handleClose  = () =>{
        this.setState({show:false});
    };
    render(){
        return(
            <>
                <div className="text-center"><a href="javascript:;" data-toggle="modal"
                                                data-target="#success-modal-preview"
                                                className="button inline-block bg-theme-1 text-white">Show Modal</a>
                </div>
                <div style={circleContainerStyle}>
                    <Circle
                        percent={90}
                        strokeWidth="6"
                        strokeLinecap="round"
                        strokeColor={{
                            '0%': '#108ee9',
                            '100%': '#87d068',
                        }}
                    />
                </div>
            </>
        )
    }
}
export default modal
