import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import Modal from 'react-modal';
import {ClassicSpinner, MagicSpinner} from "react-spinners-kit";
import {Line} from 'rc-progress';
import FeatherIcon from 'feather-icons-react';
import {Link, useLocation} from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';
import NumberFormat from "react-number-format";

class meetingDetail extends Component {
    state = {
        pic: null,
        show: false,
        loading: false,
        error: '',
        showConfirm: false,
        activeClass: '3',
        meeting: [],
        render: false
    };


    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };


    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (this.props.location.state === undefined) {
            const query = new URLSearchParams(this.props.location.search);
            const meet_id = query.get('meet_id');
            fetch('https://test.skenap.ir/api/v1/meetingDetail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    meet_id: meet_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            meeting: result.data[0],
                            render: true
                        });
                    } else if (result.stats === 'error') {
                        this.setState({error: result.data, showConfirm: true})
                    } else if (result.stats === 'failed') {
                        this.setState({error: result.data, showConfirm: true})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        } else {
            const meet_id = this.props.location.state.meet_id;
            fetch('https://test.skenap.ir/api/v1/meetingDetail', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    meet_id: meet_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            meeting: result.data[0],
                            render: true

                        });
                    } else if (result.stats === 'error') {
                        this.setState({error: result.data, showConfirm: true})
                    } else if (result.stats === 'failed') {
                        this.setState({error: result.data, showConfirm: true})
                    }
                })
                .catch((err) => {

                    alert(err);
                });
        }


    }
    renderAll() {
        if (this.state.render === true) {
            return (
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top/>
                        <div className="tab-content mt-5">
                            <div className="tab-content__pane active" id="profile">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="intro-y box col-span-12">
                                        <div className="flex items-center px-5 py-3 border-b border-gray-200">
                                            <h2 className="font-medium text-base ml-auto">
                                                توضیحات جلسه توسط پشتیبان
                                            </h2>
                                        </div>
                                        <div className="slick-carousel py-5" id="new-products">
                                            <div className="px-5">
                                                <div className="flex flex-col lg:flex-row items-center pb-5 text-gray-700" style={{textAlign:'justify',lineHeight:'2rem'}}>
                                                    {this.state.meeting.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </body>
            )
        } else if (this.state.render === false) {
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

    render() {

        return (
            <>
                {this.renderAll()}
            </>
        )
    }
}

export default meetingDetail
