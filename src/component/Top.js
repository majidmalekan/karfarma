import React,{Component} from 'react'
import './../css/app.css';
import mobile from './Mobile'
import NavBar from './navbar'
import {Button,Modal} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import axios from "axios";
import {MagicSpinner} from "react-spinners-kit";

class Top extends Component {
    state={
        user:[],
        imageUrl:null,
        render: false
    };
    _logOut=()=> {
        localStorage.removeItem('apiToken');
        localStorage.removeItem('user_id');
        this.setState({isLogin:false});
        history.push('./')
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
                        imageUrl:"https://test.skenap.ir/public" + result.data.avatar,
                        render:true
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
        if (this.state.imageUrl!=="https://test.skenap.ir/public0"){
            return(
                <img alt="" className="rounded-full"
                     src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl==="https://test.skenap.ir/public0"){
            return(
                <img alt="" src={require("./../images/profile-12.jpg")}/>
            )
        }
    }

    renderAll(){
        if (this.state.render===true){
            return(
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
                        <div className="status font-medium mr-5"> گرامی{this.state.user.fullName}کارفرمای عزیز </div>
                    </div>
                    <div className="w-75 h-75 relative mr-auto" style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                        <button onClick={this._logOut}
                                className="flex items-center block p-2 transition  duration-300 ease-in-out hover:bg-theme-1 rounded-md mr-5" style={{backgroundColor:'#410430',color:'#fff',fontSize:'14px'}}>
                            <FeatherIcon icon="log-out" className="w-4 h-4 ml-1"/>
                            خروج
                        </button>
                    </div>
                </div>
            )
        } else if (this.state.render===false){
            return (
                <body>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    height: '100vh'
                }}>
                    <MagicSpinner className="m-auto" size={250} color="#410430" style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center'
                    }}/>
                </div>
                </body>

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
                        <div className="flex status  mr-5">
                            <p className="text-gray-600 ml-1">کارفرمای گرامی، </p> <p className="font-bold ml-1">{''+this.state.user.fullName+' '}</p> <p className="text-gray-600"> عزیز </p></div>
                    </div>
                    <div className="w-75 h-75 relative mr-auto" style={{flexDirection:'row',display:'flex',alignItems:'center'}}>
                        <button onClick={this._logOut}
                                className="flex items-center block p-2 transition  duration-300 ease-in-out hover:bg-theme-1 rounded-md mr-5" style={{backgroundColor:'#410430',color:'#fff',fontSize:'14px'}}>
                            <FeatherIcon icon="log-out" className="w-4 h-4 ml-1"/>
                            خروج
                        </button>
                    </div>
                </div>
            </>
        )
    }
}
export default Top
