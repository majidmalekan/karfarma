import React, {Component} from 'react'
import './../css/app.css';
import NavBar from './navbar'
import Mobile from './Mobile'
import {Link} from "react-router-dom";
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import Pagination from "../../node_modules/react-bootstrap/cjs/Pagination";
import {ClassicSpinner} from "react-spinners-kit";
import axios from "axios";
import history from "./history";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		width:'100%',
		marginTop: theme.spacing(2),
	},
}));
class inboxTrash extends Component {
    state = {
        description: '',
        scope: '',
        name: '',
        pic: null,
        show: false,
        projects: [],
        project: '',
        payments: [],
        payment: '',
        loading: false,
        error: '',
        department: null,
        showConfirm: false,
        showSuccess: false,
        activeClass: '10',
        priority: '',
        departments:[],
        scopes: []

    };

    constructor(props) {
        super(props);
        this.otherScope = this.otherScope.bind(this);
        this.paymentMessage = this.paymentMessage.bind(this);
        this.projectMessage = this.projectMessage.bind(this);
        this.otherMessage = this.otherMessage.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onDescriptionChange = this.onDescriptionChange.bind(this);
        this.onPicChange = this.onPicChange.bind(this);
        this.onScopeChange = this.onScopeChange.bind(this);
        this.onPayChange = this.onPayChange.bind(this);
        this.onProjectChange = this.onProjectChange.bind(this);
        this.onPriorityChange = this.onPriorityChange.bind(this);
        this.onDepartmentChange = this.onDepartmentChange.bind(this);

    }

