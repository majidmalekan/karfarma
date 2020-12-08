import React, {Component} from 'react'
import './../css/app.css';
import NavBar from './navbar'
import Mobile from './Mobile'
import FeatherIcon from 'feather-icons-react';
import Top from './Top'
import {ClassicSpinner} from "react-spinners-kit";
import axios from "axios";
import history from "./history";
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
	root: {
		'& > * + *': {
			marginTop: theme.spacing(2),
			width: '100%',
		},
	},
}));
class inboxTrash extends Component {
    state = {
        description: '',
        scope: '',
        name: '',
	    imageUrl:null,
	    imageUrlSup:null,
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
	    addMessage:false,
        priority: '',
        departments:[],
        scopes: [],
	    messages:[],
	    supports:[],
        user:'',
        supporter:'',
		parent_id: '',
	    status: '',
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
    };
	handleShow = () => {
		this.setState({show: true});
		let element = document.querySelector(".MuiAlert-message");
		element.style.width = '100%';
	};

    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };
    handleShowSuccess = () => {
        this.setState({showSuccess: true});
    };
    handleCloseSuccess = () => {
        this.setState({showSuccess: false});
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
                    <button onClick={this.otherMessage} type="button" className="button bg-theme-1 text-white mt-5"
                            style={{
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
                </>
            )
        }
    }

    renderScope() {
        if (this.state.scope === "8" || this.state.scope === "9") {
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
                    <button onClick={this.paymentMessage} type="button" className="button bg-theme-1 text-white mt-5"
                            style={{
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
                </>
            )
        }
        else if (this.state.scope === "4" || this.state.scope === "5" || this.state.scope === "6" || this.state.scope === "7" || this.state.scope === "10" || this.state.scope === "14") {
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
                    <button onClick={this.projectMessage} type="button" className="button bg-theme-1 text-white mt-5"
                            style={{
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
                    <button onClick={this.otherScope} type="button" className="button bg-theme-1 text-white mt-5"
                            style={{
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
                </>
            )
        }

    }

    componentDidMount() {
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
	    const query = new URLSearchParams(this.props.location.search);
	    const support_id = query.get('support_id');
	    fetch(`${process.env.REACT_APP_API_PROXY}supportDetail`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
	            support_id:support_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({
                        payments: result.data.payments,
                        projects: result.data.projects,
                        departments:result.data.department,
                        scopes:result.data.scope,
                        messages:result.data.arrays,
	                    status:result.data.arrays[0],
	                    user:result.data.user[0],
	                    supporter:result.data.supporter[0],
	                    parent_id:result.data.parent_id,
	                    imageUrl:"https://test.skenap.ir/public" + result.data.avatar,
	                    imageUrlSup:"https://test.skenap.ir/public" + result.data.avatarSup,
                    });
	                console.log(this.state.messages[0]);
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
	renderDownload(param) {
		if (param === '') {
			return (
				<button className=" text-xs" style={{outline: 'none'}} onClick={this.handleShow}>دریافت
					فایل</button>
			)
		} else {
			return (
				<button className="text-xs" style={{outline: 'none'}}><a href={param} target="_blank"
				                                                                       style={{outline: 'none'}}
				                                                                       download="sproc">دریافت فایل</a>
				</button>
			)
		}
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
	renderImageSup(){
		if (this.state.imageUrlSup!=="https://test.skenap.ir/public0"){
			return(
				<img alt="" className="rounded-full"
				     src={this.state.imageUrlSup}/>
			)
		} else if (this.state.imageUrlSup==="https://test.skenap.ir/public0"){
			return(
				<img alt="" src={require("./../images/profile-12.jpg")}/>
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

		                        <div className="intro-y box ">

			                        <div
				                        className=" flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
				                        style={{justifyContent: "center"}}>

				                        <div className="flex items-center">
					                        <h2 className="font-medium text-lg text-base text-gray-600">
						                        پشتیبانی
					                        </h2>
				                        </div>
				                        {
				                        	this.renderActive(this.state.status)
				                        }

			                        </div>
			                        <div className={useStyles.root}>
				                        <Collapse style={{width: '100%'}} in={this.state.show}>
					                        <Alert
						                        style={{fontFamily: 'IRANSans', width: '100%'}}
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
							                        فایلی برای دریافت بارگذاری نشده است.
						                        </div>

					                        </Alert>
				                        </Collapse>
			                        </div>
					                        {this.state.messages.map((d, index) => {
					                            if (d.sender===1){
						                            return (
							                            <div className="p-5 col-span-6" id="input">
								                            <div className="intro-y box col-span-12 lg:col-span-6">
									                            <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
										                            <div className="dropdown-toggle w-12 h-12 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
											                            {this.renderImage()}
										                            </div>
										                            <h2 className="font-medium text-base ml-auto mr-3">
                                                                        {this.state.user.fullName}
										                            </h2>
									                            </div>
							                            <div className="p-5 border border-gray-300 ml-auto">
								                            <div className="flex items-center">
									                            <div className="mr-4">
										                            <a className="font-medium">{d.code}</a>
										                            <div className="text-gray-600 text-xs">{d.department}</div>
									                            </div>
									                            <div className="m-auto">
										                            {d.scope}
									                            </div>
									                            <div className="mr-auto">
                                                                    {this.renderDownload(d.file)}
									                            </div>
									                            <div className="flex mr-auto text-gray-700">
										                            {d.date}
									                            </div>
								                            </div>
								                            <div className="mr-3 mt-3 text-justify">
									                            {
										                            d.description
									                            }

								                            </div>
							                            </div>
								                            </div>

							                            </div>
						                            )
                                                } else if (d.sender===2){
						                            return (
							                            <div className="p-5" id="input">
								                            <div className="intro-y box col-span-12 lg:col-span-6">
									                            <div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
										                            <div className="dropdown-toggle w-12 h-12 rounded-full overflow-hidden shadow-lg image-fit zoom-in">
											                            {this.renderImageSup()}
										                            </div>
										                            <h2 className="font-medium text-base ml-auto text-gray-700 mr-3">
											                            {this.state.supporter.fullName}
										                            </h2>
									                            </div>
							                            <div className="p-5 border border-gray-300 mr-auto">
								                            <div className="flex items-center">
									                            <div className="mr-4">
										                            <a className="font-medium">{d.code}</a>
										                            <div className="text-gray-600 text-xs">{d.department}</div>
									                            </div>
									                            <div className="m-auto">
										                            {d.scope}
									                            </div>
									                            <div className="mr-auto">
										                            {this.renderDownload(d.file)}
									                            </div>
									                            <div className="flex mr-auto">
										                            {d.date}
									                            </div>
								                            </div>
								                            <div className="mr-3 mt-3 text-justify text-gray-700">
									                            {
										                            d.description
									                            }

								                            </div>
							                            </div>
								                            </div>

							                            </div>
						                            )
                                                }

						                        }
					                        )}


		                        </div>
	                        </div>
                            {this.renderMessage()}

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
		let {description,department, scope, pic, priority,parent_id} = this.state;
		let apiToken = localStorage.getItem('apiToken');
		let user_id = localStorage.getItem('user_id');
		if (scope === '' || department==='' || priority === '' || description === '') {
			this.handleShow()
		} else {
			this.setState({loading: true});
			if (pic === null) {
				fetch(`${process.env.REACT_APP_API_PROXY}addSupportComplete`, {
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
						parent_id:parent_id
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportComplete`, data).then(res => {
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
		let {description,department,scope, pic, priority, project,parent_id} = this.state;
		let apiToken = localStorage.getItem('apiToken');
		let user_id = localStorage.getItem('user_id');
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportProject`, data).then(res => {
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportProject`, data).then(res => {
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
		let {description, scope,department, pic, priority, payment,parent_id} = this.state;
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportPayment`, data).then(res => {
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportPayment`, data).then(res => {
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
		let {description,department, name, pic, priority,parent_id} = this.state;
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportOther`, data).then(res => {
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
				data.append('parent_id', parent_id);
				axios.post(`${process.env.REACT_APP_API_PROXY}addSupportOther`, data).then(res => {
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
	active(){
		this.setState({addMessage:true});
	}

	renderMessage() {
        if (this.state.addMessage===true){
            return(
	            <div className="intro-y col-span-12">
		            <div className="intro-y box">
			            <div className="p-3">
				            <Collapse in={this.state.show}>
					            <Alert
						            style={{fontFamily: 'IRANSans'}}
						            severity="error"
					            >
						            <AlertTitle
							            style={{marginRight: 8, fontFamily: 'IRANSans'}}>اخطار</AlertTitle>
						            فیلدهای الزامی خالی می باشد
					            </Alert>
				            </Collapse>
				            <Collapse in={this.state.showConfirm}>
					            <Alert
						            style={{fontFamily: 'IRANSans'}}
						            severity="error"
					            >
						            <AlertTitle
							            style={{marginRight: 8, fontFamily: 'IRANSans'}}>اخطار</AlertTitle>
						            {this.state.error}
					            </Alert>
				            </Collapse>
				            <Collapse in={this.state.showSuccess}>
					            <Alert
						            style={{fontFamily: 'IRANSans'}}
						            severity="success"
					            >
						            <AlertTitle
							            style={{marginRight: 8, fontFamily: 'IRANSans'}}>موفق</AlertTitle>
						            درخواست پشتیبانی شما با موفقیت ثبت گردید
					            </Alert>
				            </Collapse>
			            </div>
			            <div className="p-5" id="input">
				            <div className="preview">
					            <label>انتخاب دپارتمان</label>
					            <select onChange={this.onDepartmentChange}
					                    className="input w-56 border mr-2">
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
            )
        }
	}

	renderActive(status) {
    	console.log(status);
		if (status.status!=='بسته'){
			return(
			<button onClick={this.active.bind(this)} className=" mr-auto button text-white bg-theme-1">
				پاسخ جدید
			</button>
			)
		}
	}
}

export default inboxTrash
