import React,{Component} from 'react'
import './../css/app.css';
import mobile from './Mobile'
import NavBar from './navbar'
import {Button,Modal} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import axios from "axios";

class jsuttop extends Component {
    state={
        user:[],
        imageUrl:null,
    };
    _logOut=()=> {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('user_id');
        this.setState({isLogin:false});
        history.push('/')
    };
    componentDidMount(){
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showPass', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token:apiToken,
                user_id: user_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        user: result.data.user[0],
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar
                    });
                    console.log(this.state.imageUrl)
                } else if (result.stats === 'error') {
                    this.setState({error: result.data})
                } else if (result.stats === 'failed') {
                    this.setState({error: result.data})
                }
            })
            .catch((err) => {

                alert(err);
            });
    }
    renderImage(){
        if (this.state.imageUrl!=='0'){
            return(
                <img alt="" className="rounded-full"
                     src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl==='0'){
            return(
                <img alt="" src={require("./../images/profile-12.jpg")}/>
            )
        }
    }

    render(){
        return(
            <>
                <div className="top-bar" style={{justifyContent: "center"}}>
                    <div className="intro-x relative ml-3 sm:mr-6">
                        <div className="search hidden sm:block">
                            <Link className="notification sm:hidden" to="/karfarma/inbox"> <FeatherIcon icon="search"
                                                                                               className="notification__icon"/>
                            </Link>

                        </div>
                    </div>
                    <div className="intro-x dropdown w-75 h-75 relative ml-auto" style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                        <div className="dropdown-toggle w-12 h-12 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
                            {this.renderImage()}
                        </div>
                        <div className="font-medium mr-5">{this.state.user.fullName}</div>
                        <button onClick={this._logOut}
                                className="flex items-center block p-2 transition  duration-300 ease-in-out hover:bg-theme-1 rounded-md mr-5" style={{backgroundColor:'#410430',color:'#fff'}}>
                            <FeatherIcon icon="log-out" className="w-4 h-4 ml-1"/>
                            خروج
                        </button>
                        <div className="p-2">
                            <Link to="/karfarma/profile"
                                onClick={ (event) => event.preventDefault() }
                                  className="flex items-center block p-2 transition duration-300 ease-in-out hover:bg-theme-1 rounded-md" style={{cursor:'default',backgroundColor:'#410430',color:'#fff'}}>
                                <FeatherIcon icon="user" className="w-4 h-4 ml-1"/> اطلاعات کاربری </Link>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default jsuttop
