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
const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
            width: '100%',
        },
    },
}));

class singleProject extends Component {
    state = {
        pic: null,
        show: false,
        loading: false,
        error: '',
        showConfirm: false,
        activeClass: '3',
        project: [],
        task: [],
        phaze: [],
        payment: [],
        render: false
    };

    constructor(props) {
        super(props);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPicChange = this.onPicChange.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
    }

    handleClose = () => {
        this.setState({show: false});

    };
    handleShow = () => {
        this.setState({show: true});
        let element = document.querySelector(".MuiAlert-message");
        element.style.width = '100%';
    };

    onNameChange(event) {
        this.setState({name: event.target.value});
    }

    onDescriptionChange(event) {
        this.setState({description: event.target.value});
    }

    onPicChange(event) {
        this.setState({pic: event.target.files[0]});
    }

    onScopeChange(event) {
        this.setState({scope: event.target.value});
    }

    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };

    renderConfirmation(param) {
        if (param.confirmation === '1') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    تایید شده
                </div>
            )
        } else if (param.confirmation === '2') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    رد شده
                </div>
            )
        } else if (param.confirmation === '0') {
            return (
                <div className="font-semibold text-theme-1 text-lg">
                    بررسی نشده
                </div>
            )
        }
    }

    renderDownload(param) {
        if (param === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>دریافت
                    فایل</button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={param} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">دریافت فایل</a>
                </button>
            )
        }
    }

    renderReport(file) {
        if (file === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>دریافت
                    گزارش</button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={file} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">دریافت گزارش</a>
                </button>
            )
        }
    }


    renderDownloadTask(param) {
        if (param === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>
                    <FeatherIcon icon="download" className="w-4 h-4 "/>
                </button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={param} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">
                    <FeatherIcon icon="download" className="w-4 h-4 "/>
                </a>
                </button>
            )
        }
    }

    renderReportTask(file) {
        if (file === null) {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}} onClick={this.handleShow}>
                    <FeatherIcon icon="file-text" className="w-4 h-4 mb-1"/>
                </button>
            )
        } else {
            return (
                <button className="text-gray-600 text-xs" style={{outline: 'none'}}><a href={file} target="_blank"
                                                                                       style={{outline: 'none'}}
                                                                                       download="sproc">
                    <FeatherIcon icon="file-text" className="w-4 h-4 mb-1"/>
                </a>
                </button>
            )
        }
    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (this.props.location.state === undefined) {
            const query = new URLSearchParams(this.props.location.search);
            const project_id = query.get('project_id');
            fetch('https://test.skenap.ir/api/v1/viewSingleProject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    project_id: project_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    if (result.stats === 'success') {
                        this.setState({
                            project: result.data.arrayProject[0],
                            task: result.data.arrayTask,
                            phaze: result.data.arrayPhaze,
                            payment: result.data.arrayPayment,
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
            const project_id = this.props.location.state.project_id;
            fetch('https://test.skenap.ir/api/v1/viewSingleProject', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    api_token: apiToken,
                    user_id: user_id,
                    project_id: project_id
                }),
            }).then((response) => response.json())
                .then((result) => {
                    console.log(result);
                    console.log('home', result.data.arrayProject);

                    if (result.stats === 'success') {
                        this.setState({
                            project: result.data.arrayProject[0],
                            task: result.data.arrayTask,
                            phaze: result.data.arrayPhaze,
                            payment: result.data.arrayPayment,
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

    renderUploadFile() {
        if (this.state.pic === null) {
            return (
                <form data-single="true"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file" onChange={this.onPicChange} type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="dz-message" data-dz-message>
                            <div className="text-lg font-medium">
                                عکس خود را میتوانید بارگذاری کنید
                            </div>
                            <div className="text-gray-600">
                                فایل مورد نظر خود را هم میتوانید در اینجا بکشید هم انتخاب کنید
                            </div>
                        </div>
                    </div>
                </form>

            );
        } else {
            return (
                <form data-single="true" action="/file-upload"
                      className="dropzone border-gray-200 border-dashed">
                    <div className="fallback">
                        <input name="file" onChange={this.onPicChange} type="file"/>
                    </div>
                    <div className="dz-message" data-dz-message>
                        <div className="text-lg font-medium">
                            <h2>اطلاعات فایل:</h2>

                        </div>
                        <div className="text-gray-600 mt-2">
                            <p className="mt-2">نام فایل: {this.state.pic.name}</p>
                            <p>نوع فایل: {this.state.pic.type}</p>
                        </div>
                    </div>
                </form>
            );
        }
    };


    renderStatus(param){
        if (param.status_id===1){
            return(
                <div className="text-yellow-700">
                    {param.status}
                </div>
            )
        } else if (param.status_id===2){
            return(
                <p className="text-green-700">
                    {param.status}
                </p>
            )
        } else if (param.status_id===3){
            return(
                <p className="text-red-700">
                    {param.status}
                </p>
            )
        } else if (param.status_id===4){
            return(
                <p className="text-blue-700">
                    {param.status}
                </p>
            )
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
                        <div className="intro-y box col-span-12 lg:col-span-12">
                            <div  className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit" >
                                <h2 className="font-medium text-base ml-auto">
	                                توضیحات پروژه
                                </h2>
                            </div>
                            <div className="flex flex-col lg:flex-row border-b border-gray-200 pb-5 -mx-5 mt-3">
                                <div className="flex flex-1 px-5 items-center justify-center lg:justify-start">
                                    <div className="mr-5">
                                        <div
                                            className="w-24 text-center sm:w-40 truncate sm:whitespace-normal font-medium text-lg">
                                            {this.state.project.title}
                                        </div>
                                        <div className="text-gray-600 text-center">{this.state.project.scope}</div>
                                    </div>
                                </div>
                                <div
                                    className="flex mt-6 lg:mt-0 items-center lg:items-start flex-1 flex-col justify-center text-gray-600 px-5 border-l border-r border-gray-200 border-t lg:border-t-0 pt-5 lg:pt-0">
                                    <div className="truncate sm:whitespace-normal flex items-center"><FeatherIcon
                                        icon="user" className="w-4 h-4 ml-2"/>
                                        {this.state.project.fullName}
                                    </div>
                                    <div className="truncate sm:whitespace-normal flex items-center mt-3"><FeatherIcon
                                        icon="mail" className="w-4 h-4 ml-2"/>
                                        {this.state.project.email}
                                    </div>
                                    <div className="truncate sm:whitespace-normal flex items-center mt-3"><FeatherIcon
                                        icon="code" className="w-4 h-4 ml-2"/>
                                        {this.state.project.support}
                                    </div>
                                </div>
                                <div
                                    className="mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-gray-200 pt-5 lg:pt-0">
                                    <div className="text-center rounded-md w-20 py-3">
                                        <div
                                            className="font-semibold text-theme-1 text-lg">{this.state.project.countTask}</div>
                                        <div className="text-gray-600">تعداد فاز ها</div>
                                    </div>
                                    <div className="text-center rounded-md w-40 py-3">
                                        <div className="font-semibold text-theme-1 text-lg">
                                            <NumberFormat value={this.state.project.fullPrice} displayType={'text'}
                                                          suffix={' تومان'}
                                                          thousandSeparator={true}/>
                                        </div>
                                        <div className="text-gray-600">قیمت کل</div>
                                    </div>
                                    <div className="text-center rounded-md w-20 py-3">
                                        <div
                                            className="font-semibold text-theme-1 text-lg">{this.state.project.time}</div>
                                        <div className="text-gray-600">تاریخ اتمام</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="tab-content mt-5">
                            <div className="tab-content__pane active" id="profile">
                                <div className="grid grid-cols-12 gap-6">
                                    <div className="intro-y box col-span-12">
                                                <div className="slick-carousel py-5" id="new-products">
                                                    <div className="px-5">
                                                        <div className="flex flex-col lg:flex-row items-center pb-5 text-gray-600" style={{textAlign:'justify',lineHeight:'2rem'}}>
                                                            {this.state.project.text}
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-12">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                            <h2 className="font-medium text-base ml-auto">
                                                پرداخت ها
                                            </h2>
                                        </div>
                                        <div className="p-5">

                                                    <table className="table table-report sm:mt-2"
                                                           style={{textAlign: "right", direction: 'rtl'}}>
                                                        <thead>
                                                        <tr>
                                                            <th className="whitespace-no-wrap text-gray-700">ردیف</th>
                                                            <th className="whitespace-no-wrap text-gray-700">شماره فاکتور</th>
                                                            <th className="whitespace-no-wrap text-gray-700">نام فاز</th>
                                                            <th className="whitespace-no-wrap text-gray-700">مبلغ کلی</th>
                                                            <th className="whitespace-no-wrap text-gray-700">تاریخ سررسید فاکتور</th>
                                                            <th className=" whitespace-no-wrap text-gray-700">وضعیت</th>
                                                            <th className=" whitespace-no-wrap text-gray-700">جزییات</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {this.state.payment.map((pay, index) => {
                                                            return (
                                                        <tr className="bg-gray-200" key={index}>
                                                            <td className="border-b">
                                                                {index + 1}
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.orderId}
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.phaze}
                                                            </td>
                                                            <td className="border-b">
                                                                <NumberFormat value={pay.price} displayType={'text'}
                                                                              suffix={' تومان'}
                                                                              thousandSeparator={true}/>
                                                            </td>
                                                            <td className="border-b">
                                                                {pay.dateExpire}
                                                            </td>
                                                            <td className="border-b">
                                                                {this.renderStatus(pay)}
                                                            </td>
                                                            <td className="border-b">
                                                                <div className="flex items-center">
                                                                    <Link to={{
                                                                        pathname: '/karfarma/invoice?payment_id=' + pay.pay_id,
                                                                        state: {
                                                                            payment_id: pay.pay_id
                                                                        },
                                                                    }} target="_parent"
                                                                          className="flex items-center mr-3">
                                                                        <FeatherIcon icon="check-square"
                                                                                     className="w-4 h-4 mr-1"/> ادامه
                                                                    </Link>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                            )
                                                        })
                                                        }
                                                        </tbody>
                                                    </table>

                                        </div>
                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-6">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                            <h2 className="font-medium text-base ml-auto">
                                                فاز های پروژه
                                            </h2>
                                        </div>
                                        <div className={useStyles.root}>
                                            <Collapse style={{width: '100%'}} in={this.state.show}>
                                                <Alert
                                                    style={{fontFamily: 'IRANSans', width: '100%'}}
                                                    severity="error"
                                                >
                                                    <div style={{display: 'flex', width: '100%'}}>
                                                        <AlertTitle style={{
                                                            marginRight: 8,
                                                            fontFamily: 'IRANSans'
                                                        }}>اخطار</AlertTitle>
                                                        <div className="mr-auto">
                                                            <button className="mr-auto" style={{outline: 'none'}}
                                                                    onClick={this.handleClose}><FeatherIcon icon="x"/>
                                                            </button>
                                                        </div>

                                                    </div>

                                                    <div style={{display: 'flex'}}>
                                                        فایلی برای دریافت بارگذاری نشده است.
                                                    </div>

                                                </Alert>
                                            </Collapse>
                                        </div>
                                            {this.state.phaze.map((d, index) => {
                                                    return (
	                                                    <div className="p-5 border border-gray-300">
                                                        <div className="flex items-center">
                                                            <div className="mr-4">
                                                                <a className="font-medium">{d.title}</a>
                                                                <div className="text-gray-600 text-xs">{d.countTask}</div>
                                                            </div>
                                                            <div className="flex mr-auto">
                                                                {
                                                                    this.renderReport(d.file)
                                                                }
                                                                <div className="mr-3">
                                                                    {
                                                                        this.renderDownload(d.uploadUrl)
                                                                    }
                                                                </div>

                                                            </div>
                                                        </div>
                                                        </div>
                                                    )
                                                }
                                            )}
                                    </div>
                                    <div className="intro-y box col-span-12 lg:col-span-6">
                                        <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                            <h2 className="font-medium text-base ml-auto">
                                                وضعیت فازها
                                            </h2>
                                        </div>
                                                    {this.state.phaze.map((d, index) => {
                                                        return (
	                                                        <div className="p-6  border border-gray-300 ">
                                                                <div className="flex items-center mt-1">
                                                                    <div
                                                                        className="text-gray-700 ml-auto">{d.title}</div>
                                                                    <div
                                                                        className="font-medium text-center">{d.progress + '%'}</div>
                                                                </div>
                                                                {/*<div className="w-full h-1 mt-2 bg-gray-400 rounded-full">*/}
                                                                {/*<div className="w-1/2 h-full bg-theme-1 rounded-full"></div>*/}
                                                                {this.renderLinePhaze(d.progress)}
                                                                {/*</div>*/}
                                                            </div>
                                                        )
                                                    })
                                                    }
                                    </div>
                                    {
                                        this.state.phaze.map((d, index) => {
                                            return (
                                                <div className="intro-y box col-span-12 lg:col-span-6">
                                                    <div
                                                        className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200 bullshit">
                                                        <h2 className="font-medium text-base ml-auto">
                                                            {d.title}
                                                        </h2>
                                                        <div className="flex mr-auto">
                                                            {
                                                                this.renderReport(d.file)
                                                            }
                                                            <div className="mr-3">
                                                                {
                                                                    this.renderDownload(d.uploadUrl)
                                                                }
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className={useStyles.root}>
                                                        <Collapse style={{width: '100%'}} in={this.state.show}>
                                                            <Alert
                                                                style={{fontFamily: 'IRANSans', width: '100%'}}
                                                                severity="error"
                                                            >
                                                                <div style={{display: 'flex', width: '100%'}}>
                                                                    <div className="mr-auto">
                                                                        <button className="mr-auto"
                                                                                style={{outline: 'none'}}
                                                                                onClick={this.handleClose}><FeatherIcon
                                                                            icon="x"/></button>
                                                                    </div>

                                                                </div>

                                                                <div style={{display: 'flex'}}>
                                                                    فایلی برای دریافت بارگذاری نشده است.
                                                                </div>

                                                            </Alert>
                                                        </Collapse>
                                                    </div>


                                                        {this.state.task.map((t, index) => {
                                                                if (t.parent_id === d.phaze_id)
                                                                    return (
	                                                                    <div className="p-5 border border-gray-300">
                                                                        <div className="flex items-center mt-2 ">
                                                                            <a className="font-medium">{t.title}</a>
                                                                            <div className="flex items-center mr-4">
                                                                                {this.renderLine(t.progress)}
                                                                                {/*<Line*/}
                                                                                {/*percent={t.progress}*/}
                                                                                {/*strokeWidth="1"*/}
                                                                                {/*strokeColor="#2c0421"*/}
                                                                                {/*style={{width: '50%'}}*/}
                                                                                {/*/>*/}
                                                                                <div
                                                                                    className="text-gray-600 text-xs mr-2 ">{t.progress + '%'}</div>
                                                                            </div>


                                                                            <div className="flex mr-auto">
                                                                                {
                                                                                    this.renderReportTask(t.file)
                                                                                }
                                                                                <div className="mr-3">
                                                                                    {
                                                                                        this.renderDownloadTask(t.uploadUrl)
                                                                                    }
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                        </div>
                                                                    )
                                                            }
                                                        )}

                                                </div>
                                            )
                                        })
                                    }


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

    download(param) {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch(param.uploadUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((result) => {
                if (result.stats === 'success') {
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


    renderLine(progress) {
        if (progress < 30) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="4"
                    trailWidth="4"
                    strokeColor="#A30015"
                    style={{width: '50%'}}
                />
            )

        } else if (progress >= 30 && progress < 70) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="4"
                    trailWidth="4"
                    strokeColor="#EDD83D"
                    style={{width: '50%'}}
                />
            )
        } else if (progress >= 70 && progress < 90) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="4"
                    trailWidth="4"
                    strokeColor="#6AB547"
                    style={{width: '50%'}}
                />
            )
        }
        else if (progress >= 90 && progress <= 100) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="4"
                    trailWidth="4"
                    strokeColor="#628B48"
                    style={{width: '50%'}}
                />
            )
        }
    }


    renderLinePhaze(progress) {
        if (progress < 30) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#A30015"

                />
            )

        } else if (progress >= 30 && progress < 70) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#EDD83D"

                />
            )
        } else if (progress >= 70 && progress < 90) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#6AB547"
                    style={{width: '50%'}}
                />
            )
        }
        else if (progress >= 90 && progress <= 100) {
            return (
                <Line
                    percent={progress}
                    strokeWidth="1"
                    strokeColor="#628B48"
                    style={{width: '50%'}}
                />
            )
        }
    }
}

export default singleProject
