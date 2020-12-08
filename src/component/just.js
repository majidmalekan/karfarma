import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import Top from './Top'
import Modal from 'react-modal';
import {Button, Spinner} from 'react-bootstrap'
import history from "./history";
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import axios from "axios";
import {ClassicSpinner} from "react-spinners-kit";
import {DateTimeInput, DateTimeInputSimple} from 'react-hichestan-datetimepicker';


const customStyles = {
    content: {
        top: '30%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '50%',
        transform: 'translate(-50%, -50%)'
    }
};

class just extends Component {
    state = {
        firstName: '',
        index: [],
        lastName: '',
        city: '',
        show: false,
        showConfirm: false,
        showSuccess: false,
        address: '',
        email: '',
        companyName: '',
        username: '',
        loading: false,
        pic: null,
        error: '',
        activeClass: '11',
        finish: '',
        scope: '',
        finish_formatted: '',
        start_formatted: '',
        start: '',
        render:'1',
        phone:''
    };

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showState', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
                    this.setState({
                        index: result.data,
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

    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };
    handleShowSuccess  = () =>{
        this.setState({showSuccess:true});
    };
    handleCloseSuccess  = () =>{
        this.setState({
            showSuccess:false
        });
        history.push('./dashboard')
    };
    constructor(props) {
        super(props);
        this.loginUp = this.loginUp.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onCompanyNameChange = this.onCompanyNameChange.bind(this);
        this.onPicChange = this.onPicChange.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onTimeChange = this.onTimeChange.bind(this);
        this.add = this.add.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
        this.call = this.call.bind(this);

    }

    loginUp() {
        let {firstName, lastName, state, zipCode, address, email, companyName, ID, pic, username} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');

        if (firstName === '' || lastName === '' || state === '' || zipCode === '' || address === '' || email === '' || companyName === '' || ID === '' || username === '') {
            this.handleShow()
        } else {
            this.setState({loading: true});
            if (pic === null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('lastName', lastName);
                data.append('firstName', firstName);
                data.append('user_id', user_id);
                data.append('address', address);
                data.append('email', email);
                data.append('username', username);
                data.append('companyName', companyName);
                axios.post("https://test.skenap.ir/api/v1/completeProfile", data).then(res => {
                    if (res.data.stats === 'success') {
                        this.setState({
                            showSuccess: true
                        })
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true
                        })
                    }
                })
            } else if (pic !== null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('lastName', lastName);
                data.append('firstName', firstName);
                data.append('user_id', user_id);
                data.append('address', address);
                data.append('email', email);
                data.append('username', username);
                data.append('companyName', companyName);
                data.append('file', pic);
                axios.post("https://test.skenap.ir/api/v1/completeProfile", data).then(res => {
                    console.log(res)
                    if (res.data.stats === 'success') {
                        this.setState({
                            showSuccess: true
                        })
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true
                        })
                    }
                })
            }

        }
    }

    addShow() {
        if (this.state.render === '1') {
            return (
                <>
                    <label className="mr-5 ml-2 mt-2">تاریخ</label>
                    <DateTimeInputSimple
                        value={this.state.start}
                        name={'start'}
                        ltr={false}
                        rtl={true}
                        onChange={this.onTimeChange}
                        placeholder="1399/12/12 12:12"
                    />
                    <button onClick={this.add}>
                        <FeatherIcon icon="plus" className="mr-2 flex justify-center align-center "/>
                    </button>
                </>
            )
        }
        else if (this.state.render === '2') {
            return (
                <>
                    <label className="mr-3 ml-2 mt-2">تاریخ</label>
                    <div style={{display:'flex',flexDirection:'row'}}>
                        <DateTimeInputSimple
                            value={this.state.start}
                            name={'start'}
                            ltr={false}
                            onChange={this.onTimeChange}
                            placeholder="1399/12/12 12:12"
                        />
                        <div className="mr-2" style={{display:'flex'}}>
                            <DateTimeInputSimple
                                value={this.state.finish}
                                name={'finish'}
                                ltr={false}
                                onChange={this.onTimeChange}
                                placeholder="1399/12/12 12:12"
                            />
                        </div>

                    </div>

                </>
            )
        }
    }

    add() {
        this.setState({
            render: '2'
        });

    }

    handleClose = () => {
        this.setState({show: false});
    };
    handleShow = () => {
        this.setState({show: true});
    };

    onScopeChange(event) {
        this.setState({scope: event.target.value});
    };
    onFirstNameChange(event) {
        this.setState({firstName: event.target.value});
    };
    onPhoneChange(event) {
        this.setState({phone: event.target.value});
    };

    onLastNameChange(event) {
        this.setState({lastName: event.target.value});
    }

    onPicChange(event) {
        this.setState({pic: event.target.files[0]});
    }

    onAddressChange(event) {
        this.setState({address: event.target.value});
    }

    onEmailChange(event) {
        this.setState({email: event.target.value});
    }

    onCompanyNameChange(event) {
        this.setState({companyName: event.target.value});
    }

    onUsernameChange(event) {
        this.setState({username: event.target.value});
    }

    onTimeChange = (event) => {
        // this.setState({ time: event.target.value });
        const newState = {};
        const t = event.target;
        console.log('target change on the example page : ', t);
        newState[t.name] = t.value;
        newState[t.name + '_formatted'] = t.formatted ? t.formatted : '';
        this.setState(newState, () => {
            console.log('after', this.state)
        });
    };

    call() {
        let {finish_formatted, phoneCall, scope, start_formatted} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (finish_formatted === '' || phoneCall === '' || scope === '') {
            this.handleShow()
        } else {
            if (finish_formatted===''){
                this.setState({loading: true});
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('finish', start_formatted);
                data.append('start', start_formatted);
                data.append('user_id', user_id);
                data.append('scope', scope);
                axios.post("https://test.skenap.ir/api/v1/meeting", data).then(res => {
                    if (res.data.stats === 'success') {
                        history.push('./dashboard')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true
                        })
                    }
                })
            } else if(finish_formatted!==''){
                this.setState({loading: true});
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('finish', finish_formatted);
                data.append('start', start_formatted);
                data.append('user_id', user_id);
                data.append('scope', scope);
                axios.post("https://test.skenap.ir/api/v1/meeting", data).then(res => {
                    if (res.data.stats === 'success') {
                        history.push('./dashboard')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true
                        })
                    }
                })
            }

        }
    }

    renderUploadFile() {
        if (this.state.pic === null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            عکس خود را میتوانید بارگذاری کنید
                        </div>
                        <div className="text-gray-600">
                            فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input onChange={this.onPicChange} name="file" type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600">
                            <p>نام فایل: {this.state.pic.name}</p>
                            <p>نوع فایل: {this.state.pic.type}</p>
                        </div>
                    </div>
                </form>

            );
        }
    };

    render() {
        return (
            <>
                <body className="app just" dir={"rtl"}>
                <Modal
                    isOpen={this.state.show}
                    contentLabel="اخطاریه"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle"
                                                                  class="w-16 h-16 text-theme-12 mx-auto mt-3"/>
                        <div className="text-3xl mt-5">لطفا موارد مورد نیاز را پر کنید</div>
                        <div className="text-gray-600 mt-2">فیلد های الزامی خالی می باشد</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleClose}
                                className="button w-24 bg-theme-1 text-white">بازگشت
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.showConfirm}
                    contentLabel="اخطار"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle"
                                                                  class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div className="text-3xl mt-5">اخطار</div>
                        <div className="text-gray-600 mt-2">{this.state.error}</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleCloseConfirm}
                                className="button w-24 bg-theme-1 text-white">بازگشت
                        </button>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.showSuccess}
                    contentLabel="موفقیت"
                    style={customStyles}
                >
                    <div className="p-5 text-center"><FeatherIcon icon="x-circle" class="w-16 h-16 text-theme-6 mx-auto mt-3"/>
                        <div className="text-3xl mt-5">اخطار</div>
                        <div className="text-gray-600 mt-2">تکمیل اطلاعات شما با موفقیت انجام گردید.</div>
                    </div>
                    <div className="px-5 pb-8 text-center">
                        <button type="button" onClick={this.handleCloseSuccess}
                                className="button w-24 bg-theme-1 text-white">تایید
                        </button>
                    </div>
                </Modal>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="ok"/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent: "center"}}>
                            <div style={{display: 'flex', flexDirection: 'column', width: '90%'}}>
                                <h2 className="text-lg font-medium text-center">
                                    برای درخواست جلسه حضوری یا مشاوره تلفنی زمان مورد نظر خود را تعیین کنید
                                </h2>
                                <div className="preview mt-5 w-full flex flex-row justify-center ">
                                    <label className="mt-2">نوع جلسه</label>
                                    <select onChange={this.onScopeChange} className="input w-25 border mr-2 ">
                                        <option style={{color: '#B6C1CF'}} value="">نوع جلسه خود را انتخاب کنید</option>
                                        <option value="1">حضوری</option>
                                        <option value="2">تلفنی</option>
                                        <option value="3">آنلاین</option>
                                    </select>
                                    {this.addShow()}
                                    <button onClick={this.call} type="button"
                                            className="button bg-theme-1 text-white mr-5" style={{
                                        width: "5%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}>
                                        {this.state.loading ? <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignSelf: 'center',
                                            alignItems: 'center',
                                            textAlign: 'center'
                                        }}>
                                            <ClassicSpinner size={25} color="#fff"/>
                                        </div> : "ثبت"}
                                    </button>

                                </div>
                            </div>

                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-9">
                                <div className="intro-y box lg:right">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent: "center"}}>
                                        <h2 className="font-medium text-base">
                                            فرم تکمیل اطلاعات
                                        </h2>
                                    </div>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                            <div>
                                                <label>نام</label>
                                                <input onChange={this.onFirstNameChange} value={this.state.firstName}
                                                       type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام خود را وارد کنید"/>
                                            </div>

                                            <div className="mt-3">
                                                <label>نام خانوادگی</label>
                                                <input onChange={this.onLastNameChange} value={this.state.lastName}
                                                       type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام خانوادگی خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>نام کاربری</label>
                                                <input onChange={this.onUsernameChange} value={this.state.username}
                                                       type="text" className="input w-full border mt-2"
                                                       placeholder="لطفا نام کاربری خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>ایمیل</label>
                                                <input onChange={this.onEmailChange} value={this.state.email}
                                                       type="email" className="input w-full border mt-2"
                                                       placeholder="لطفا ایمیل خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-3">
                                                <label>نام شرکت (تیم)</label>
                                                <input onChange={this.onCompanyNameChange}
                                                       value={this.state.companyName} type="text"
                                                       className="input w-full border mt-2"
                                                       placeholder="لطفا نام شرکت خود را وارد کنید"/>
                                            </div>

                                            <div className="mt-5">
                                                <label>آدرس</label>
                                                <input onChange={this.onAddressChange} value={this.state.address}
                                                       type="text" className="input input--lg w-full border mt-2"
                                                       placeholder="لطفا آدرس خود را وارد کنید"/>
                                            </div>
                                            <div className="mt-5">

                                                <div className="p-5" id="single-file-upload"
                                                     style={{textAlign: "center"}}>
                                                    <label style={{fontSize: "22px"}}>عکس پروفایل</label>
                                                    <div className="preview">
                                                        {this.renderUploadFile()}

                                                    </div>
                                                </div>

                                            </div>
                                            <button onClick={this.loginUp} type="button"
                                                    className="button bg-theme-1 text-white mt-5" style={{
                                                width: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                margin: "auto"
                                            }}>
                                                {this.state.loading ? <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignSelf: 'center',
                                                    alignItems: 'center',
                                                    textAlign: 'center'
                                                }}>
                                                    <ClassicSpinner size={25} color="#fff"/>
                                                </div> : "تایید"}
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </body>
            </>
        )
    }
}

export default just