    handleClose = () => {
        this.setState({show: false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShow = () => {
        this.setState({show: true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };

    handleShowConfirm = () => {
        this.setState({showConfirm: true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleShowSuccess = () => {
        this.setState({showSuccess: true});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };
    handleCloseSuccess = () => {
        this.setState({showSuccess: false});
	    let element = document.querySelector(".MuiAlert-message");
	    element.style.width = '100%';
    };

    renderDepartment() {
        if (this.state.department === "1") {
            return (
                <>
                    <div className="mt-5">
                        <label>عنوان تیکت</label>
                        <select onChange={this.onScopeChange} className="input border mr-5" style={{width:'80%'}}>
                            <option value="">...</option>
                            {this.state.scopes.map((scope,index)=>{
                                if (scope.department_id===1){
                                    return(
                                    <option value={scope.scope_id}>{scope.name}</option>
                                    )
                                }
                            })}
                        </select>
                    </div>
                    {this.renderScope()}
                </>
            )
        }
        if (this.state.department === "2") {
            return (
                <>
                    <div className="mt-5">
                        <label>عنوان تیکت</label>
                        <select onChange={this.onScopeChange} className="input border mr-5" style={{width:'80%'}}>
                                <option value="">...</option>
                                {this.state.scopes.map((scope,index)=>{
                                    if (scope.department_id===2){
                                        return(
                                            <option value={scope.scope_id}>{scope.name}</option>
                                        )
                                    }
                                })}
                        </select>
                    </div>
                    {this.renderScope()}
                </>
            )
        }
        if (this.state.department === "3") {
            return (
                <>
                    <div className="mt-5">
                        <label>عنوان تیکت</label>
                        <input onChange={this.onNameChange} value={this.state.name} type="text" className="input w-full border mt-2"
                               placeholder="لطفا عنوان تیکت خود را وارد کنید"/>
                    </div>
                    <div className="mt-3">
                        <label>توضیحات</label>
                        <div className="mt-2">
                            <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8"
                                      className="input border mt-2" style={{height: "180px", width: '100%'}}
                                      name="editor">
                            </textarea>
                        </div>
                    </div>
                    <div className="mt-3">
                    </div>
                    <div className="mt-5">
                        <div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
                            <label style={{fontSize: "22px"}}>فایل پیوند</label>
                            <div className="preview">
                                {this.renderUploadFile()}
                            </div>
                        </div>
                    </div>
                    <button onClick={this.otherMessage} type="button" className="button w-24 bullshit-blue flex justify-center shadow-md text-white m-auto">
                        {this.state.loading ? <div className="flex justify-center text-center">
                            <ClassicSpinner size={25} color="#fff"/>
                        </div> : "تایید"}
                    </button>
                </>
            )
        }
    }

    renderScope() {
        if (this.state.scope === "8" || this.state.scope === "10") {
            return (
                <>
                    <div className="mt-3">
                        <label>شماره فاکتور</label>
                        <select onChange={this.onPayChange} className="input border mr-5" style={{width:'80%'}}>
                            <option value="">پرداخت مورد نظر خود را انتخاب کنید</option>
                            {this.state.payments.map(pay => <option value={pay.id}> {pay.orderId} </option>)}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label>توضیحات</label>
                        <div className="mt-2">
                            <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8"
                                      className="input border mt-2" style={{height: "180px", width: '100%'}}
                                      name="editor">
                            </textarea>
                        </div>
                    </div>
                    <div className="mt-3">
                    </div>
                    <div className="mt-5">
                        <div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
                            <label style={{fontSize: "22px"}}>فایل پیوند</label>
                            <div className="preview">
                                {this.renderUploadFile()}
                            </div>
                        </div>
                    </div>
                    <button onClick={this.paymentMessage} className="flex justify-center button w-24 bullshit-blue shadow-md text-white m-auto">
                        {this.state.loading ? <div className="flex justify-center text-center">
                            <ClassicSpinner size={25} color="#fff"/>
                        </div> : "تایید"}
                    </button>
                </>
            )
        }
        else if (this.state.scope === "4" || this.state.scope === "5" || this.state.scope === "6" || this.state.scope === "7" || this.state.scope === "9" || this.state.scope === "14") {
            return (
                <>
                    <div className="mt-3">
                        <label>نام پروژه</label>
                        <select onChange={this.onProjectChange} className="input border mr-5" style={{width:'80%'}}>
                            <option value="">...</option>
                            {this.state.projects.map(project => <option
                                value={project.project_id}> {project.title} </option>)}
                        </select>
                    </div>
                    <div className="mt-3">
                        <label>توضیحات</label>
                        <div className="mt-2">
                            <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8"
                                      className="input border mt-2" style={{height: "180px", width: '100%'}}
                                      name="editor">
                            </textarea>
                        </div>
                    </div>
                    <div className="mt-3">
                    </div>
                    <div className="mt-5">
                        <div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
                            <label style={{fontSize: "22px"}}>فایل پیوند</label>
                            <div className="preview">
                                {this.renderUploadFile()}
                            </div>
                        </div>
                    </div>
                    <button onClick={this.projectMessage} className="flex justify-center button w-24 bullshit-blue shadow-md text-white m-auto">
                        {this.state.loading ? <div className="flex justify-center text-center">
                            <ClassicSpinner size={25} color="#fff"/>
                        </div> : "تایید"}
                    </button>
                </>
            )
        }
        else {
            return (
                <>
                    <div className="mt-3">
                        <label>توضیحات</label>
                        <div className="mt-2">
                            <textarea onChange={this.onDescriptionChange} value={this.state.description} rows="8"
                                      className="input border mt-2" style={{height: "180px", width: '100%'}}
                                      name="editor">
                            </textarea>
                        </div>
                    </div>
                    <div className="mt-3">
                    </div>
                    <div className="mt-5">
                        <div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
                            <label style={{fontSize: "22px"}}>فایل پیوند</label>
                            <div className="preview">
                                {this.renderUploadFile()}
                            </div>
                        </div>
                    </div>
                    <button onClick={this.otherScope}  className="flex justify-center button w-24 bullshit-blue shadow-md text-white m-auto">
                        {this.state.loading ? <div className="flex justify-center text-center">
                            <ClassicSpinner size={25} color="#fff"/>
                        </div> : "تایید"}
                    </button>
                </>
            )
        }

    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/showSupport', {
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
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        payments: result.data.payments,
                        projects: result.data.projects,
                        departments:result.data.department,
                        scopes:result.data.scope
                    })
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

    renderImage() {
        if (this.state.imageUrl !== '0') {
            return (
                <img alt=""
                     className="rounded-full"
                     src={this.state.imageUrl}/>
            )
        } else if (this.state.imageUrl === '0') {
            return (
                <img alt=""
                     className="rounded-full"
                     src={require("./../images/profile-2.jpg")}/>
            )
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
                                فایل خود را میتوانید بارگذاری کنید
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

    render() {
        return (
            <>
                <body className="app just" dir={"rtl"}>
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top disable="yes"/>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12">
                                <div className="intro-y box">
	                                <div className={useStyles.root}>

		                                <Collapse in={this.state.show}>
			                                <div className="p-3">
				                                <Alert
					                                style={{fontFamily: 'IRANSans'}}
					                                severity="error"
				                                >
					                                <div style={{display: 'flex', width: '100%'}}>
						                                <div className="mr-auto">
							                                <button className="mr-auto" style={{outline: 'none'}}
							                                        onClick={this.handleClose}><FeatherIcon icon="x"/>
							                                </button>
						                                </div>
					                                </div>
					                                <div className="flex">
						                                فیلدهای الزامی خالی می باشد
					                                </div>

				                                </Alert>
			                                </div>
		                                </Collapse>
		                                <Collapse in={this.state.showConfirm}>
			                                <div className="p-3">
				                                <Alert
					                                style={{fontFamily: 'IRANSans'}}
					                                severity="error"
				                                >
					                                <div style={{display: 'flex', width: '100%'}}>
						                                <div className="mr-auto">
							                                <button className="mr-auto" style={{outline: 'none'}}
							                                        onClick={this.handleClose}><FeatherIcon icon="x"/>
							                                </button>
						                                </div>
					                                </div>
					                                <div style={{display: 'flex'}}>
						                                {this.state.error}
					                                </div>
				                                </Alert>
			                                </div>
		                                </Collapse>
		                                <Collapse in={this.state.showSuccess}>
			                                <div className="p-3">
				                                <Alert
					                                style={{fontFamily: 'IRANSans'}}
					                                severity="success"
				                                >
					                                <div style={{display: 'flex', width: '100%'}}>
						                                <div className="mr-auto">
							                                <button className="mr-auto" style={{outline: 'none'}}
							                                        onClick={this.handleClose}><FeatherIcon icon="x"/>
							                                </button>
						                                </div>
					                                </div>
					                                <div style={{display: 'flex'}}>
						                                تغییر اطلاعات کاربری شما با موفقیت ثبت گردید
					                                </div>
				                                </Alert>
			                                </div>
		                                </Collapse>
	                                </div>
                                    <div className=" flex flex-col sm:flex-row items-center p-5 border-b border-gray-200 bullshit">
                                        <div className="flex items-center">
                                            <h2 className="font-medium text-lg text-base ">
                                                پشتیبانی
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                            <label>انتخاب دپارتمان</label>
                                            <select onChange={this.onDepartmentChange}
                                                    className="input w-64 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">...</option>
                                                {this.state.departments.map((department,index)=>{
                                                    return(
                                                        <option value={department.department_id}>{department.name}</option>
                                                    )
                                                })}
                                            </select>
                                            <label className="mr-2">اولویت</label>
                                            <select onChange={this.onPriorityChange}
                                                    className="input w-56 border mr-2 ">
                                                <option style={{color: '#B6C1CF'}} value="">...</option>
                                                <option value={1}>بحرانی</option>
                                                <option value={2}>متوسط</option>
                                                <option value={3}>کم</option>
                                            </select>
                                        </div>
                                        {this.renderDepartment()}

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

    onPayChange(event) {
        this.setState({payment: event.target.value});
    }

    onPriorityChange(event) {
        this.setState({priority: event.target.value});
    }

    onProjectChange(event) {
        this.setState({project: event.target.value});
    }

    onDepartmentChange(event) {
        this.setState({department: event.target.value});
    }

    otherScope() {
        let {description,department, scope, pic, priority} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (scope === '' || department==='' || priority === '' || description === '') {
            this.handleShow()
        } else {
            this.setState({loading: true});
            if (pic === null) {
                fetch('https://test.skenap.ir/api/v1/addSupportComplete', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        api_token: apiToken,
                        user_id: user_id,
                        scope:scope,
                        priority:priority,
                        department:department,
                        description:description,
                        parent_id:0
                    }),
                }).then((response) => response.json())
                    .then((result) => {
                        console.log(result);
                        if (result.stats === 'success') {
                            this.setState({
                                loading: false,
                                showSuccess: true,
                            });
	                        let element = document.querySelector(".MuiAlert-message");
	                        element.style.width = '100%';
	                        history.push('./showSupport')
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
            if (pic !== null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('department', department);
                data.append('priority', priority);
                data.append('file', pic);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportComplete", data).then(res => {
                    console.log(res);
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false,
                        })
                    }
                })
            }
        }
    }

    projectMessage() {
        let {description,department,scope, pic, priority, project} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        console.log()
        if (scope === '' || description === '' ||department==='' || priority === '' || project === '') {
            this.handleShow()
        } else {
            this.setState({loading: true});
            if (pic === null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('department', department);
                data.append('priority', priority);
                data.append('project_id', project);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportProject", data).then(res => {
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
                        history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
            if (pic !== null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('priority', priority);
                data.append('department', department);
                data.append('project_id', project);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('file', pic);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportProject", data).then(res => {
                    console.log(res);
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        })
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
        }
    }

    paymentMessage() {
        let {description, scope,department, pic, priority, payment} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if (scope === '' || description === ''|| department==='' || priority === '' || payment === '') {
            this.handleShow()
        } else {
            this.setState({loading: true});
            if (pic === null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('priority', priority);
                data.append('department', department);
                data.append('payment_id', payment);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportPayment", data).then(res => {
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
            if (pic !== null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('scope', scope);
                data.append('priority', priority);
                data.append('payment_id', payment);
                data.append('department', department);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('file', pic);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportPayment", data).then(res => {
                    console.log(res);
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
        }
    }

    otherMessage() {
        let {description,department, name, pic, priority} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        if ( name === '' ||department==='' || priority === '' || description === '') {
            this.handleShow()
        } else {
            this.setState({loading: true});
            if (pic === null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('priority', priority);
                data.append('name', name);
                data.append('department', department);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportOther", data).then(res => {
                    console.log(res.data);
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
            if (pic !== null) {
                let data = new FormData();
                data.append('api_token', apiToken);
                data.append('priority', priority);
                data.append('name', name);
                data.append('user_id', user_id);
                data.append('description', description);
                data.append('department', department);
                data.append('file', pic);
                data.append('parent_id', '0');
                axios.post("https://test.skenap.ir/api/v1/addSupportOther", data).then(res => {
                    console.log(res);
                    if (res.data.stats === 'success') {
                        this.setState({
                            loading: false,
                            showSuccess: true,
                        });
	                    let element = document.querySelector(".MuiAlert-message");
	                    element.style.width = '100%';
	                    history.push('./showSupport')
                    } else if (res.data.stats === 'error') {
                        this.setState({
                            error: res.data,
                            showConfirm: true,
                            loading: false
                        })
                    }
                })
            }
        }
    }
}

export default inboxTrash
