import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {styled} from '@material-ui/core/styles';
import Modal from 'react-modal';
import {ClassicSpinner} from "react-spinners-kit";
import FeatherIcon from 'feather-icons-react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import {DateInput} from 'react-hichestan-datetimepicker';
import Collapse from "@material-ui/core/Collapse";
import {Alert, AlertTitle} from "@material-ui/lab";

import Select from 'react-select'
import {
	Accordion,
	AccordionItem,
	AccordionItemHeading,
	AccordionItemButton,
	AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

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
const MyFormControlLabel = styled(FormControlLabel)({
	fontSize: '13px',
	fontFamily: 'IRANSans',
	marginRight: '0px',
	marginLeft: '8px',
	'& span': {
		fontSize: '13px',
		fontFamily: 'IRANSans',
		padding: '0px'
	}
});
const MyCheckbox = styled(Checkbox)({
	fontSize: '13px',
	fontFamily: 'IRANSans',
	'& span': {
		fontSize: '13px',
		fontFamily: 'IRANSans',
	}
});

class sendProject extends Component {
	state = {
		status: [],
		description: '',
		scope: '',
		name: '',
		pic: null,
		pic2: null,
		pic3: null,
		pic4: null,
		show: false,
		index: [],
		loading: false,
		error: '',
		showConfirm: false,
		activeClass: '7',
		button: false,
		web: true,
		app: true,
		usename: null,
		usename2: null,
		x: [],
		xx: [],
		z: '',
		zz: '',
		sus_id: '',
		sendstatus: false,
		buttontext: 'ارسال',
	};

	constructor(props) {
		super(props);
		this.loginUp = this.loginUp.bind(this);
		this.seSelect = this.seSelect.bind(this);
		this.seSelect1 = this.seSelect1.bind(this);
		this.seSelect2 = this.seSelect2.bind(this);
		this.onPicChange = this.onPicChange.bind(this);
		this.onClickApp = this.onClickApp.bind(this);
		this.onClickWeb = this.onClickWeb.bind(this);
		this.setChange = this.setChange.bind(this);
	}



	componentDidMount() {
		let apiToken = localStorage.getItem('apiToken');
		let user_id = localStorage.getItem('user_id');
		fetch('https://test.skenap.ir/api/v1/showScopes', {
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

	handleClose = () => {
		this.setState({show: false});
	};
	handleShow = () => {
		this.setState({show: true});
	};
	onPicChange(event) {
		console.log(event.target)

		switch (event.target.name) {
			case 'کاتالوگ معرفی شرکت':
				this.setState({pic: event.target.files[0]});
				break;
			case 'کاتالوگ معرفی محصولات':
				this.setState({pic2: event.target.files[0]});
				break;
			case 'اپلود لوگو و فایل‌های گرافیکی':
				this.setState({pic3: event.target.files[0]});
				break;
			case 'محتوای متنی و رسانه‌ای صفحات':
				this.setState({pic4: event.target.files[0]});
				break;
		}

	}
	forms() {
		this.setState({
			loading: true
		});
		if (this.state.x.length !== 0) {
			this.setState(prev => {
				return {
					xx: [...prev.xx, this.state.x[0]]
				}
			});
		}
		setTimeout(() => {
				this.sendData()
			}
			, 1000)
	}

	seSelect(event) {
		if (event !== null) {
			let values1 = Object.values(event)
			console.log(values1, typeof values1)
			const {name, value} = event;
			this.setState((prev) => {
				return {
					xx: [...prev.xx, {[name]: value}]
				}
			});
		}
	}

	seSelect1(event) {
		if (event !== null) {
			let m = ''
			for (const [key, value1] of Object.entries(event)) {
				const {name, value} = value1;
				this.setState({
					z: name
				})
				if (m === '') {
					m += value
				} else {
					m = m + '،' + value
				}
			}
			if (event.length === 1) {
				let zq = Object.entries(event)[0]
				this.setState(prev => {
					return {
						xx: [...prev.xx, {[zq[1].name]: zq[1].value}]
					}
				});

			}
			else {
				this.setState(prev => {
					return {
						xx: [...prev.xx, {[this.state.z]: m}]
					}
				});
			}
		}
	}

	seSelect2(event) {
		if (event !== null) {
			let mm = ''
			for (const [key, value2] of Object.entries(event)) {
				const {name, value} = value2;
				this.setState({
					zz: name
				})
				if (mm === '') {
					mm += value
				} else {
					mm = mm + '،' + value
				}
			}
			if (event.length === 1) {
				let zs = Object.entries(event)[0]
				this.setState(prev => {
					return {
						xx: [...prev.xx, {[zs[1].name]: zs[1].value}]
					}
				});

			}
			else {
				this.setState(prev => {
					return {
						xx: [...prev.xx, {[this.state.zz]: mm}]
					}
				});
			}
		}
	}

	sendData() {
		let {xx, sus_id, pic, pic2, pic3, pic4} = this.state;
		let apiToken = localStorage.getItem('apiToken');
		let user_id = localStorage.getItem('user_id');
		let data = new FormData();

		console.log(this.state)

		data.append("xx", JSON.stringify(xx))
		data.append("api_token", apiToken);
		data.append("user_id", user_id);
		if (this.state.pic !== null) {
			data.append("fileCompany", pic);
		}
		if (this.state.pic2 !== null) {
			data.append("fileProduct", pic2);
		}
		if (this.state.pic3 !== null) {
			data.append("fileGraphic", pic3);
		}
		if (this.state.pic4 !== null) {
			data.append("fileContent", pic4);
		}
		data.append("sus_id", sus_id);
		axios.post('https://test.skenap.ir/api/v1/auRelation', data).then(res => {
			console.log(res.data)
			if (res.data.stats === 'success') {
				this.setState({
					buttontext: 'تایید',
					loading: false,
					sendstatus: true,
					sus_id: res.data
				});
			}
			else if (res.data.stats === 'error') {
				this.setState({error: res.data, showConfirm: true})
			} else if (res.data.stats === 'failed') {
				this.setState({error: res.data, showConfirm: true})
			}
		})
	}

	setForward() {
		this.setState({loading: false});
		history.push({
			pathname: './contract',
			state: {sus_id: this.state.sus_id},
		})
	}

	setChange(event) {
		const {name, value} = event.target;
		if (this.state.usename === name) {
			this.setState({
				x: [{[name]: value}]
			});
		} else if (this.state.usename !== null) {
			this.setState(prev => {
				return {
					xx: [...prev.xx, this.state.x[0]]
				}
			});
		}
		this.setState({usename: name});
	}

	renderUploadFile(param) {
		if (this.state.pic === null) {
			return (
				<form data-single="true"
				      className="dropzone border-gray-200 border-dashed">
					<div className="fallback">
						<input name={param} onChange={this.onPicChange} type="file"/>
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
						<input name={param} onChange={this.onPicChange} type="file"/>
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

	renderUploadFile2(param) {
		if (this.state.pic2 === null) {
			return (
				<form data-single="true"
				      className="dropzone border-gray-200 border-dashed">
					<div className="fallback">
						<input name={param} onChange={this.onPicChange} type="file"/>
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
						<input name={param} onChange={this.onPicChange} type="file"/>
					</div>
					<div className="dz-message" data-dz-message>
						<div className="text-lg font-medium">
							<h2>اطلاعات فایل:</h2>

						</div>
						<div className="text-gray-600 mt-2">
							<p className="mt-2">نام فایل: {this.state.pic2.name}</p>
							<p>نوع فایل: {this.state.pic2.type}</p>
						</div>
					</div>
				</form>
			);
		}
	};

	renderUploadFile3(param) {
		if (this.state.pic3 === null) {
			return (
				<form data-single="true"
				      className="dropzone border-gray-200 border-dashed">
					<div className="fallback">
						<input name={param} onChange={this.onPicChange} type="file"/>
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
						<input name={param} onChange={this.onPicChange} type="file"/>
					</div>
					<div className="dz-message" data-dz-message>
						<div className="text-lg font-medium">
							<h2>اطلاعات فایل:</h2>

						</div>
						<div className="text-gray-600 mt-2">
							<p className="mt-2">نام فایل: {this.state.pic3.name}</p>
							<p>نوع فایل: {this.state.pic3.type}</p>
						</div>
					</div>
				</form>
			);
		}
	};

	renderUploadFile4(param) {
		if (this.state.pic4 === null) {
			return (
				<form data-single="true"
				      className="dropzone border-gray-200 border-dashed">
					<div className="fallback">
						<input name={param} onChange={this.onPicChange} type="file"/>
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
						<input name={param} onChange={this.onPicChange} type="file"/>
					</div>
					<div className="dz-message" data-dz-message>
						<div className="text-lg font-medium">
							<h2>اطلاعات فایل:</h2>

						</div>
						<div className="text-gray-600 mt-2">
							<p className="mt-2">نام فایل: {this.state.pic4.name}</p>
							<p>نوع فایل: {this.state.pic4.type}</p>
						</div>
					</div>
				</form>
			);
		}
	};


	renderFile() {
		if (this.state.sendstatus === false) {
			return (
				<div className="m-5 pb-5">
					<div className="tab-content__pane active" id="profile">
						<div className="grid grid-cols-12 gap-6">
							<div className="intro-y box col-span-12 n-12md:col-spa lg:col-span-3">
								<div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
									<h2 className="font-medium text-base ml-auto">
										کاتالوگ معرفی شرکت
									</h2>
								</div>
								<div className="p-5" id="input">
									<div className="preview">
										<div className="mt-5">
											<div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
												<div className="preview">
													{this.renderUploadFile('کاتالوگ معرفی شرکت')}
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
							<div className="intro-y box col-span-12 lg:col-span-3">
								<div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
									<h2 className="font-medium text-base ml-auto">
										کاتالوگ معرفی محصولات
									</h2>
								</div>
								<div className="p-5" id="input">
									<div className="preview">
										<div className="mt-5">
											<div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
												<div className="preview">
													{this.state.sendstatus ? null : this.renderUploadFile2('کاتالوگ معرفی محصولات')}
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
							<div className="intro-y box col-span-12 lg:col-span-3">
								<div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
									<h2 className="font-medium text-base ml-auto">
										اپلود لوگو و فایل‌های گرافیکی
									</h2>
								</div>
								<div className="p-5" id="input">
									<div className="preview">
										<div className="mt-5">
											<div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
												<div className="preview">
													{this.state.sendstatus ? null : this.renderUploadFile3('اپلود لوگو و فایل‌های گرافیکی')}
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
							<div className="intro-y box col-span-12 lg:col-span-3">
								<div className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
									<h2 className="font-medium text-base ml-auto">
										محتوای متنی و رسانه‌ای صفحات
									</h2>
								</div>
								<div className="p-5" id="input">
									<div className="preview">
										<div className="mt-5">
											<div className="p-5" id="single-file-upload" style={{textAlign: "center"}}>
												<div className="preview">
													{this.renderUploadFile4('محتوای متنی و رسانه‌ای صفحات')}
												</div>
											</div>

										</div>

									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}

	handleChange = (event) => {
		const newState = {};
		const t = event.target;
		console.log('target change on the example page : ', t);
		newState[t.name] = t.value;
		newState[t.name + '_formatted'] = t.formatted ? t.formatted : '';
		this.setState(newState, () => {
			console.log('after', this.state.finishPublic_formatted)
		});
	};


	onClickWeb() {
		this.setState({
			web: !this.state.web,
		});
		if (this.state.web === true) {
			this.state.status.push({
				'sub_id': '17',
				'title': 'طراحی و ساخت وب سایت'
			});
			console.log(this.state.status);
		}
		if (this.state.web === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '17') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	onClickApp() {
		this.setState({
			app: !this.state.app,
		});
		if (this.state.app === true) {
			this.state.status.push({
				'sub_id': '18',
				'title': 'طراحی و ساخت اپلیکیشن'
			});
			console.log(this.state.status);
		}
		if (this.state.app === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '18') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	handleShowConfirm = () => {
		this.setState({showConfirm: true});
	};

	handleCloseConfirm = () => {
		this.setState({showConfirm: false});
	};

	loginUp() {
		this.setState({button: true});
		let {status} = this.state;
		console.log(this.props.location.state.su_id)
		let apiToken = localStorage.getItem('apiToken');
		let user_id = localStorage.getItem('user_id');
		console.log(status);
		fetch('https://test.skenap.ir/api/v1/susRelation', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				api_token: apiToken,
				user_id: user_id,
				status: status,
				su_id: this.props.location.state.su_id
			}),
		}).then((response) => response.json())
			.then((result) => {
				console.log(
					result
				);
				if (result.stats === 'success') {
					this.setState({
						sus_id: result.data,
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


	renderShow() {
		if (this.state.button === true) {
			const site = [
				{
					value: "وبلاگ شخصی",
					label: 'وبلاگ شخصی',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت شخصی یا رزومه",
					label: 'وبسایت شخصی یا رزومه',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "سایت شرکتی یا کاتالوگی",
					label: 'سایت شرکتی یا کاتالوگی',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "سایت خبری",
					label: 'سایت خبری',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبلاگ",
					label: 'وبلاگ',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "لندینگ پیج",
					label: 'لندینگ پیج',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "سایت اداری یا سازمانی",
					label: 'سایت اداری یا سازمانی',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "سایت آموزشیِ",
					label: 'سایت آموزشیِ',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت بازی و سرگرمی",
					label: 'وبسایت بازی و سرگرمی',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت کسب و کارهای استارتاپی",
					label: 'وبسایت کسب و کارهای استارتاپی',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت نمونه کار",
					label: 'وبسایت نمونه کار',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت مالتی مدیا",
					label: 'وبسایت مالتی مدیا',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{
					value: "وبسایت انجمن انلاین",
					label: 'وبسایت انجمن انلاین',
					name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"
				},
				{value: "سایر", label: 'سایر', name: "عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"},
			];
			const field = [
				{value: "پزشکی و سلامت", label: 'پزشکی و سلامت', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "فعالیت‌های ورزشی", label: 'فعالیت‌های ورزشی', name: "زمینه فعالیت طراحی وب سایت"},
				{
					value: "بیوتی و سالن‌های زیبایی",
					label: 'بیوتی و سالن‌های زیبایی',
					name: "زمینه فعالیت طراحی وب سایت"
				},
				{value: "وکالت", label: 'وکالت', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "املاک", label: 'املاک', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "نویسندگی", label: 'نویسندگی', name: "زمینه فعالیت طراحی وب سایت"},
				{
					value: "کارافرینی و اشتغال زایی",
					label: 'کارافرینی و اشتغال زایی',
					name: "زمینه فعالیت طراحی وب سایت"
				},
				{value: "اشپزی", label: 'اشپزی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "تالار و کافه و رستوران", label: 'تالار و کافه و رستوران', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "کنکور", label: 'کنکور', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "اموزش", label: 'اموزش', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "دانشگاه", label: 'دانشگاه', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "فناوری اطلاعات", label: 'فناوری اطلاعات', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "خودرو", label: 'خودرو', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "بورس و سرمایه گذاری", label: 'بورس و سرمایه گذاری', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "کشاورزی", label: 'کشاورزی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "ساختمان سازی", label: 'ساختمان سازی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "صنایع غذایی", label: 'صنایع غذایی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "کفش و پوشاک", label: 'کفش و پوشاک', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "زیورآلات", label: 'زیورآلات', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "کالای لوکس", label: 'کالای لوکس', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "صنعت و کارخانجات", label: 'صنعت و کارخانجات', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "معدن", label: 'معدن', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "تجارت و بازرگانی", label: 'تجارت و بازرگانی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "نانو", label: 'نانو', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "بانکداری", label: 'بانکداری', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "حمل ونقل", label: 'حمل ونقل', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "فعالیت‌های خدماتی", label: 'فعالیت‌های خدماتی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "صادرات و واردات", label: 'صادرات و واردات', name: "زمینه فعالیت طراحی وب سایت"},
				{value: " خدمات آنلاین", label: ' خدمات آنلاین', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "بیمه", label: 'بیمه', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "هتل و گردشگری", label: 'هتل و گردشگری', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "بازی", label: 'بازی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: " دکوراسیون و معماری", label: ' دکوراسیون و معماری', name: "زمینه فعالیت طراحی وب سایت"},
				{value: " خدمات مشاوره", label: ' خدمات مشاوره', name: "زمینه فعالیت طراحی وب سایت"},
				{value: " آژانس‌های هواپیمیایی", label: ' آژانس‌های هواپیمیایی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "محصولات خانگی", label: 'محصولات خانگی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "گالری و عکاسی", label: 'گالری و عکاسی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "ارز و صرافی", label: 'ارز و صرافی', name: "زمینه فعالیت طراحی وب سایت"},
				{value: " انتشارات و چاپ", label: ' انتشارات و چاپ', name: "زمینه فعالیت طراحی وب سایت"},
				{value: "سایر", label: 'سایر', name: "زمینه فعالیت طراحی وب سایت"},
			];
			const design = [
				{value: "طراحی اختصاصی", label: 'طراحی اختصاصی', name: "نوع طراحی طراحی وب سایت"},
				{
					value: "طراحی با استفاده از سیستم‌های مدیریت محتوا (CMS)",
					label: 'طراحی با استفاده از سیستم‌های مدیریت محتوا (CMS)',
					name: "نوع طراحی طراحی وب سایت"
				},
			];
			const language = [
				{value: "1", label: '1', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "2", label: '2', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "3", label: '3', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "4", label: '4', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "5", label: '5', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "6", label: '6', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "7", label: '7', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "8", label: '8', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "9", label: '9', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
				{value: "10", label: '10', name: "وبسایت چند زبانه است؟ طراحی وب سایت"},
			];
			const language4 = [
				{value: "فارسی", label: 'فارسی', name: "زبان مورد نظر تخصصی"},
				{value: "انگلیسی", label: 'انگلیسی', name: "زبان مورد نظر تخصصی"},
			];
			const article3 = [
				{value: "کلاسی-دانشگاهی", label: 'کلاسی-دانشگاهی', name: "نوع مقاله تخصصی"},
				{value: "ISI", label: 'ISI', name: "نوع مقاله تخصصی"},
				{value: "پژوهش آزاد", label: 'پژوهش آزاد', name: "نوع مقاله تخصصی"},
				{value: "پایان نامه", label: 'پایان نامه', name: "نوع مقاله تخصصی"},
				{
					value: "برای انتشار در وبلاگ و وبسایت",
					label: 'برای انتشار در وبلاگ و وبسایت',
					name: "نوع مقاله تخصصی"
				},
			];
			const special = [
				{
					value: "بهینه سازی و بالا بودن سرعت سایت",
					label: 'بهینه سازی و بالا بودن سرعت سایت',
					name: "امکانات ویژه طراحی وب سایت"
				},
				{
					value: "بهینه سازی سئوی تکنیکال",
					label: 'بهینه سازی سئوی تکنیکال',
					name: "امکانات ویژه طراحی وب سایت"
				},
				{value: "طراحی نقشه سایت", label: 'طراحی نقشه سایت', name: "امکانات ویژه طراحی وب سایت"},
				{value: "بهینه سازی طراحی UI/UX", label: 'بهینه سازی طراحی UI/UX', name: "امکانات ویژه طراحی وب سایت"},
				{value: "فعال سازی ابزارهای سئو", label: 'فعال سازی ابزارهای سئو', name: "امکانات ویژه طراحی وب سایت"},
				{
					value: "واکنشگرایی اختصاصی (PWA)",
					label: 'واکنشگرایی اختصاصی (PWA)',
					name: "امکانات ویژه طراحی وب سایت"
				},
			];
			const other = [
				{value: "نظر سنجی", label: 'نظر سنجی', name: "سایر امکانات متداول طراحی وب سایت"},
				{
					value: "سیستم جستجو (پیشرفته)",
					label: 'سیستم جستجو (پیشرفته)',
					name: "سایر امکانات متداول طراحی وب سایت"
				},
				{value: "ارسال خبرنامه", label: 'ارسال خبرنامه', name: "سایر امکانات متداول طراحی وب سایت"},
				{value: "بخش مقالات", label: 'بخش مقالات', name: "سایر امکانات متداول طراحی وب سایت"},
				{value: "بخش اخبار", label: 'بخش اخبار', name: "سایر امکانات متداول طراحی وب سایت"},
				{value: "بخش پیوندها", label: 'بخش پیوندها', name: "سایر امکانات متداول طراحی وب سایت"},
				{
					value: "بخش شبکه‌های اجتماعی",
					label: 'بخش شبکه‌های اجتماعی',
					name: "سایر امکانات متداول طراحی وب سایت"
				},
				{value: "درج بنر تبلیغاتی", label: 'درج بنر تبلیغاتی', name: "سایر امکانات متداول طراحی وب سایت"},
				{value: "قوانین و سیاست‌ها", label: 'قوانین و سیاست‌ها', name: "سایر امکانات متداول طراحی وب سایت"},
				{value: "پرسش و وپاسخ متداول", label: 'پرسش و وپاسخ متداول', name: "سایر امکانات متداول طراحی وب سایت"},
				{
					value: "مشاوره در انتخاب دامنه",
					label: 'مشاوره در انتخاب دامنه',
					name: "سایر امکانات متداول طراحی وب سایت"
				},

			];
			const ready = [
				{value: "بله", label: 'بله', name: "آیا محتوای سایت شما حاضر است؟ طراحی وب سایت"},
				{value: "خیر", label: 'خیر', name: "آیا محتوای سایت شما حاضر است؟ طراحی وب سایت"},
			];
			const news = [
				{
					value: "بله",
					label: 'بله',
					name: "آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ... خواهد داشت؟ طراحی وب سایت"
				},
				{
					value: "خیر",
					label: 'خیر',
					name: "آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ... خواهد داشت؟ طراحی وب سایت"
				},
			];
			const info = [
				{
					value: "بله",
					label: 'بله',
					name: "آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
				},
				{
					value: "خیر",
					label: 'خیر',
					name: "آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
				},
			];
			const image = [
				{
					value: "بله",
					label: 'بله',
					name: "آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
				},
				{
					value: "خیر",
					label: 'خیر',
					name: "آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
				},
			];
			const host = [
				{value: "بله", label: 'بله', name: "آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟ طراحی وب سایت"},
				{value: "خیر", label: 'خیر', name: "آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟ طراحی وب سایت"},
			];
			const logo = [
				{value: "بله", label: 'بله', name: "آیا لوگوی وبسایت شما آماده است؟  طراحی وب سایت"},
				{value: "خیر", label: 'خیر', name: "آیا لوگوی وبسایت شما آماده است؟  طراحی وب سایت"},
			];
			if (this.state.web === false && this.state.app === false) {
				return (
					<>
						{this.state.sendstatus ? this.rendercard() :
							<div className='mt-3'>
								<Tabs>
									<TabList>
										<Tab>طراحی وب سایت</Tab>
									</TabList>
									<TabPanel>
										<div className="p-5" id="input">
											<div className="preview">
												<label>عنوان پروژه یا سایت مورد نظر خود را وارد نمایید.</label>
												<input onChange={this.setChange}
												       type="text"
												       className="input border mt-2 mr-2"
												       style={{width: "90%"}}
												       placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
												       name="عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"/>
												<div className="mt-5">
													<label>نوع وبسایت مورد نظر خود را انتخاب کنید.</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={site}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع وبسایت مورد نظر خود را انتخاب کنید. طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>زمینه فعالیت</label>
													<div className=" mr-2" style={{width: '50%'}}>
														<Select options={field}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="زمینه فعالیت طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>نوع طراحی</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={design}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع طراحی طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت چند زبانه است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={language}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="وبسایت چند زبانه است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت یا سامانه معیار خود را وارد نمائید.</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="وبسایت یا سامانه معیار خود را وارد نمائید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">رنگ‌های سایت را انتخاب کنید.
													</label>
													<div className=" flex mt-3" style={{width: '50%'}}>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ اصلی"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ اصلی سایت. طراحی وب سایت"
														/>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ دوم"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ دوم سایت. طراحی وب سایت"
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">سابقه فعالیت شخص یا شرکت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سابقه فعالیت شخص یا شرکت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4"> تعداد صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="تعداد صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														عناوین صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="عناوین صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														آدرس وبسایت قبلی
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="آدرس وبسایت قبلی طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														مدت زمان مورد نظر برای تحویل
													</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="مدت زمان مورد نظر برای تحویل طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>امکانات ویژه</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={special}
														        placeholder='...'
														        onChange={this.seSelect1}

														        name="امکانات ویژه طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														        styles={{width: '75%'}}
														/>
													</div>

												</div>
												<div className="mt-5">
													<label>سایر امکانات متداول</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={other}
														        placeholder='...'
														        onChange={this.seSelect2}
														        name="سایر امکانات متداول طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														سایر امکانات مورد نظر خود را وارد کنید.
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سایر امکانات مورد نظر خود را وارد کنید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>آیا محتوای سایت شما حاضر است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={ready}
														        placeholder='...'
														        onChange={this.seSelect}
														        className="mr-2"
														        name="آیا محتوای سایت شما حاضر است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={news}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ... خواهد داشت؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={info}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={image}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={host}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا لوگوی وبسایت شما آماده است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={logo}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا لوگوی وبسایت شما آماده است؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="flex mt-10" style={{justifyContent: 'space-around'}}>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="پنل پیامکی می‌خواهم  طراحی وب سایت"/>}
														label="پنل پیامکی می‌خواهم"
														style={{fontSize: '13px'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="دامنه می‌خواهم طراحی وب سایت"/>}
														label="دامنه می‌خواهم"
														style={{fontSize: '13px', fontFamily: 'IRANSans'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     style={{fontSize: '13px'}}
														                     name="مایل به تهیه هاست یا سرور اختصاصی هستم طراحی وب سایت"/>}
														label="هاست یا سروراختصاصی میخواهم"
														style={{fontSize: '13px'}}
													/>
												</div>

												<div className="mt-10">
													<label>توضیحات اختیاری</label>
													<div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات اختیاری طراحی وب سایت"
                                                              rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}>
                                                    </textarea>
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Tabs>
								<Tabs>
									<TabList>
										<Tab>طراحی وب سایت</Tab>
									</TabList>
									<TabPanel>
										<div className="p-5" id="input">
											<div className="preview">
												<label>عنوان پروژه یا سایت مورد نظر خود را وارد نمایید.</label>
												<input onChange={this.setChange}
												       type="text"
												       className="input border mt-2 mr-2"
												       style={{width: "90%"}}
												       placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
												       name="عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"/>
												<div className="mt-5">
													<label>نوع وبسایت مورد نظر خود را انتخاب کنید.</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={site}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع وبسایت مورد نظر خود را انتخاب کنید. طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>زمینه فعالیت</label>
													<div className=" mr-2" style={{width: '50%'}}>
														<Select options={field}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="زمینه فعالیت طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>نوع طراحی</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={design}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع طراحی طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت چند زبانه است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={language}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="وبسایت چند زبانه است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت یا سامانه معیار خود را وارد نمائید.</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="وبسایت یا سامانه معیار خود را وارد نمائید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">رنگ‌های سایت را انتخاب کنید.
													</label>
													<div className=" flex mt-3" style={{width: '50%'}}>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ اصلی"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ اصلی سایت. طراحی وب سایت"
														/>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ دوم"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ دوم سایت. طراحی وب سایت"
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">سابقه فعالیت شخص یا شرکت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سابقه فعالیت شخص یا شرکت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4"> تعداد صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="تعداد صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														عناوین صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="عناوین صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														آدرس وبسایت قبلی
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="آدرس وبسایت قبلی طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														مدت زمان مورد نظر برای تحویل
													</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="مدت زمان مورد نظر برای تحویل طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>امکانات ویژه</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={special}
														        placeholder='...'
														        onChange={this.seSelect1}

														        name="امکانات ویژه طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														        styles={{width: '75%'}}
														/>
													</div>

												</div>
												<div className="mt-5">
													<label>سایر امکانات متداول</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={other}
														        placeholder='...'
														        onChange={this.seSelect2}
														        name="سایر امکانات متداول طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														سایر امکانات مورد نظر خود را وارد کنید.
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سایر امکانات مورد نظر خود را وارد کنید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>آیا محتوای سایت شما حاضر است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={ready}
														        placeholder='...'
														        onChange={this.seSelect}
														        className="mr-2"
														        name="آیا محتوای سایت شما حاضر است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={news}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ... خواهد داشت؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={info}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={image}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={host}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا لوگوی وبسایت شما آماده است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={logo}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا لوگوی وبسایت شما آماده است؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="flex mt-10" style={{justifyContent: 'space-around'}}>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="پنل پیامکی می‌خواهم  طراحی وب سایت"/>}
														label="پنل پیامکی می‌خواهم"
														style={{fontSize: '13px'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="دامنه می‌خواهم طراحی وب سایت"/>}
														label="دامنه می‌خواهم"
														style={{fontSize: '13px', fontFamily: 'IRANSans'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     style={{fontSize: '13px'}}
														                     name="مایل به تهیه هاست یا سرور اختصاصی هستم طراحی وب سایت"/>}
														label="هاست یا سروراختصاصی میخواهم"
														style={{fontSize: '13px'}}
													/>
												</div>

												<div className="mt-10">
													<label>توضیحات اختیاری</label>
													<div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات اختیاری طراحی وب سایت"
                                                              rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}>
                                                    </textarea>
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Tabs>
							</div>
						}
						{this.renderFile()}
						{this.renderButton()}
						<h2 className="text-lg text-center font-medium">
							سوالات متداول
						</h2>
						<div className='flex justify-center'>
							<Accordion className='text-right my-5' style={{width: '97%', borderRadius: '6px'}}
							           allowZeroExpanded={true} allowMultipleExpanded={true}>
								<AccordionItem className='my-1 border border-gray-300'>
									<AccordionItemHeading>
										<AccordionItemButton style={{
											textAlign: 'right',
											backgroundColor: 'white',

											borderBottom: 'solid 1px',
											borderColor: 'rgba(226, 232, 240, 1)'
										}}>
											<h2 style={{fontSize: '16px'}}><strong>راهنمای انتخاب نوع وبسایت</strong>
											</h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>وبسایت شخصی یا روزمه‌ای:</strong> یک وبسایت شخصی، شخصیت شما را نشان
											داده و شما را معرفی میکند. این وبسایت‌ها بهترین و مدرن‌ترین جایگزین برای
											فایل رزومه‌های (.docxیا.pdf ) شماست و به سرعت جلب توجه می‌کنند اما نیاز به
											طراحی دقیق و زیبا دارند. مثل grantbaldwin.com<br/><br/>
											<strong>سایت وبلاگ شخصی:</strong> نوعی وب‌سایت شخصی محتوا محور است. حاوی
											اطلاعاتی مانند: گزارش روزانه، اخبار، یادداشت‌های شخصی، خاطرات روزانه، یا
											مقالات علمی مورد نظر طراح آن است. مثل ehtesabi.com<br/><br/>
											<strong>سایت شرکتی یا کاتالوگی:</strong> سایت‌های کاتالوگی یکی از بهترین
											روش‌ها برای افزایش حضور آنلاین شرکت‌ها و بیزنس‌های کوچک است و هدف اصلی
											آن‌ها: معرفی شرکت، محصولات و خدماتی که ارائه می‌دهد و ارائه راه‌های بسیار
											زیاد برای برقراری مثل آدرس، شماره تماس، ایمیل و… . مثل
											iraalborz.com<br/><br/>
											<strong>سایت خبری:</strong> سایت‌های خبری یک منبع بسیار عالی اطلاعات در تمام
											حیطه‌های خبری است. هدف اصلی این نوع از وبسایت‌ها، ارسال جدیدترین اخبار به
											کاربران در اولین فرصت است. مثل سایت‌های خبرگزاری، nahadiran.ir<br/><br/>
											<strong>سایت فروشگاهی و تجاری:</strong> وبسایت‌های فروشگاهی (تجارت
											الکترونیکی) یک کانال فروش آنلاین بسیار عالی است که امروزه یک راه کار بسیار
											خوب هم برای ارائه محصولات و خدمات شما و هم مدیریت و استفاده راحت آن ارائه می
											دهد. مثل zamannama.com<br/><br/>
											<strong>وبلاگ:</strong> بلاگ یک یا چندین صفحه اینترنتی شخصی یا گروهی است که
											در آن شخص یا گروه به نوشتن مطالب متوالی (روزانه یا چند روز در میان) در
											موضوعات متنوع و دلخواه می‌پردازند. عمده محتوای پردازش شده در وبلاگ‌ عکس،
											متن، فیلم، صوت هستند که مقاله محور پست می‌شوند. مانند
											sanatyaar.net<br/><br/>
											<strong>لندینگ پیج:</strong> هدف اصلی لندینگ پیج‌ها یا وبسایت‌های تک
											صفحه‌ای، تولید کامل‌ترین اطلاعات برای یک محصول خاص (یا یک کسب و کارو
											استارتاپ خاص) است. این وبسایت‌ها به کمک مقالات، ویدیو‌ها، عکس‌ها، ضمانت
											نامه‌ها، تکنولوژی‌ها، نظر سنجی‌ها، گردهمایی‌ها و ... یک محصول یا استارتاپ را
											از بین رقبای آن محصول یا کسب و کار متمایز می‌کنند. مثل nanofil.co<br/><br/>
											<strong>سایت اداری یا سازمانی:</strong> این نوع وبسایت‌ها، ساختار بزرگی
											دارند و سایت اصلی و رسمی یک شرکت یا ارگان است که یک نمایندگی قابل اعتماد از
											آن کسب و کار هستند. ساختن چنین وبسایت‌هایی یک راه حل مطلوب برای تمام
											شرکت‌هاییست که می‌خواهند در زمینه کسب و کار خود پیشرو باشند و عموما 10 تا
											100 صفحه دارند. مثل BCG.com<br/><br/>
											<strong>وبسایت بازی و سرگرمی:</strong> وبسایت‌های سرگرمی می‌توانند بسیار
											بزرگ و پرمحتوا باشند شامل اطلاعات متنوع و مفید یا پست کلیپ های خنده دار.
											همچنین حاوی چندین صفحه از انواع مختلف صفحات وب هستند و بیشترشان از طریق
											تبلیغات کسب درآمد می‌کنند مثل instagram.com<br/><br/>
											<strong>وبسایت کاتالوگی استارتاپ‌ها:</strong> در این وب سایت‌ها، طراحی سایت
											صرفا برای معرفی استارتاپ استفاده می‌شود و خدمات استارتاپ بصورت جداگانه و در
											سایر پلتفرم‌ها، یا درگاه‌ها ارائه می‌شود و وب سایت در نقش معرفی کسب و کار
											عملکرد مخصوص به خود را دارد. مثل doorbaan.com<br/><br/>
											<strong>وبسایت ایده‌های استارتاپی:</strong> در این حالت وب سایت علاوه بر
											معرفی استارتاپ، بخشی از خدمات حوزه استارتاپ را نیز پوشش می‌دهد. یعنی کاربران
											در وب سایت می‌توانند علاوه بر آشنایی، خدمات آن کسب و کار را نیز دریافت کنند.
											نوع خدمات ارائه شده در این گونه وب سایت‌ها بستگی به نوع کسب و کار و ماهیت
											خدمات آن استارتاپ دارد. مثل timeet.org<br/><br/>
											<strong>وبسایت نمونه کار:</strong> وبسایت‌های نمونه کاری به منظور جذب
											مخاطبان گسترده به کمک ارائه بهترین کارهای نویسنده یا صاحب سایت ایجاد می‌شود.
											این دسته از وبسایت‌ها بیشتر بین عکاسان، استودیو‌های عکاسی، طراحان وب و…
											طرفدار دارد. مثل fabianirsara.com<br/><br/>
											<strong>وبسایت پورتال:</strong> ساختار این نوع از وبسایت‌ها همیشه پیچیده است
											و قاعدتا می‌تواند شامل بخش‌ها و زیر بخش‌های متنوع و زیاد، منوهای چند سطحی،
											تعداد زیادی از انواع گزینه‌های مختلف و ماژول‌ها می‌شود که معمولا هم از
											گرافیک پایینی برخوردارند و جنبه درآمدزایی دارند. مثل پورتال‌های واریز شهریه
											دانشگاه‌ها، santanderbank.com<br/><br/>
											<strong>وبسایت مالتی مدیا (یا رسانه پرداز):</strong> وبسایت‌هایی که محوریت
											محتوای آن‌ها صدا و فیلم است. این نوع محتواها، به دلیل محبوبیت بالا، به شما
											کمک می‌کنند تا در زمانی کم (چند ماه)، ترافیک رو به رشدی را بدست آورید؛ مثل
											سایت‌های دانلود فیلم و موسیقی. مثل salamdl.ws<br/><br/>
											<strong>وبسایت انجمن‌های آنلاین:</strong> انجمن‌های آنلاین می‌توانند در دسته
											بندی “درباره همه چیز” و یا اختصاصی برای یک موضوع خاص قرار بگیرند. این گونه
											وب سایت‌ها با نام انجمن گفتگو، فروم، تالار گفتگو و یا تالارگفتمان شناخته
											می‌شوند و پاسخگوی بسیاری پرسش‌ها هستند. مثل stackoverflow.com<br/><br/>
											<strong>وبسایت آموزشی:</strong> یک وبسایت آموزشی برای تبلیغ یک موسسه آموزشی
											یا فهرستی از موسسات تشکیل شده است و حاوی اطلاعات جامع در مورد موسسه، محتوای
											آموزشی، مدرسین، فرصت‌های آموزشی و دستاوردهای آن‌هاست. مثل
											roocket.ir<br/><br/>
											<strong>تفاوت وبسایت و وبلاگ:</strong><br/><br/>
											وبلاگ صرفا به منظور اطلاع رسانی و انتشار مطالب و محتوای متنی و رسانه‌ای
											ساخته می‌شود. اما وب سایت اینگونه نیست، از وب سایت به منظور ارائه خدمات
											استفاده می‌شود . وبلاگ‌ها قابلیت این را ندارند که خدمات آنلاین را انجام دهند
											اما وب سایت‌ها به منظور ارائه خدمات و کاتالوگ‌های آنلاین ساخته می‌شوند.
											وبلاگ یک رسانه‌ای‌است که در بازه‌های زمانی کوتاه آپدیت می‌شود و در بازه‌های
											زمانی مشخص و یا نامشخص مطالب خود را به روز می‌کنند در صورتی که وبسایت‌ها
											معمولا دچار تغییرات زیاد نمی‌شوند.<br/><br/>
											<strong>تفاوت وبسایت و پورتال:</strong><br/><br/>
											پورتال‌ها معمولا بانک‌های اطلاعاتی هستند که می‌توانند به عنوان یک پلتفرم
											مشترک توسط شرکت‌های مختلف مورداستفاده قرار گیرند تا انواع اطلاعاتی که یک
											کاربر ممکن است حین جستجوی خدمات نیاز داشته باشد را فراهم کند. از رایج‌ترین
											نمونه‌های آن: پورتال‌های دولتی، پورتال‌های آموزشی، پورتال‌های شرکتی،
											پورتال‌های فرهنگی و … است.
											سایت وب، مجموعه ی از صفحات مرتبط به یکدیگر است که انبوهی از اطلاعات را در
											قالب متن، تصویر، صدا، و فیلم در اختیار کاربران عمومی قرار می‌دهد. وب سایت،
											مکان حضور هر شخص یا شرکت در شبکه اینترنت است. یک وب سایت می‌تواند علاوه بر
											ایجاد ارتباط و معرفی صاحب سایت، امکان اطلاع رسانی بروز، بازاریابی، افزایش
											بازدید و معرفی بین المللی را نیز فراهم آورد.
											یکی از مهم‌ترین جنبه‌های تفاوت بین پورتال و وب سایت جنبه اقتصادی آن است.
											پورتال‌ها عموما” برای کسب درآمد ساخته شده‌اند و درآمدهای خود را از طریق
											تبلیغات کسب می‌نمایند همچنین، وب سایت و پورتال از جهت اطلاعات شخصی‌سازی شده
											و سرعت دسترسی با هم تفاوت دارند. پورتال برای ارائه اطلاعات شخصی‌سازی شده به
											کاربران استفاده می‌شود در حالی که عملکرد سایت به گونه‌ای دیگر است. علاوه بر
											این، تمرکز وب سایت بر جذب کاربران بیشتر است، یعنی بالا بردن ترافیک وب سایت،
											اما وب پورتال برای کاربران خاصی است. این باعث می‌شود ترافیک تا حدودی محدود
											شود و فقط به کاربران خاصی اجازه بازدید از پورتال می‌دهد.<br/><br/>

										</h5>
									</AccordionItemPanel>
								</AccordionItem>
								<AccordionItem className='my-1 border border-gray-300'>
									<AccordionItemHeading>
										<AccordionItemButton style={{
											textAlign: 'right',
											backgroundColor: 'white',
											borderBottom: 'solid 1px',
											borderColor: 'rgba(226, 232, 240, 1)'
										}}>
											<h2 style={{fontSize: '16px'}}><strong>طراحی اپلیکیشن</strong></h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											In ad velit in ex nostrud dolore cupidatat consectetur
											ea in ut nostrud velit in irure cillum tempor laboris
											sed adipisicing eu esse duis nulla non.
										</h5>
									</AccordionItemPanel>
								</AccordionItem>
							</Accordion>
						</div>
					</>
				)
			}
			else if (this.state.web === false) {
				return (
					<>
						{this.state.sendstatus ? this.rendercard() :
							<div>
								<Tabs>
									<TabList>
										<Tab>طراحی وب سایت</Tab>
									</TabList>
									<TabPanel>
										<div className="p-5" id="input">
											<div className="preview">
												<label>عنوان پروژه یا سایت مورد نظر خود را وارد نمایید.</label>
												<input onChange={this.setChange}
												       type="text"
												       className="input border mt-2 mr-2"
												       style={{width: "90%"}}
												       placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
												       name="عنوان پروژه یا سایت مورد نظر خود را وارد نمایید. طراحی وب سایت"/>
												<div className="mt-5">
													<label>نوع وبسایت مورد نظر خود را انتخاب کنید.</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={site}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع وبسایت مورد نظر خود را انتخاب کنید. طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>زمینه فعالیت</label>
													<div className=" mr-2" style={{width: '50%'}}>
														<Select options={field}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="زمینه فعالیت طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>نوع طراحی</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={design}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="نوع طراحی طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت چند زبانه است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={language}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="وبسایت چند زبانه است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>وبسایت یا سامانه معیار خود را وارد نمائید.</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="وبسایت یا سامانه معیار خود را وارد نمائید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">رنگ‌های سایت را انتخاب کنید.
													</label>
													<div className=" flex mt-3" style={{width: '50%'}}>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ اصلی"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ اصلی سایت. طراحی وب سایت"
														/>
														<input onChange={this.setChange}
														       type="text"
														       placeholder="رنگ دوم"
														       className="input  border mt-2 mr-2"
														       style={{width: "40%"}}
														       name="انتخاب رنگ دوم سایت. طراحی وب سایت"
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">سابقه فعالیت شخص یا شرکت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سابقه فعالیت شخص یا شرکت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4"> تعداد صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="تعداد صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														عناوین صفحات سایت
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="عناوین صفحات سایت طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														آدرس وبسایت قبلی
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="آدرس وبسایت قبلی طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														مدت زمان مورد نظر برای تحویل
													</label>
													<input onChange={this.setChange}
													       type="text"
													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="مدت زمان مورد نظر برای تحویل طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>امکانات ویژه</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={special}
														        placeholder='...'
														        onChange={this.seSelect}

														        name="امکانات ویژه طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														        styles={{width: '75%'}}
														/>
													</div>

												</div>
												<div className="mt-5">
													<label>سایر امکانات متداول</label>
													<div className="mr-2" style={{width: '90%'}}>
														<Select options={other}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="سایر امکانات متداول طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														        isClearable={true}
														        isMulti
														/>
													</div>
												</div>
												<div className="mt-5">
													<label className="ml-4">
														سایر امکانات مورد نظر خود را وارد کنید.
													</label>
													<input onChange={this.setChange}
													       type="text"

													       className="input  border mt-2 mr-2"
													       style={{width: "90%"}}
													       name="سایر امکانات مورد نظر خود را وارد کنید. طراحی وب سایت"
													/>
												</div>
												<div className="mt-5">
													<label>آیا محتوای سایت شما حاضر است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={ready}
														        placeholder='...'
														        onChange={this.seSelect}
														        className="mr-2"
														        name="آیا محتوای سایت شما حاضر است؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={news}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا وب سایت شما بخشی برای اخبار، مقالات، تازه‌ها، وبلاگ ... خواهد داشت؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟ </label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={info}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری
														تصاویر، اینفوگرافیک و ...
														خواهد داشت؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={image}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا فکر می‌کنید وب سایت شما بخش‌های بصری مانند نمودار، گالری تصاویر، اینفوگرافیک و ... خواهد داشت؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={host}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا سرویس میزبانی (هاست یا سرور اختصاصی) دارید؟ طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="mt-5">
													<label>آیا لوگوی وبسایت شما آماده است؟</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={logo}
														        placeholder='...'
														        onChange={this.seSelect}
														        name="آیا لوگوی وبسایت شما آماده است؟  طراحی وب سایت"
														        isSearchable={true}
														        isRTL={true}
														/>
													</div>
												</div>
												<div className="flex mt-5">
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="پنل پیامکی می‌خواهم  طراحی وب سایت"/>}
														label="پنل پیامکی می‌خواهم"
														style={{fontSize: '13px'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     name="دامنه می‌خواهم طراحی وب سایت"/>}
														label="دامنه می‌خواهم"
														style={{fontSize: '13px', fontFamily: 'IRANSans'}}
													/>
													<MyFormControlLabel
														control={<MyCheckbox onChange={this.seSelect}
														                     style={{fontSize: '13px'}}
														                     name="مایل به تهیه هاست یا سرور اختصاصی هستم طراحی وب سایت"/>}
														label="هاست یا سروراختصاصی میخواهم"
														style={{fontSize: '13px'}}
													/>
												</div>
												<div className="tab-content mt-5">
													<div className="tab-content__pane active" id="profile">
														<div className="grid grid-cols-12 gap-6">
															<div
																className="intro-y box col-span-12 n-12md:col-spa lg:col-span-3">
																<div
																	className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
																	<h2 className="font-medium text-base ml-auto">
																		کاتالوگ معرفی شرکت
																	</h2>
																</div>
																<div className="p-5" id="input">
																	<div className="preview">
																		<div className="mt-5">
																			<div className="p-5" id="single-file-upload"
																			     style={{textAlign: "center"}}>
																				<div className="preview">
																					{this.renderUploadFile()}
																				</div>
																			</div>

																		</div>
																		<button onClick={this.nationalId} type="button"
																		        className="button bg-theme-1 text-white mt-5"
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

																	</div>
																</div>
															</div>
															<div className="intro-y box col-span-12 lg:col-span-3">
																<div
																	className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
																	<h2 className="font-medium text-base ml-auto">
																		کاتالوک معرفی محصولات
																	</h2>
																</div>
																<div className="p-5" id="input">
																	<div className="preview">
																		<div className="mt-5">
																			<div className="p-5" id="single-file-upload"
																			     style={{textAlign: "center"}}>
																				<div className="preview">
																					{this.renderUploadFile()}
																				</div>
																			</div>

																		</div>
																		<button onClick={this.nationalId} type="button"
																		        className="button bg-theme-1 text-white mt-5"
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

																	</div>
																</div>
															</div>
															<div className="intro-y box col-span-12 lg:col-span-3">
																<div
																	className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
																	<h2 className="font-medium text-base ml-auto">
																		اپلود لوگو و فایل‌های گرافیکی
																	</h2>
																</div>
																<div className="p-5" id="input">
																	<div className="preview">
																		<div className="mt-5">
																			<div className="p-5" id="single-file-upload"
																			     style={{textAlign: "center"}}>
																				<div className="preview">
																					{this.renderUploadFile()}
																				</div>
																			</div>

																		</div>
																		<button onClick={this.nationalId} type="button"
																		        className="button bg-theme-1 text-white mt-5"
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

																	</div>
																</div>
															</div>
															<div className="intro-y box col-span-12 lg:col-span-3">
																<div
																	className="flex items-center px-5 py-5 sm:py-3 border-b border-gray-200">
																	<h2 className="font-medium text-base ml-auto">
																		محتوای متنی و رسانه‌ای صفحات
																	</h2>
																</div>
																<div className="p-5" id="input">
																	<div className="preview">
																		<div className="mt-5">
																			<div className="p-5" id="single-file-upload"
																			     style={{textAlign: "center"}}>
																				<div className="preview">
																					{this.renderUploadFile()}
																				</div>
																			</div>

																		</div>
																		<button onClick={this.nationalId} type="button"
																		        className="button bg-theme-1 text-white mt-5"
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

																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div className="mt-5">
													<label>توضیحات اختیاری</label>
													<div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات اختیاری طراحی وب سایت"
                                                              rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}>
                                                    </textarea>
													</div>
												</div>
											</div>
										</div>
									</TabPanel>
								</Tabs>
							</div>
						}
						{this.renderFile()}
						{this.renderButton()}
						<h2 className="text-lg text-center font-medium">
							سوالات متداول
						</h2>
						<div className='flex justify-center'>
							<Accordion className='text-right my-5' style={{width: '97%', borderRadius: '6px'}}
							           allowZeroExpanded={true} allowMultipleExpanded={true}>
								<AccordionItem className='my-1 border border-gray-300'>
									<AccordionItemHeading>
										<AccordionItemButton style={{
											textAlign: 'right',
											backgroundColor: 'white',
											borderBottom: 'solid 1px',
											borderColor: 'rgba(226, 232, 240, 1)'
										}}>
											<h2 style={{fontSize: '16px'}}><strong>راهنمای انتخاب نوع وبسایت</strong>
											</h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>وبسایت شخصی یا روزمه‌ای:</strong> یک وبسایت شخصی، شخصیت شما را نشان
											داده و شما را معرفی میکند. این وبسایت‌ها بهترین و مدرن‌ترین جایگزین برای
											فایل رزومه‌های (.docxیا.pdf ) شماست و به سرعت جلب توجه می‌کنند اما نیاز به
											طراحی دقیق و زیبا دارند. مثل grantbaldwin.com<br/><br/>
											<strong>سایت وبلاگ شخصی:</strong> نوعی وب‌سایت شخصی محتوا محور است. حاوی
											اطلاعاتی مانند: گزارش روزانه، اخبار، یادداشت‌های شخصی، خاطرات روزانه، یا
											مقالات علمی مورد نظر طراح آن است. مثل ehtesabi.com<br/><br/>
											<strong>سایت شرکتی یا کاتالوگی:</strong> سایت‌های کاتالوگی یکی از بهترین
											روش‌ها برای افزایش حضور آنلاین شرکت‌ها و بیزنس‌های کوچک است و هدف اصلی
											آن‌ها: معرفی شرکت، محصولات و خدماتی که ارائه می‌دهد و ارائه راه‌های بسیار
											زیاد برای برقراری مثل آدرس، شماره تماس، ایمیل و… . مثل
											iraalborz.com<br/><br/>
											<strong>سایت خبری:</strong> سایت‌های خبری یک منبع بسیار عالی اطلاعات در تمام
											حیطه‌های خبری است. هدف اصلی این نوع از وبسایت‌ها، ارسال جدیدترین اخبار به
											کاربران در اولین فرصت است. مثل سایت‌های خبرگزاری، nahadiran.ir<br/><br/>
											<strong>سایت فروشگاهی و تجاری:</strong> وبسایت‌های فروشگاهی (تجارت
											الکترونیکی) یک کانال فروش آنلاین بسیار عالی است که امروزه یک راه کار بسیار
											خوب هم برای ارائه محصولات و خدمات شما و هم مدیریت و استفاده راحت آن ارائه می
											دهد. مثل zamannama.com<br/><br/>
											<strong>وبلاگ:</strong> بلاگ یک یا چندین صفحه اینترنتی شخصی یا گروهی است که
											در آن شخص یا گروه به نوشتن مطالب متوالی (روزانه یا چند روز در میان) در
											موضوعات متنوع و دلخواه می‌پردازند. عمده محتوای پردازش شده در وبلاگ‌ عکس،
											متن، فیلم، صوت هستند که مقاله محور پست می‌شوند. مانند
											sanatyaar.net<br/><br/>
											<strong>لندینگ پیج:</strong> هدف اصلی لندینگ پیج‌ها یا وبسایت‌های تک
											صفحه‌ای، تولید کامل‌ترین اطلاعات برای یک محصول خاص (یا یک کسب و کارو
											استارتاپ خاص) است. این وبسایت‌ها به کمک مقالات، ویدیو‌ها، عکس‌ها، ضمانت
											نامه‌ها، تکنولوژی‌ها، نظر سنجی‌ها، گردهمایی‌ها و ... یک محصول یا استارتاپ را
											از بین رقبای آن محصول یا کسب و کار متمایز می‌کنند. مثل nanofil.co<br/><br/>
											<strong>سایت اداری یا سازمانی:</strong> این نوع وبسایت‌ها، ساختار بزرگی
											دارند و سایت اصلی و رسمی یک شرکت یا ارگان است که یک نمایندگی قابل اعتماد از
											آن کسب و کار هستند. ساختن چنین وبسایت‌هایی یک راه حل مطلوب برای تمام
											شرکت‌هاییست که می‌خواهند در زمینه کسب و کار خود پیشرو باشند و عموما 10 تا
											100 صفحه دارند. مثل BCG.com<br/><br/>
											<strong>وبسایت بازی و سرگرمی:</strong> وبسایت‌های سرگرمی می‌توانند بسیار
											بزرگ و پرمحتوا باشند شامل اطلاعات متنوع و مفید یا پست کلیپ های خنده دار.
											همچنین حاوی چندین صفحه از انواع مختلف صفحات وب هستند و بیشترشان از طریق
											تبلیغات کسب درآمد می‌کنند مثل instagram.com<br/><br/>
											<strong>وبسایت کاتالوگی استارتاپ‌ها:</strong> در این وب سایت‌ها، طراحی سایت
											صرفا برای معرفی استارتاپ استفاده می‌شود و خدمات استارتاپ بصورت جداگانه و در
											سایر پلتفرم‌ها، یا درگاه‌ها ارائه می‌شود و وب سایت در نقش معرفی کسب و کار
											عملکرد مخصوص به خود را دارد. مثل doorbaan.com<br/><br/>
											<strong>وبسایت ایده‌های استارتاپی:</strong> در این حالت وب سایت علاوه بر
											معرفی استارتاپ، بخشی از خدمات حوزه استارتاپ را نیز پوشش می‌دهد. یعنی کاربران
											در وب سایت می‌توانند علاوه بر آشنایی، خدمات آن کسب و کار را نیز دریافت کنند.
											نوع خدمات ارائه شده در این گونه وب سایت‌ها بستگی به نوع کسب و کار و ماهیت
											خدمات آن استارتاپ دارد. مثل timeet.org<br/><br/>
											<strong>وبسایت نمونه کار:</strong> وبسایت‌های نمونه کاری به منظور جذب
											مخاطبان گسترده به کمک ارائه بهترین کارهای نویسنده یا صاحب سایت ایجاد می‌شود.
											این دسته از وبسایت‌ها بیشتر بین عکاسان، استودیو‌های عکاسی، طراحان وب و…
											طرفدار دارد. مثل fabianirsara.com<br/><br/>
											<strong>وبسایت پورتال:</strong> ساختار این نوع از وبسایت‌ها همیشه پیچیده است
											و قاعدتا می‌تواند شامل بخش‌ها و زیر بخش‌های متنوع و زیاد، منوهای چند سطحی،
											تعداد زیادی از انواع گزینه‌های مختلف و ماژول‌ها می‌شود که معمولا هم از
											گرافیک پایینی برخوردارند و جنبه درآمدزایی دارند. مثل پورتال‌های واریز شهریه
											دانشگاه‌ها، santanderbank.com<br/><br/>
											<strong>وبسایت مالتی مدیا (یا رسانه پرداز):</strong> وبسایت‌هایی که محوریت
											محتوای آن‌ها صدا و فیلم است. این نوع محتواها، به دلیل محبوبیت بالا، به شما
											کمک می‌کنند تا در زمانی کم (چند ماه)، ترافیک رو به رشدی را بدست آورید؛ مثل
											سایت‌های دانلود فیلم و موسیقی. مثل salamdl.ws<br/><br/>
											<strong>وبسایت انجمن‌های آنلاین:</strong> انجمن‌های آنلاین می‌توانند در دسته
											بندی “درباره همه چیز” و یا اختصاصی برای یک موضوع خاص قرار بگیرند. این گونه
											وب سایت‌ها با نام انجمن گفتگو، فروم، تالار گفتگو و یا تالارگفتمان شناخته
											می‌شوند و پاسخگوی بسیاری پرسش‌ها هستند. مثل stackoverflow.com<br/><br/>
											<strong>وبسایت آموزشی:</strong> یک وبسایت آموزشی برای تبلیغ یک موسسه آموزشی
											یا فهرستی از موسسات تشکیل شده است و حاوی اطلاعات جامع در مورد موسسه، محتوای
											آموزشی، مدرسین، فرصت‌های آموزشی و دستاوردهای آن‌هاست. مثل
											roocket.ir<br/><br/>
											<strong>تفاوت وبسایت و وبلاگ:</strong><br/><br/>
											وبلاگ صرفا به منظور اطلاع رسانی و انتشار مطالب و محتوای متنی و رسانه‌ای
											ساخته می‌شود. اما وب سایت اینگونه نیست، از وب سایت به منظور ارائه خدمات
											استفاده می‌شود . وبلاگ‌ها قابلیت این را ندارند که خدمات آنلاین را انجام دهند
											اما وب سایت‌ها به منظور ارائه خدمات و کاتالوگ‌های آنلاین ساخته می‌شوند.
											وبلاگ یک رسانه‌ای‌است که در بازه‌های زمانی کوتاه آپدیت می‌شود و در بازه‌های
											زمانی مشخص و یا نامشخص مطالب خود را به روز می‌کنند در صورتی که وبسایت‌ها
											معمولا دچار تغییرات زیاد نمی‌شوند.<br/><br/>
											<strong>تفاوت وبسایت و پورتال:</strong><br/><br/>
											پورتال‌ها معمولا بانک‌های اطلاعاتی هستند که می‌توانند به عنوان یک پلتفرم
											مشترک توسط شرکت‌های مختلف مورداستفاده قرار گیرند تا انواع اطلاعاتی که یک
											کاربر ممکن است حین جستجوی خدمات نیاز داشته باشد را فراهم کند. از رایج‌ترین
											نمونه‌های آن: پورتال‌های دولتی، پورتال‌های آموزشی، پورتال‌های شرکتی،
											پورتال‌های فرهنگی و … است.
											سایت وب، مجموعه ی از صفحات مرتبط به یکدیگر است که انبوهی از اطلاعات را در
											قالب متن، تصویر، صدا، و فیلم در اختیار کاربران عمومی قرار می‌دهد. وب سایت،
											مکان حضور هر شخص یا شرکت در شبکه اینترنت است. یک وب سایت می‌تواند علاوه بر
											ایجاد ارتباط و معرفی صاحب سایت، امکان اطلاع رسانی بروز، بازاریابی، افزایش
											بازدید و معرفی بین المللی را نیز فراهم آورد.
											یکی از مهم‌ترین جنبه‌های تفاوت بین پورتال و وب سایت جنبه اقتصادی آن است.
											پورتال‌ها عموما” برای کسب درآمد ساخته شده‌اند و درآمدهای خود را از طریق
											تبلیغات کسب می‌نمایند همچنین، وب سایت و پورتال از جهت اطلاعات شخصی‌سازی شده
											و سرعت دسترسی با هم تفاوت دارند. پورتال برای ارائه اطلاعات شخصی‌سازی شده به
											کاربران استفاده می‌شود در حالی که عملکرد سایت به گونه‌ای دیگر است. علاوه بر
											این، تمرکز وب سایت بر جذب کاربران بیشتر است، یعنی بالا بردن ترافیک وب سایت،
											اما وب پورتال برای کاربران خاصی است. این باعث می‌شود ترافیک تا حدودی محدود
											شود و فقط به کاربران خاصی اجازه بازدید از پورتال می‌دهد.<br/><br/>

										</h5>
									</AccordionItemPanel>
								</AccordionItem>
							</Accordion>
						</div>
					</>
				)
			}
			else if (this.state.app === false) {
				return (
					<>
						{this.state.sendstatus ? this.rendercard() :
							<div>
								<Tabs>
									<TabList>
										<Tab>تخصصی</Tab>
									</TabList>
									<TabPanel>
										<div className="p-5" id="input">
											<div className="preview">
												<label>عنوان مقاله مورد نیاز</label>
												<input onChange={this.setChange}
												       type="text" className="input
                                               border mt-2 mr-2" style={{width: "90%"}}
												       placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
												       name="عنوان مقاله مورد نیاز تخصصی"
												/>
											</div>
											<div className="mt-5" style={{
												display: 'flex',
												flexDirection: 'row',
												justifyContent: 'space-evenly'
											}}>
												<div>
													<label>زبان مورد نظر</label>
													<Select options={language4}
													        placeholder='...'
													        onChange={this.seSelect}
													        className='w-56 mr-2'
													        name="زبان مورد نظر تخصصی"
													        isSearchable={true}
													        isRTL={true}/>
												</div>
												<div>
													<label>نوع مقاله</label>
													<div className="mr-2" style={{width: '50%'}}>
														<Select options={article3}
														        placeholder='...'
														        onChange={this.seSelect}
														        className='w-56 mr-2'
														        name="نوع مقاله تخصصی"
														        isSearchable={true}
														        isRTL={true}/>
													</div>
												</div>
											</div>
											<div className="mt-5">
												<label>تعداد صفحات (یا تعداد کلمات)</label>
												<input onChange={this.setChange}
												       type="text" className="input  border mt-2 mr-2"
												       style={{width: "90%"}}
												       placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
												       name="تعداد صفحات (یا تعداد کلمات) تخصصی"
												/>
											</div>
											<div className="mt-5">
												<label className="ml-4">زمان تحویل</label>
												<div className="mt-3" style={{width: '50%'}}>
													<DateInput
														value={this.state.finishSpecial}
														name={'finishSpecial'}
														className="input  border"
														placeholder="تاریخ آغازین مورد نظر را وارد کنید"
														onChange={this.handleChange}
													/>
												</div>
											</div>
											<div className="mt-5">
												<label>توضیحات اختیاری</label>
												<div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات اختیاری تخصصی">
                                                    </textarea>
												</div>
											</div>
										</div>
									</TabPanel>
								</Tabs>
							</div>
						}
						{this.renderFile()}
						{this.renderButton()}
						<h2 className="text-lg text-center font-medium">
							سوالات متداول
						</h2>
						<div className='flex justify-center'>
							<Accordion className='text-right my-5' style={{width: '97%', borderRadius: '6px'}}
							           allowZeroExpanded={true} allowMultipleExpanded={true}>
								<AccordionItem className='my-1 border border-gray-300'>
									<AccordionItemHeading>
										<AccordionItemButton style={{
											textAlign: 'right',
											backgroundColor: 'white',
											borderBottom: 'solid 1px',
											borderColor: 'rgba(226, 232, 240, 1)'
										}}>
											<h2 style={{fontSize: '16px'}}><strong>طراحی اپلیکیشن</strong></h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											In ad velit in ex nostrud dolore cupidatat consectetur
											ea in ut nostrud velit in irure cillum tempor laboris
											sed adipisicing eu esse duis nulla non.
										</h5>
									</AccordionItemPanel>
								</AccordionItem>
							</Accordion>
						</div>
					</>
				)
			}

		}
		else if (this.state.button === false) {
			return (
				<div className="p-5" id="input">
					<div className="preview " style={{display: 'flex', justifyContent: 'space-around'}}>
						<button
							className={this.state.web ? 'button shadow-md mr-2 mb-2 bg-gray-200 text-center border-none border-4' : 'button mr-2 shadow-md mb-2 bg-theme-9 text-white text-center border-none border-4'}
							onClick={this.onClickWeb} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p>طراحی و ساخت وب سایت</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>
						</button>
						<button
							className={this.state.app ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white border-none border-4'}
							onClick={this.onClickApp} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p>طراحی و ساخت اپلیکیشن</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>
						</button>
					</div>
					<div className="mt-5 flex flex-row">
						<button onClick={this.loginUp} type="button" className="button bg-theme-1 text-white mt-5"
						        style={{
							        width: "20%",
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
							</div> : "بعدی"}
						</button>

					</div>
				</div>
			)
		}
	}

	rendercard() {
		return (
			<div className='box border border-gray-300 m-5 grid grid-cols-12 gap-6 p-5'>
				<div className='col-span-2 border-l border-gray-300 lg:col-span-2 text-center'>
					<div className='my-3'>
						<h3>عنوان:</h3>
					</div>
					<div className='my-3'>
						<h3>زمان:</h3>
					</div>
					<div className='my-3'>
						<h3>هزینه:</h3>
					</div>
				</div>
				<div className='col-span-10 lg:col-span-10 p-5'>
					<p className='text-justify text-gray-700'>
						لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
						چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
						مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه
						درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری
						را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
						صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و شرایط سخت تایپ به پایان رسد و
						زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی
						اساسا مورد استفاده قرار گیرد.لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
						استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
						است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می
						باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد،
						تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی، و فرهنگ پیشرو
						در زبان فارسی ایجاد کرد، در این صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها،
						و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات
						پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
					</p>
				</div>

			</div>
		)
	}

	renderButton() {
		return (
			<div className="m-auto pb-3">
				<button onClick={this.state.sendstatus ? this.setForward.bind(this) : this.forms.bind(this)}
				        type="button" className="button bg-theme-1 mb-4 text-white "
				        style={{
					        width: "20%",
					        display: "flex",
					        justifyContent: "center",
					        margin: "20px auto"
				        }}>
					{this.state.loading ? <div style={{
						display: 'flex',
						justifyContent: 'center',
						alignSelf: 'center',
						alignItems: 'center',
						textAlign: 'center'
					}}>
						<ClassicSpinner size={25} color="#fff"/>
					</div> : this.state.buttontext}
				</button>
			</div>
		)
	}


	render() {
		return (
			<>
				<body className="app just" dir={"rtl"}>
				<Modal
					isOpen={this.state.show}
					contentLabel="اخطاریه"
					style={customStyles}>
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
				<Mobile/>
				<div className="flex">
					<NavBar activeClass={this.state.activeClass}/>
					<div className="content">
						<Top disable="yes"/>
						<div className="intro-y flex items-center mt-8" style={{justifyContent: "center"}}>
						</div>
						<div className="grid grid-cols-12 gap-6 mt-5">
							<div className="intro-y col-span-12 lg:col-span-12">
								<div className="intro-y box">
									<div className="flex flex-col sm:flex-col items-center p-5 border-b border-gray-200"
									     style={{justifyContent: "center", flexDirection: 'column'}}>
										<h2 className="text-lg font-medium">
											طراحی وب سایت و اپلیکیشن
										</h2>
										<p className="text-gray-700">(از میان گزینه ها محدودیتی در انتخاب به صورت همزمان
											وجود ندارد)</p>
									</div>
									{this.renderShow()}
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

export default sendProject
