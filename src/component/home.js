import React,{Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import Modal from 'react-modal';
import { ClassicSpinner } from "react-spinners-kit";
import FeatherIcon from 'feather-icons-react';
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

class sendProject extends Component {
    state={
        description:'',
        scope:'',
        name:'',
        pic:null,
        show:false,
        index:[],
        loading:false,
        error:'',
        showConfirm:false,
        activeClass:'3'

    };
    constructor(props){
        super(props);
        this.loginUp=this.loginUp.bind(this);
        this.onNameChange=this.onNameChange.bind(this);
        this.onDescriptionChange=this.onDescriptionChange.bind(this);
        this.onPicChange=this.onPicChange.bind(this);
        this.onScopeChange=this.onScopeChange.bind(this);
    }
    handleClose  = () =>{
        this.setState({show:false});
    };
    handleShow  = () =>{
        this.setState({show:true});
    };
    onNameChange(event) {
        this.setState({ name: event.target.value });
    }
    onDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    onPicChange(event) {
        this.setState({ pic: event.target.files[0] });
    }
    onScopeChange(event) {
        this.setState({ scope: event.target.value });
    }
    handleShowConfirm  = () =>{
        this.setState({showConfirm:true});
    };
    handleCloseConfirm  = () =>{
        this.setState({showConfirm:false});
    };


    render(){
        return(
            <>
                <body className="app just" dir={"rtl"}>
                </body>
            </>
        )
    }
}
export default sendProject
