import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import history from "./history";
import axios from 'axios';
import Top from './Top'
import Modal from 'react-modal';
import {ClassicSpinner} from "react-spinners-kit";
import FeatherIcon from 'feather-icons-react';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import DatePicker from "react-modern-calendar-datepicker";
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

class seo extends Component {
	state = {
		status: [],
		description: '',
		scope: '',
		name: '',
		pic: null,
		show: false,
		loading: false,
		error: '',
		showConfirm: false,
		activeClass: '7',
		seo: true,
		contentProduct: true,
		contentSpecial: true,
		strategy: true,
		social: true,
		button: false,
		usename: '',
		x: [],
		xx: [],
		sus_id: '',

	};

	constructor(props) {
		super(props);
		this.loginUp = this.loginUp.bind(this);
		this.onClickContentProduct = this.onClickContentProduct.bind(this);
		this.onClickContentSpecial = this.onClickContentSpecial.bind(this);
		this.onClickSocial = this.onClickSocial.bind(this);
		this.onClickStrategy = this.onClickStrategy.bind(this);
		this.onClickSeo = this.onClickSeo.bind(this);
		this.setChange = this.setChange.bind(this);
		this.seSelect1 = this.seSelect1.bind(this);
		this.seSelect2 = this.seSelect2.bind(this);
		this.sendData = this.sendData.bind(this);
		this.forms = this.forms.bind(this);
		this.onPicChange = this.onPicChange.bind(this);
	}

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

	handleClose = () => {
		this.setState({show: false});
	};
	handleShow = () => {
		this.setState({show: true});
	};

	onClickSocial() {
		this.setState({
			social: !this.state.social,
		});
		if (this.state.social === true) {
			this.state.status.push({
				'sub_id': '5',
				'title': 'سرویس شبکه های اجتماعی'
			});
		}
		if (this.state.social === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '5') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	onClickContentSpecial() {
		this.setState({
			contentSpecial: !this.state.contentSpecial,
		});
		if (this.state.contentSpecial === true) {
			this.state.status.push({
				'sub_id': '3',
				'title': 'سفارش محتوای اختصاصی'
			});
		}
		if (this.state.contentSpecial === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '3') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	onClickSeo() {
		this.setState({
			seo: !this.state.seo,
		});
		if (this.state.seo === true) {
			this.state.status.push({
				'sub_id': '1',
				'title': ' خدمات سئو'
			});
		}
		if (this.state.seo === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '1') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	onClickContentProduct() {
		this.setState({
			contentProduct: !this.state.contentProduct,
		});
		if (this.state.contentProduct === true) {
			this.state.status.push({
				'sub_id': '2',
				'title': ' سفارش محتوای محصول و خدمات فروش آنلاین'
			});
		}
		if (this.state.contentProduct === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '2') {
						this.state.status.pop()
					}
				}
			)
		}
	}

	onClickStrategy() {
		this.setState({
			strategy: !this.state.strategy,
		});
		if (this.state.strategy === true) {
			this.state.status.push({
				'sub_id': '4',
				'title': 'خدمات تعیین استراتژی محتوا و برندینگ'
			});
		}
		if (this.state.strategy === false) {
			this.state.status.map((st, index) => {
					if (st.sub_id === '4') {
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

	renderShow() {
		if (this.state.button === true) {
			const seoNight = [
				{
					value: "بله",
					label: 'بله',
					name: "آیا می‌دانید که فرآیند بهینه‌سازی صفحات وب یک پروسه زمان‌بر است و رتبه گرفتن صفحات وبسایت شما یک شبه اتفاق نمی‌افتد؟ سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "خیر",
					label: 'خیر',
					name: "آیا می‌دانید که فرآیند بهینه‌سازی صفحات وب یک پروسه زمان‌بر است و رتبه گرفتن صفحات وبسایت شما یک شبه اتفاق نمی‌افتد؟ سئو و بهینه سازی محتوایی صفحات وب"
				},
			];
			const seoContent = [
				{
					value: "محتوای متنی",
					label: 'محتوای متنی',
					name: "تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "محتوای رسانه‌ای",
					label: 'محتوای رسانه‌ای',
					name: "تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سئو و بهینه سازی محتوایی صفحات وب"
				},
			];
			const seoScope = [
				{
					value: "سئوی تکنیکال",
					label: 'سئوی تکنیکال',
					name: "در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید؟ سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "بازاریابی محتوا",
					label: 'بازاریابی محتوا',
					name: "در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید؟  سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "ویرایش سئو",
					label: 'ویرایش سئو',
					name: "در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید؟  سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "مشاوره سئو",
					label: 'مشاوره سئو',
					name: "در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید؟  سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی محلی",
					label: 'سئوی محلی',
					name: "در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید؟  سئو و بهینه سازی محتوایی صفحات وب"
				},
			];
			const special = [
				{
					value: "تحلیل رقبا",
					label: 'تحلیل رقبا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تولید محتوای منظم",
					label: 'تولید محتوای منظم',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "مقاله نویسی",
					label: 'مقاله نویسی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "مشاوره سئو",
					label: 'مشاوره سئو',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "مشاوره برندینگ",
					label: 'مشاوره برندینگ',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی فنی سایت",
					label: 'سئوی فنی سایت',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی محتوایی",
					label: 'سئوی محتوایی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا",
					label: 'تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تحلیل کلمات کلیدی",
					label: 'تحلیل کلمات کلیدی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "بهبود رتبه سایت",
					label: 'بهبود رتبه سایت',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "مشاوره و پیشنهاد استراتژی بازاریابی",
					label: 'مشاوره و پیشنهاد استراتژی بازاریابی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تبلیغات",
					label: 'تبلیغات',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "برندینگ و مدیریت آن",
					label: 'برندینگ و مدیریت آن',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
			];
			const seoSkills = [
				{
					value: "سئوی داخلی",
					label: 'سئوی داخلی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی خارجی",
					label: 'سئوی خارجی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی کلمات کلیدی",
					label: 'سئوی کلمات کلیدی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی محتوایی مقالات",
					label: 'سئوی محتوایی مقالات',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "راه اندازی سئوی تکنیکال",
					label: 'راه اندازی سئوی تکنیکال',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی on page",
					label: 'سئوی on page',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "سئوی off page",
					label: 'سئوی off page',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تحلیل رقبا با ابزارهای سئو",
					label: 'تحلیل رقبا با ابزارهای سئو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با ابزار moz",
					label: 'آشنایی با ابزار moz',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به ابزار moz",
					label: 'تسلط به ابزار moz',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با kwfinder",
					label: 'آشنایی با kwfinder',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به kwfinder",
					label: 'تسلط به kwfinder',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با keyword planner",
					label: 'آشنایی با keyword planner',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به keyword planner",
					label: 'تسلط به keyword planner',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با گوگل آنالیتیکس",
					label: 'آشنایی با گوگل آنالیتیکس',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به گوگل آنالیتیکس",
					label: 'تسلط به گوگل آنالیتیکس',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با گوگل وب مستر",
					label: 'آشنایی با گوگل وب مستر',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به گوگل وب مستر",
					label: 'تسلط به گوگل وب مستر',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با سئو در وردپرس",
					label: 'آشنایی با سئو در وردپرس',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به سئو در وردپرس",
					label: 'تسلط به سئو در وردپرس',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی به جی تی متریکس",
					label: 'آشنایی به جی تی متریکس',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "آشنایی با طراحی گرافیکی",
					label: 'آشنایی با طراحی گرافیکی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تسلط به طراحی گرافیکی",
					label: 'تسلط به طراحی گرافیکی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "زبان انگلیسی در سطح مقدماتی",
					label: 'زبان انگلیسی در سطح مقدماتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "زبان انگلیسی در سطح advance",
					label: 'زبان انگلیسی در سطح advance',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تولید محتوای یونیک",
					label: 'تولید محتوای یونیک',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
				},
			];

			const productProduce = [
				{
					value: "فیزیکی",
					label: 'فیزیکی',
					name: "چه نوع محصولاتی تولید یا توزیع می‌کنید؟ سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "مجازی",
					label: 'مجازی',
					name: "چه نوع محصولاتی تولید یا توزیع می‌کنید؟ سفارش محتوای محصول و بازاریابی محتوا"
				},
			];
			const productSpecial = [
				{
					value: "تحلیل رقبا",
					label: 'تحلیل رقبا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای منظم",
					label: 'تولید محتوای منظم',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "مقاله نویسی",
					label: 'مقاله نویسی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "مشاوره سئو",
					label: 'مشاوره سئو',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای اختصاصی محصولات مهندسی و اختصاصی",
					label: 'تولید محتوای اختصاصی محصولات مهندسی و اختصاصی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا",
					label: 'تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تحلیل کلمات کلیدی",
					label: 'تحلیل کلمات کلیدی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "بهبود رتبه سایت",
					label: 'بهبود رتبه سایت',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
				},
			];
			const produceSkills = [
				{
					value: "فروش آنلاین",
					label: 'فروش آنلاین',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "معرفی محصولات به صورت آنلاین",
					label: 'معرفی محصولات به صورت آنلاین',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "معرفی تخصصی محصولات ",
					label: 'معرفی تخصصی محصولات ',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای آموزشی",
					label: 'تولید محتوای آموزشی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای خبری",
					label: 'تولید محتوای خبری',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای محصولات",
					label: 'تولید محتوای محصولات',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تولید محتوای بهینه‌شده برای موتورهای جستجو",
					label: 'تولید محتوای بهینه‌شده برای موتورهای جستجو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "توانایی راه‌اندازی کمپین‌های تبلیغاتی",
					label: 'توانایی راه‌اندازی کمپین‌های تبلیغاتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "سئوی سایت",
					label: 'سئوی سایت',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "پیداکردن کلمات کلیدی",
					label: 'پیداکردن کلمات کلیدی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تسلط به سئو",
					label: 'تسلط به سئو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "تسلط به ابزارهای آنالیز سئو",
					label: 'تسلط به ابزارهای آنالیز سئو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "محتواپردازی محصولات تخصصی",
					label: 'محتواپردازی محصولات تخصصی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
				{
					value: "محتواپردازی محصولات صنعتی",
					label: 'محتواپردازی محصولات صنعتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
				},
			];




			const strategySkills = [
				{
					value: "تولید محتوای متنی",
					label: 'تولید محتوای متنی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "تولید محتوای رسانه‌ای",
					label: 'تولید محتوای رسانه‌ای',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "استراتژی تحلیل کلمات کلیدی",
					label: 'استراتژی تحلیل کلمات کلیدی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "طراحی ساختارهای برند",
					label: 'طراحی ساختارهای برند',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره نوشتن شعار و داستان برند",
					label: 'مشاوره نوشتن شعار و داستان برند',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره برندسازی",
					label: 'مشاوره برندسازی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره سئو",
					label: 'مشاوره سئو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مدیریت محتوا",
					label: 'مدیریت محتوا',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مدیریت برند",
					label: 'مدیریت برند',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "بهینه‌سازی برند",
					label: 'بهینه‌سازی برند',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "بهینه سازی محتوا",
					label: 'بهینه سازی محتوا',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) خدمات تعیین استراتژی محتوا و برندینگ"
				},
			];
			const strategySpecial = [
				{
					value: "تحلیل رقبا",
					label: 'تحلیل رقبا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "تولید محتوای منظم",
					label: 'تولید محتوای منظم',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مقاله نویسی",
					label: 'مقاله نویسی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره سئو",
					label: 'مشاوره سئو',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره برندینگ",
					label: 'مشاوره برندینگ',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا",
					label: 'تحلیل کانال‌های شبکه‌های اجتماعی و مدیریت نشر محتوا',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "تحلیل کلمات کلیدی",
					label: 'تحلیل کلمات کلیدی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "بهبود رتبه سایت",
					label: 'بهبود رتبه سایت',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
				},
				{
					value: "مشاوره و پیشنهاد استراتژی بازاریابی",
					label: 'مشاوره و پیشنهاد استراتژی بازاریابی',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "تبلیغات",
					label: 'تبلیغات',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
				{
					value: "برندینگ و مدیریت آن",
					label: 'برندینگ و مدیریت آن',
					name: "به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
				},
			];
			const specialSkills = [
				{
					value: "تولید محتوا",
					label: 'تولید محتوا',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "نویسندگی",
					label: 'نویسندگی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "معرفی تخصصی محصولات ",
					label: 'معرفی تخصصی محصولات ',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "مقاله نویسی",
					label: 'مقاله نویسی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "بهبود جایگاه سایت و سئو",
					label: 'بهبود جایگاه سایت و سئو',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "توانایی نگارش متن‌های جذاب",
					label: 'توانایی نگارش متن‌های جذاب',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "زبان انگلیسی در سطح advance",
					label: 'زبان انگلیسی در سطح advance',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "زبان انگلیسی در سطح Intermediate",
					label: 'زبان انگلیسی در سطح Intermediate',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "تولید محتوای یونیک",
					label: 'تولید محتوای یونیک',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "آشنایی با فوتوشاپ",
					label: 'آشنایی با فوتوشاپ',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "تسلط به فتوشاپ",
					label: 'تسلط به فتوشاپ',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "آشنایی با موشن گرافیک",
					label: 'آشنایی با موشن گرافیک',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "تسلط به موشن گرافیک",
					label: 'تسلط به موشن گرافیک',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "توانایی استخراج کلمات کلیدی",
					label: 'توانایی استخراج کلمات کلیدی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای اختصاصی وبسایت"
				},
			];
			const specialContent = [
				{
					value: "محتوای متنی",
					label: 'محتوای متنی',
					name: "تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سفارش محتوای اختصاصی وبسایت"
				},
				{
					value: "محتوای رسانه‌ای",
					label: 'محتوای رسانه‌ای',
					name: "تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
			];


			const socialSpecial = [
				{
					value: "محتوای متنی",
					label: 'محتوای متنی',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای تصویری به صورت عکس‌نوشته",
					label: 'محتوای تصویری به صورت عکس‌نوشته',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای متنی و عکس همراه با هم",
					label: 'محتوای متنی و عکس همراه با هم',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای ویدئویی",
					label: 'محتوای ویدئویی',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای صوتی",
					label: 'محتوای صوتی',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای ویدئویی و متنی همراه با هم",
					label: 'محتوای ویدئویی و متنی همراه با هم',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "، محتوای صوتی و متنی و تصویری (عکس) همراه با هم",
					label: '، محتوای صوتی و متنی و تصویری (عکس) همراه با هم',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "محتوای تصویری و متنی با هم",
					label: 'محتوای تصویری و متنی با هم',
					name: "چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
			];

			const socialSkills = [
				{
					value: "بازاریابی تلگرامی",
					label: 'بازاریابی تلگرامی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "بازاریابی اینستاگرامی",
					label: 'بازاریابی اینستاگرامی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "بازاریابی اینترنتی",
					label: 'بازاریابی اینترنتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "بازاریابی دیجیتالی",
					label: 'بازاریابی دیجیتالی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "آشنایی با الگوریتم‌های اینستاگرامی",
					label: 'آشنایی با الگوریتم‌های اینستاگرامی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "توانایی جذب فالوئر ارگانیک در اینستاگرام",
					label: 'توانایی جذب فالوئر ارگانیک در اینستاگرام',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "توانایی افزایش اینگیجمنت پست‌های اینستاگرامی",
					label: 'توانایی افزایش اینگیجمنت پست‌های اینستاگرامی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "نشان دادن پست‌ها در سرچ اینستاگرام",
					label: 'نشان دادن پست‌ها در سرچ اینستاگرام',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "توانایی شناخت مخاطبین هدف",
					label: 'توانایی شناخت مخاطبین هدف',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "بازاریابی اینترنتی",
					label: 'بازاریابی اینترنتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "طراحی تبلیغات",
					label: 'طراحی تبلیغات',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "تبلیغات",
					label: 'تبلیغات',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "برنامه‌ریزی تبلیغ و خرید",
					label: 'برنامه‌ریزی تبلیغ و خرید',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "پروموشن محصولات",
					label: 'پروموشن محصولات',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "پیشنهاد پیام تبلیغاتی",
					label: 'پیشنهاد پیام تبلیغاتی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
				{
					value: "پیشنهاد طراحی بصری",
					label: 'پیشنهاد طراحی بصری',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
				},
			];
			const socialContent = [
				{
					value: "لحن داستانی",
					label: 'لحن داستانی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
				},
				{
					value: "لحن رسمی",
					label: 'لحن رسمی',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
				},
				{
					value: "لحن محاوره‌ای",
					label: 'لحن محاوره‌ای',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
				},
				{
					value: "لحن گفت‌وگو (پرسش‌و پاسخ)",
					label: 'لحن گفت‌وگو (پرسش‌و پاسخ)',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
				},
				{
					value: "لحن خاطره",
					label: 'لحن خاطره',
					name: "به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
				},
			];

			if (this.state.seo === false && this.state.social === false && this.state.contentProduct === false && this.state.contentSpecial === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سئو و بهینه سازی محتوایی صفحات وب</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label> نامی برای پروژه‌ی خود انتخاب کنید</label>
										<input onChange={this.setChange}
										       type="text"
										       className="input border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="نامی برای پروژه‌ی خود انتخاب کنید. سئو و بهینه سازی محتوایی صفحات وب"/>
										<div className="mt-5">
											<label>نام شرکت یا کسب وکار خود را وارد کنید</label>
											<input
												type="text"
												className="input border mt-2 mr-2"
												style={{width: "90%"}}
												placeholder='...'
												onChange={this.setChange}
												name="نام شرکت یا کسب وکار خود را وارد کنید سئو و بهینه سازی محتوایی صفحات وب"
											/>

										</div>
										<div className="mt-5">
											<label>از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر
												یا کمتر توصیف کنید)</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>آدرس وبسایت خود را وارد کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="آدرس وبسایت خود را وارد کنید (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی
												کرده‌اید؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>در کمتر از یک سطر هدف خود را برای استفاده از بهینه‌سازی صفحات وب شرح
												دهید</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="در کمتر از یک سطر هدف خود را برای استفاده از بهینه‌سازی صفحات وب شرح دهید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا می‌دانید که فرآیند بهینه‌سازی صفحات وب یک پروسه زمان‌بر است و رتبه
												گرفتن صفحات وبسایت شما یک شبه اتفاق نمی‌افتد؟
											</label>
											<div className="mr-2" style={{width: '50%'}}>
												<Select options={seoNight}
												        placeholder='...'
												        onChange={this.seSelect}
												        name="آیا می‌دانید که فرآیند بهینه‌سازی صفحات وب یک پروسه زمان‌بر است و رتبه گرفتن صفحات وبسایت شما یک شبه اتفاق نمی‌افتد؟ سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا در گذشته نسبت به بهینه‌سازی (سئوی ) وبسایت خود اقدام کرده‌اید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا در گذشته نسبت به بهینه‌سازی (سئوی ) وبسایت خود اقدام کرده‌اید؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید
											</label>
											<div className="mr-2" style={{width: '50%'}}>
												<Select options={seoScope}
												        placeholder='...'
												        onChange={this.seSelect}
												        name="در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟
											</label>
											<div className="mr-2" style={{width: '50%'}}>
												<Select options={seoContent}
												        placeholder='...'
												        onChange={this.seSelect}
												        name="تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												کلمات کلیدی مورد نظر خود را معرفی کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="کلمات کلیدی مورد نظر خود را معرفی کنید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												در کدام کلمات کلیدی قصد دارید در جایگاه اول صفحه نتایج گوگل قرار بگیرید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="در کدام کلمات کلیدی قصد دارید در جایگاه اول صفحه نتایج گوگل قرار بگیرید؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												محصولات و خدمات خود را معرفی کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="محصولات و خدمات خود را معرفی کنید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												اگر قصد مقاله نویسی اختصاصی برای وب سایت خود را دارید، حوزه‌ها و موضوعات
												آن‌ها را مشخص کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اگر قصد مقاله نویسی اختصاصی برای وب سایت خود را دارید، حوزه‌ها و موضوعات آن‌ها را مشخص کنید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												اهداف استراتژی محتوایی خود را معرفی کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را معرفی کنید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												چند نفر در تیم محتوایی شما فعالیت می‌کنند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="چند نفر در تیم محتوایی شما فعالیت می‌کنند؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب
												کنید)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={special}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												اهداف و دستاوردها مخصوص شما در خصوص استراتژی محتوا و برندینگ چیست؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف و دستاوردها مخصوص شما در خصوص استراتژی محتوا و برندینگ چیست؟ سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>زمان مورد نظر خود را برای انجام پروژه بفرمایید</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="زمان مورد نظر خود را برای انجام پروژه بفرمایید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												از کسب و کار خود بیشتر بگوئید
											</label>
											<textarea onChange={this.setChange}
											          name="از کسب و کار خود بیشتر بگوئید سئو و بهینه سازی محتوایی صفحات وب"
											          rows="8"
											          className="input border mt-2"
											          style={{height: "180px", width: '100%'}}>
                                                    </textarea>
										</div>
										<div className="mt-5">
											<label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را
												انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={seoSkills}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و بازاریابی محتوا</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label> نامی برای پروژه‌ی خود انتخاب کنید</label>
										<input onChange={this.setChange}
										       type="text"
										       className="input border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="نامی برای پروژه‌ی خود انتخاب کنید. سفارش محتوای محصول و بازاریابی محتوا"/>
										<div className="mt-5">
											<label>نام شرکت یا کسب وکار خود را وارد کنید</label>
											<input
												type="text"
												className="input border mt-2 mr-2"
												style={{width: "90%"}}
												placeholder='...'
												onChange={this.setChange}
												name="نام شرکت یا کسب وکار خود را وارد کنید سفارش محتوای محصول و بازاریابی محتوا"
											/>

										</div>
										<div className="mt-5">
											<label>از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر
												یا کمتر توصیف کنید)</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label>آدرس وبسایت خود را وارد کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="آدرس وبسایت خود را وارد کنید سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label>شرح کار وبسایت خود را معرفی کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="شرح کار وبسایت خود را معرفی کنید سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label>حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی
												کرده‌اید؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label>اهداف استراتژی محتوایی خود را به ما معرفی کنید؟</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را به ما معرفی کنید؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												چه نوع محصولاتی تولید یا توزیع می‌کنید؟
											</label>
											<div className="mr-2" style={{width: '50%'}}>
												<Select options={productProduce}
												        placeholder='...'
												        onChange={this.seSelect}
												        name="چه نوع محصولاتی تولید یا توزیع می‌کنید؟ سفارش محتوای محصول و بازاریابی محتوا"
												        isSearchable={true}
												        isRTL={true}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												تعداد محصولات خود را وارد کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="تعداد محصولات خود را وارد کنید سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												دسته بندی محصولات خود را معرفی کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="دسته بندی محصولات خود را معرفی کنید سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود
												به تولید محتوا نیاز دارید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا قصد استفاده از تبلیغات و کمپین‌های فروش را هم دارید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین‌های فروش را هم دارید؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												بیشترین درآمد شرکت مربوط به کدام محصول است؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="بیشترین درآمد شرکت مربوط به کدام محصول است؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟ سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید)
											</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={productSpecial}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سفارش محتوای محصول و بازاریابی محتوا"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												زمان مورد نظر خود را برای انجام پروژه بفرمایید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="زمان مورد نظر خود را برای انجام پروژه بفرمایید سفارش محتوای محصول و بازاریابی محتوا"
											/>
										</div>
										<div className="mt-5">
											<label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را
												انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={produceSkills}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سفارش محتوای محصول و بازاریابی محتوا"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی وبسایت</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label> نامی برای پروژه‌ی خود انتخاب کنید</label>
										<input onChange={this.setChange}
										       type="text"
										       className="input border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="نامی برای پروژه‌ی خود انتخاب کنید. سفارش محتوای اختصاصی وبسایت"/>
										<div className="mt-5">
											<label>نام شرکت یا کسب وکار خود را وارد کنید</label>
											<input
												type="text"
												className="input border mt-2 mr-2"
												style={{width: "90%"}}
												placeholder='...'
												onChange={this.setChange}
												name="نام شرکت یا کسب وکار خود را وارد کنید سفارش محتوای اختصاصی وبسایت"
											/>

										</div>
										<div className="mt-5">
											<label>از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر
												یا کمتر توصیف کنید)</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label>آدرس وبسایت خود را وارد کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="آدرس وبسایت خود را وارد کنید (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label>شرح کار وبسایت خود را معرفی کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="شرح کار وبسایت خود را معرفی کنید سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label>حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی
												کرده‌اید؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label>تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟</label>
											<div className="mr-2" style={{width: '50%'}}>
												<Select options={specialContent}
												        placeholder='...'
												        onChange={this.seSelect}
												        name="تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سفارش محتوای اختصاصی وبسایت"
												        isSearchable={true}
												        isRTL={true}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label>محتوای اختصاصی وب سایت شما، شامل چه مواردی می‌شود؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="محتوای اختصاصی وب سایت شما، شامل چه مواردی می‌شود؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												اهداف استراتژی محتوایی خود را به ما معرفی کنید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را به ما معرفی کنید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به طور میانگین در هفته تمایل دارید چند مقاله (متن) برای وبسایت شما
												نگاشته و بهینه شود؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به طور میانگین در هفته تمایل دارید چند مقاله (متن) برای وبسایت شما نگاشته و بهینه شود؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا قصد نگارش محتوای استاتیک سایت را دارید؟ (شامل معرفی شرکت، خدمات،
												محصولات و ...)
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد نگارش محتوای استاتیک سایت را دارید؟ (شامل معرفی شرکت، خدمات، محصولات و ...) سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا قصد نگارش محتوای معرفی محصولات را دارید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد نگارش محتوای معرفی محصولات را دارید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												محصولات خود را معرفی کنید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="محصولات خود را معرفی کنید سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود
												به تولید محتوا نیاز دارید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												فرم مدنظر خود را جهت تولید محتوای اختصاصی به صورت دقیق‌تر ذکر بفرمایید.
												(placeholderش مثلا اینفوگرافی، مقاله، کاتالوگ و..)
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را جهت تولید محتوای اختصاصی به صورت دقیق‌تر ذکر بفرمایید. (placeholderش مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												تمایل دارید چه تعداد محتوای رسانه‌ای برای شما تولید و بهینه شود؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="تمایل دارید چه تعداد محتوای رسانه‌ای برای شما تولید و بهینه شود؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا قصد فعالیت در شبکه‌های اجتماعی را دارید؟ با ذکر نوع و شرح فعالیت،
												نام ببرید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد فعالیت در شبکه‌های اجتماعی را دارید؟ با ذکر نوع و شرح فعالیت، نام ببرید سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا قصد استفاده از تبلیغات و کمپین‌های فروش را هم دارید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین‌های فروش را هم دارید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												چگونه می‌خواهید روی تولید محتوا نظارت داشته باشید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="چگونه می‌خواهید روی تولید محتوا نظارت داشته باشید؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟ سفارش محتوای اختصاصی وبسایت"
											/>
										</div>
										<div className="mt-5">
											<label>زمان مورد نظر خود را برای انجام پروژه بفرمایید</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="زمان مورد نظر خود را برای انجام پروژه بفرمایید سئو و بهینه سازی محتوایی صفحات وب"
											/>
										</div>
										<div className="mt-5">
											<label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را
												انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={specialSkills}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی محتوایی صفحات وب"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label> نامی برای پروژه‌ی خود انتخاب کنید</label>
										<input onChange={this.setChange}
										       type="text"
										       className="input border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="نامی برای پروژه‌ی خود انتخاب کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										<div className="mt-5">
											<label>نام شرکت یا کسب وکار خود را وارد کنید</label>
											<input
												type="text"
												className="input border mt-2 mr-2"
												style={{width: "90%"}}
												placeholder='...'
												onChange={this.setChange}
												name="نام شرکت یا کسب وکار خود را وارد کنید خدمات تعیین استراتژی محتوا و برندینگ"
											/>

										</div>
										<div className="mt-5">
											<label>از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر
												یا کمتر توصیف کنید)</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>آدرس وبسایت خود را وارد کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="آدرس وبسایت خود را وارد کنید خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی
												کرده‌اید؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>آیا برای کسب‌وکار شما برندینگ (لوگو، نشان تجاری، شعار، داستان شکل
												گیری و ...) طراحی شده است؟</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را به ما معرفی کنید؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>آیا برند شما شعار دارد؟ تا چه اندازه از ضرورت شعار برند در شناساندن
												کسب‌وکار خود به مشتری مطلع هستید؟</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را به ما معرفی کنید؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>ایا اهداف استراتژی محتوایی خود را می‌دانید؟</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="اهداف استراتژی محتوایی خود را به ما معرفی کنید؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												بیشترین درآمد شرکت مربوط به کدام محصول است؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="بیشترین درآمد شرکت مربوط به کدام محصول است؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												بیشترین درآمد شرکت مربوط به کدام محصول است؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="بیشترین درآمد شرکت مربوط به کدام محصول است؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												ساختار تیم فروش شما چگونه است؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="ساختار تیم فروش شما چگونه است؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												چند نفر در تیم محتوایی شما فعالیت می‌کنند؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="چند نفر در تیم محتوایی شما فعالیت می‌کنند؟ خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید)
											</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={strategySpecial}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												اهداف و دستاوردها مخصوص شما در خصوص استراتژی محتوا و برندینگ چیست؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="زمان مورد نظر خود را برای انجام پروژه بفرمایید خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												زمان مورد نظر خود را برای انجام پروژه بفرمایید
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="زمان مورد نظر خود را برای انجام پروژه بفرمایید خدمات تعیین استراتژی محتوا و برندینگ"
											/>
										</div>
										<div className="mt-5">
											<label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را
												انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={strategySkills}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>تولید و بهینه سازی محتوای شبکه‌های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label> نامی برای پروژه‌ی خود انتخاب کنید</label>
										<input onChange={this.setChange}
										       type="text"
										       className="input border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="نامی برای پروژه‌ی خود انتخاب کنید. تولید و بهینه سازی محتوای شبکه‌های اجتماعی"/>
										<div className="mt-5">
											<label>نام شرکت یا کسب وکار خود را وارد کنید</label>
											<input
												type="text"
												className="input border mt-2 mr-2"
												style={{width: "90%"}}
												placeholder='...'
												onChange={this.setChange}
												name="نام شرکت یا کسب وکار خود را وارد کنید تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>

										</div>
										<div className="mt-5">
											<label>از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر
												یا کمتر توصیف کنید)</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label>آیا برای کسب و کار خود وبسایت طراحی کرده‌اید؟ آدرس وبسایت خود را وارد
												کنید</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name=" آیا برای کسب و کار خود وبسایت طراحی کرده‌اید؟ آدرس وبسایت خود را وارد کنید تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label>حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی
												کرده‌اید؟</label>
											<input type="text"
											       className="input border mt-2 mr-2"
											       style={{width: "90%"}}
											       placeholder='...'
											       onChange={this.setChange}
											       name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label>آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟ از چه
												زمانی؟</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟ از چه زمانی؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label>هدف خود را از تمایل برای راه‌اندازی بازاریابی شبکه‌های اجتماعی شرح
												دهید</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="هدف خود را از تمایل برای راه‌اندازی بازاریابی شبکه‌های اجتماعی شرح دهید تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label>مایلید بازاریابی شبکه‌های اجتماعی شما از چه پلتفرم‌هایی صورت گیرد؟
												اینستاگرام، تلگرام، لینکدین، توئیتر، فیسبوک
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مایلید بازاریابی شبکه‌های اجتماعی شما از چه پلتفرم‌هایی صورت گیرد؟ اینستاگرام، تلگرام، لینکدین، توئیتر، فیسبوک تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟
											</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={socialSpecial}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												به پست شدن چه نوع عکس‌هایی در پست‌های اینستاگرام خود علاقه‌مندید؟
											</label>
											<input onChange={this.setChange}
											       type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به پست شدن چه نوع عکس‌هایی در پست‌های اینستاگرام خود علاقه‌مندید؟ تولید و بهینه سازی محتوای شبکه‌های اجتماعی"
											/>
										</div>
										<div className="mt-5">
											<label className="ml-4">
												با چه نوع لحنی مطالب شما نگاشته شوند؟ لحن داستانی، لحن رسمی، لحن
												محاوره‌ای، لحن گفت‌وگو (پرسش‌و پاسخ)، لحن خاطره
											</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={socialContent}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
										<div className="mt-5">
											<label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را
												انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
											<div className="mr-2" style={{width: '90%'}}>
												<Select options={socialSkills}
												        placeholder='...'
												        onChange={this.seSelect1}
												        name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) زمان مورد نظر خود را برای انجام پروژه بفرمایید"
												        isSearchable={true}
												        isRTL={true}
												        isClearable={true}
												        isMulti
												        styles={{width: '75%'}}
												/>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
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
											<h2 style={{fontSize: '16px'}}><strong>سئو و بهینه سازی محتوایی
												صفحات</strong>
											</h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>چرا سئو مهم است؟</strong>
											بدون سئو، یک وب‌سایت نمی‌تواند به‌درستی در نتایج موتورهای جستجو دیده شود؛
											بنابراین اگر موتور جستجو نتواند وب‌سایت شما را مشاهده کند، مطمئناً کاربران
											نیز قادر به یافتن محتوای سایت شما نخواهند بود.
											<br/><br/>
											<strong>چگونه ترافیک سایت در رتبه‌بندی گوگل و در نهایت افزایش فروش تاثیر
												گذار است؟</strong>
											افزایش ترافیک سایت باعث به معنی افزایش بازدیدکننده از سایت شماست هر چه سایت
											شما پربازدیدتر باشد رتبه وب‌سایت شما در مقایسه با رقبای خود پیشرفت و بهبود
											پیدا می‌کند و در نتیجه بهترین بازخورد و نرخ تبدیل کاربر به مشتری را برای
											سایت فراهم می‌آورد.
											<br/><br/>
											<strong>چرا سئو فرآیندی زمان‌بر است؟</strong>
											به دلایل زیر رتبه‌گرفتن در گوگل به وقت و حوصله احتیاج دارد:
											1. الگوریتم های Google بطور تکراری و بدون اعلام تغییر می کنند
											2. برای سئو کردن به مشاهده و جمع آوری داده های زیادی نیاز است
											3. رقابت در این حوزه به شدت بالاست
											4. توجه داشته باشید که حداکثر سود حاصل از سئو را هنگامی که اهداف بلند مدت
											تعیین کرده باشید به دست می‌آورید. اهدافی مانند هدایت بازدیدکنندگان بیشتر به
											وبسایت خود یا فروش بیشتر.
											<br/><br/>
											<strong>چه تضمینی برای ماندگاری ابدی در رتبه 1 گوگل وجود دارد.</strong>
											یکی از مهم‌ترین درخواست‌های کارفرما ارائه تضمین برای رسیدن به رتبه 1 در
											کلمات کلیدی هدف است در حالیکه این کار کاملا اشتباه و حتی غیرقانونی است. هیچ
											تضمینی برای تعیین دقیق رتبه شما در بازه زمانی مشخص وجود ندارد چرا که
											اطلاعاتی از آپدیت‌های بعدی گوگل و میزان فعالیت رقبا در دست نیست. در واقع
											ارائه تضمین به کارفرما شانس پذیرش پروژه را افزایش می‌دهد ولی همانطور که خود
											گوگل نیز بارها اعلام کرده است این روش نوعی از کلاه برداری است.
											<br/><br/>
											<strong>چگونه سرعت بارگزاری صفحات وب روی بهینه‌سازی (سئو) تاثیر گذار
												است؟</strong>
											اعتقاد عمومی این است که مدت زمان بارگذاری وب سایت شما، رتبه بندی موتور جستجو
											را تحت تاثیر قرار می دهد. این بدین معنی است که سایت سبک که در عرض چند ثانیه
											بارگذاری می شود، باید از لحاظ تئوری بالاتر از سایت دیگری باشد که سرعت لود آن
											مناسب نیست.
											<br/><br/>
											<strong>قیمت خدمات سئو چقدر است؟</strong>
											سئو یک محصول نیست بلکه مجموعه‌ای از خدمات تخصصی است در نتیجه نمیتوان قیمت
											مشخصی برای همه‌ی سایت‌ها در نظر گرفت. البته میتوان خدمات سئو را در دسته بندی
											های مختلفی شامل بهینه‌سازی سایت، بازاریابی محتوا، لینک سازی و … قرار داد و
											برای هرکدام هزینه مشخصی اعلام نمود. قدم اول آنالیز دقیق سایت و تصمیم‌گیری در
											مورد خدمات مورد نیاز است که بر همین اساس میتوان تخمین درستی از قیمت ارائه
											نمود.
											<br/><br/>
											<strong>برای رسیدن به رتبه 1 گوگل چقدر زمان لازم است؟</strong>
											پاسخ به این سوال برای هر کسب و کار و سایتی متفاوت خواهد بود؛ بسته به میزان
											اعتبار ‌و فعالیتهای پیشین سایت شما، کلمات کلیدی که انتخاب کرده‌اید وشرایط و
											جایگاه رقبا این زمان تعیین خواهد شد. ممکن است در یک حوزه بتوان در 3 ماه
											موفقیت‌های مهمی کسب کرد ولی در کسب و کاری دیگر یکسال یا حتی بیشتر برای
											رتبه‌گرفتن زمان لازم باشد.
											<br/><br/>
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
											<h2 style={{fontSize: '16px'}}><strong>سفارش محتوای محصول و بازاریابی
												محتوا</strong></h2>
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
								<AccordionItem className='my-1 border border-gray-300'>
									<AccordionItemHeading>
										<AccordionItemButton style={{
											textAlign: 'right',
											backgroundColor: 'white',
											borderBottom: 'solid 1px',
											borderColor: 'rgba(226, 232, 240, 1)'
										}}>
											<h2 style={{fontSize: '16px'}}><strong>سفارش محتوای اختصاصی وبسایت</strong>
											</h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>بازاریابی محتوا چست؟</strong>
											بازاریابی محتوا یک رویکرد استراتژیک بازاریابی نسبت به تولید و توزیع محتوای
											ارزشمند است که متناسب و منطبق با کسب‌وکار، مخاطبان مشخص خود را جذب می‌کند.
											هدف از این کار هدایت مشتری به فرآیند خرید سودآور است. به طور خلاصه به جای
											سخن گفتن از محصول و خدمت خود، اطلاعاتی را به او انتقال می‌دهد که دانش او را
											درباره محصول افزایش می‌دهد. <br/><br/>
											<strong>چبه زبان ساده برون‌سپاری تولید محتوا به چه معناست؟
												منظور از محتوای اختصاصی وب سایت چیست و چه اهمیتی دارد؟
											</strong>
											<strong>
												چه تفاوتی بین استراتژی محتوا و بازاریابی محتوایی وجود دارد؟
											</strong>
											استراتژی محتوا به معنای برنامه ریزی، توسعه و مدیریت محتوا چه به صورت متنی و
											چه به صورت رسانه‌ای ( صوت، تصویر، ویدئو و ...) است. استراتژی محتوا همان
											بازاریابی محتوا نیست؛ بازاریابی محتوا تنها بر روی یک قسمت از استراتژی محتوا
											تاکید دارد. <br/><br/>
											<strong>تولید محتوا در چه فرم‌هایی صورت می‌گیرد؟</strong>
											محتوای متنی
											محتوای صوتی
											محتوای تصویری
											محتوای ویدیویی
											محتوای کتاب الکترونیکی
											<br/><br/>
											<strong>کلمه کلیدی چیست؟</strong>
											کلمه کلیدی همان عبارتی هست که قصد داریم سایت خود را براساس آن برای موتورهای
											جستجو سئو کرده و جایگاه سایت را در آن عبارت مشخص، ارتقا دهیم. <br/><br/>
											<strong>چگونه سرعت بارگزاری صفحات وب روی بهینه‌سازی (سئو) تاثیر گذار
												است؟</strong>
											اعتقاد عمومی این است که مدت زمان بارگذاری وب سایت شما، رتبه بندی موتور جستجو
											را تحت تاثیر قرار می دهد. این بدین معنی است که سایت سبک که در عرض چند ثانیه
											بارگذاری می شود، باید از لحاظ تئوری بالاتر از سایت دیگری باشد که سرعت لود آن
											مناسب نیست.
											<br/><br/>
											<strong>محتوا چه تاثیری روی رتبه گرفتن وبسایت دارد؟</strong>
											بدون محتوای با کیفیت بالا ، باقی عوامل موثر در سئو کم‌اثر می‌شوند؛ محتوای
											مرتبط و مفید، بازدیدکنندگان وبسایت را ترغیب می کند تا مدت طولانی‌تری در
											صفحات سایت بمانند و این بر روی رتبه بندی جستجو در گوگل تأثیر مثبت
											دارد. <br/><br/>
											<strong>چکونه بهینه کردن محتوای رسانه‌ای مانند عکس در بهبود سئوی سایت
												تاثیرگذار است؟</strong>
											از تصاویر می توان برای رتبه بندی به صورت استراتژیک استفاده کرد. تصاویر
											همچنین می‌توانند تصاویر همچنین می توانند به موتورهای جستجو کمک کنند تا درک
											کنند محتوای شما چیست و علاوه‌بر آن در قسمت جستجوی تصاویر گوگل رتبه‌بندی شده
											و بازدیدکنندگان بیشتری را به وبسایت‌ها هدایت کنند.
											<br/><br/>
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
											<h2 style={{fontSize: '16px'}}><strong>خدمات تعیین استراتژی محتوا و
												برندینگ</strong></h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>چگونه بازاریابی محتوایی می‌تواند برای کسب وکارها سودمند
												باشد؟</strong>
											بازاریابی محتوا یک استراتژی طولانی مدت است که با استفاده از محتوا (در قالب
											های متنوع) رابطه قوی تری با مخاطبان ایجاد می کند ، توجه آنها را جلب می کند ،
											تعامل را بهبود می بخشد و نام تجاری را به صورت مستمر به کاربران یادآوری
											می‌کند.
											<br/><br/>
											<strong>
												کدامیک از شرکت‌های مطرح دنیا از خدمات بازاریابی محتوایی بهره می‌برند؟
											</strong>
											شرکتهایی مانند Evernote، Grow and Convert، Zendesk's Relate، Envato،
											<br/><br/>
											<strong>
												چه نوع محتوایی برای مشتریان ارزشمند است؟
											</strong>
											هر محتوای جذاب و منحصر به فردی که مخاطبان شما نتوانند آن را در جای دیگری
											(وبسایت دیگری) یافت کنند.
											<br/><br/>
											<strong>بهترین ابزارها برای استفاده در بازاریابی محتوا کدامند؟ </strong>
											وبسایت‌ها و شبکه‌های اجتماعی مانند اینستاگرام، تلگرام، فیسبوک، یوتیوب،
											توئیتر و ...
											<br/><br/>
											<strong>برند چیست و چرا برای موفقیت یک شرکت برند ضروری است؟</strong>
											<strong>چگونه سرعت بارگزاری صفحات وب روی بهینه‌سازی (سئو) تاثیر گذار
												است؟</strong>
											به طور کلی برند، فرایندیست که یک کمپانی، کسب و کار، سازمان و حتی یک فرد از
											سوی دیگران درک می‌شود. برند فراتر از یک نام تجاری، یک طرح، نشانه و… است و
											باید آن را احساس قابل تشخیص از یک محصول یا کسب و کار بدانیم.
											<br/><br/>
											<strong>اختلاف بین لوگوی کمپانی و برندینگ چیست؟ آیا لوگو همان برند
												است؟</strong>
											لوگو نمادی برای معرفی حضور یک شرکت است. مثل لوگوی نایک ، ایرانسل و پوما در
											رنگ و طرح‌های متفاوت. برندینگ عبارت است از تجربه مشتری از برند شرکت شما
											درحالی‌که که لوگو عبارت است یک جزء کوچک از برند که همه نقاط تماس با مشتری را
											با آن علامت‌گذاری می‌نماییم.
											<br/><br/>
											<strong>هر چند وقت یکبار باید تصویر برندم را به روزرسانی کنم؟</strong>
											اکثر شرکت های بزرگ تصویر برندشان را هر 7 الی 10 یکسال یکبار به روزرسانی کنند
											صرف نظر از موقعیت و شرایطی که در آن هستند.
											<br/><br/>
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
											<h2 style={{fontSize: '16px'}}><strong>تولید و بهینه سازی محتوای شبکه‌های
												اجتماعی</strong></h2>
										</AccordionItemButton>
									</AccordionItemHeading>
									<AccordionItemPanel>
										<h5 style={{textAlign: 'justify'}}>
											<strong>تولید و بهینه سازی محتوای شبکه‌های اجتماعی</strong>
										</h5>
									</AccordionItemPanel>
								</AccordionItem>

							</Accordion>
						</div>
					</>
				)
			}


			else if (this.state.seo === false && this.state.social === false && this.state.contentProduct && this.state.contentSpecial === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.social === false && this.state.contentProduct && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.social === false && this.state.contentSpecial && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.contentProduct === false && this.state.contentSpecial && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						{this.renderButton()}

					</>
				)
			}
			else if (this.state.social === false && this.state.contentProduct === false && this.state.contentSpecial && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}


			else if (this.state.seo === false && this.state.social === false && this.state.contentProduct === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.social === false && this.state.contentSpecial === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.social === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.contentProduct === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>
						{this.renderButton()}

					</>
				)
			}
			else if (this.state.seo === false && this.state.contentSpecial === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						{this.renderButton()}

					</>
				)
			}


			else if (this.state.contentProduct === false && this.state.contentSpecial === false && this.state.strategy === false) {
				return (
					<>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>
						{this.renderButton()}
					</>
				)
			}


			else if (this.state.social === false && this.state.contentProduct === false && this.state.contentSpecial === false) {
				return (
					<>


						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.social === false && this.state.contentProduct === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.social === false && this.state.contentSpecial === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}


			else if (this.state.seo === false && this.state.social === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.contentProduct === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.contentSpecial === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.seo === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>
						{this.renderButton()}

					</>
				)
			}


			else if (this.state.social === false && this.state.contentProduct === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.social === false && this.state.contentSpecial === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.social === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}


			else if (this.state.contentProduct === false && this.state.contentSpecial === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.contentProduct === false && this.state.strategy === false) {
				return (
					<>


						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>


						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>

						{this.renderButton()}
					</>
				)
			}
			else if (this.state.contentSpecial === false && this.state.strategy === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>
						{this.renderButton()}
					</>
				)
			}


			else if (this.state.social === false) {
				return (
					<>

						<Tabs>
							<TabList>
								<Tab>سرویس شبکه های اجتماعی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">

									<div className="preview">
										<label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین
											گزینه را
											انتخاب کنید) </label>
										<select onChange={this.seSelect}
										        name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}}
											        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف گذاری
											</option>
											<option value="اینستاگرام"> اینستاگرام</option>
											<option value="تلگرام">تلگرام</option>
											<option value=" لینکدین"> لینکدین</option>
											<option value="توییتر">توییتر</option>
											<option value="فیسبوک">فیسبوک</option>
											<option value="یوتیوب">یوتیوب</option>
										</select>

										<div className="mt-5">
											<label>
												به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب
												کنید)
											</label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی"
											        className="input w-56 border mr-2">
												<option value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="شناخت و دسته بندی مخاطبان"> شناخت و دسته بندی مخاطبان
												</option>
												<option value="آنالیز صفحات رقبا">آنالیز صفحات رقبا</option>
												<option value=" تولید محتوای منظم"> تولید محتوای منظم</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="مشاوره و پیشنهاد استراتژی تولید محتوا">مشاوره و پیشنهاد
													استراتژی تولید محتوا
												</option>
												<option value="ادمین و مدیریت صفحه">ادمین و مدیریت صفحه</option>
												<option value="جذب فالوئر و مخاطب">جذب فالوئر و مخاطب</option>
											</select>
										</div>
										<div className="mt-5">
											<div>
												<label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
												<textarea onChange={this.setChange} rows="8"
												          className="input border mt-2"
												          style={{height: "180px", width: '100%'}}
												          name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}

					</>
				)
			}
			else if (this.state.seo === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>خدمات سئو</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>
											به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)
										</label>
										<select onChange={this.seSelect}
										        name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) خدمات سئو"
										        className="input w-56 border mr-2">
											<option style={{color: '#B6C1CF'}} value=" سئو تکنیکال">سئو تکنیکال</option>
											<option value="بازاریابی محتوا">بازاریابی محتوا</option>
											<option value="ویرایش سئو">ویرایش سئو</option>
											<option value="مشاوره سئو">
												مشاوره سئو
											</option>
											<option value="لینک سازی">لینک سازی</option>
											<option value="سئو محلی">سئو محلی</option>
										</select>
										<div className="mt-5">
											<label>هدف شما از بکارگیری سئو چیست؟</label>
											<input onChange={this.setChange}
											       name="هدف شما از بکارگیری سئو چیست؟ خدمات سئو"
											       type="text" className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											/>
										</div>
										<div className="mt-5">
											<label>آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به
												دنبال بهبود کدام نقاط هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا پیش از این، مطالب خود را بر اساس سئو نگارش کرده اید؟ از این پس به دنبال بهبود کدام نقاط هستید؟ خدمات سئو"/>
										</div>
										<div className="mt-5">
											<label>توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر
												بفرمایید</label>
											<textarea onChange={this.setChange} rows="8" className="input border mt-2"
											          style={{height: "180px", width: '100%'}}
											          name="توضیحاتی درباره کسب و کار و یا محتوای مورد نظر خود ذکر بفرمایید خدمات سئو">
				</textarea>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.strategy === false) {
				return (
					<>

						<Tabs>
							<TabList>
								<Tab>خدمات تعیین استراتژی محتوا و برندینگ</Tab>

							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا شرحی از کسب و کار خود را بیان کنید خدمات تعیین استراتژی محتوا و برندینگ"/>


										<div className="mt-5">
											<label>به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب
												کنید) </label>
											<select onChange={this.seSelect}
											        name="به کدام یک از خدمات زیر نیاز دارید؟ (می تواند چندین گزینه را انتخاب کنید) خدمات تعیین استراتژی محتوا و برندینگ"
											        className="input w-56 border mr-2">
												<option style={{color: '#B6C1CF'}}
												        value="نیازسنجی مخاطبان و هدف گذاری">نیازسنجی مخاطبان و هدف
													گذاری
												</option>
												<option value="تحلیل رقبا و صنعت">تحلیل رقبا و صنعت</option>
												<option value="تولید محتوای منظم">تولید محتوای منظم</option>
												<option value="تعیین کانال ها و نحوه ی نشر محتوا">تعیین کانال ها و نحوه
													ی نشر محتوا
												</option>
												<option value="تحقیق کلید واژه ها">تحقیق کلید واژه ها</option>
												<option value="برندینگ (مدیریت برند)">برندینگ (مدیریت برند)</option>
												<option value="تبلیغات">تبلیغات</option>
												<option value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
												<option value="مشاوره و پیشنهاد استراتژی بازاریابی">مشاوره و پیشنهاد
													استراتژی بازاریابی
												</option>
											</select>
										</div>
										<div className="mt-5">
											<label>لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و
												بلند مدت،
												مشخص کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="لطفا افق زمانی خود را برای تولید محتوا به همراه اهداف کوتاه مدت و بلند مدت، مشخص کنید. خدمات تعیین استراتژی محتوا و برندینگ"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange}
				          rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات خدمات تعیین استراتژی محتوا و برندینگ">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>

						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.contentSpecial === false) {
				return (
					<>

						<Tabs>
							<TabList>
								<Tab>سفارش محتوای اختصاصی</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>کدام یک از انواع محتوا را درنظر دارید؟ </label>
										<select name="کدام یک از انواع محتوا را درنظر دارید؟ سفارش محتوای اختصاصی"
										        onChange={this.seSelect} className="input w-56 border mr-2">
											<option value="متن">متن</option>
											<option value="تصویر">تصویر</option>
											<option value="ویدیو">ویدیو</option>
										</select>
										<div className="mt-5">
											<label>فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی،
												مقاله،
												کاتالوگ و..)</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="فرم مدنظر خود را به صورت دقیق تر ذکر بفرمایید. (مثلا اینفوگرافی، مقاله، کاتالوگ و..) سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>حجم محتوای مد نظر خود را ذکر کنید.</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="حجم محتوای مد نظر خود را ذکر کنید. سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="این محتوا را از چه کانالی(طریقی) منتشر خواهید کرد؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا
												چیست؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="مخاطبان محتوای شما چه کسانی هستند و هدف شما از تولید این محتوا چیست؟ سفارش محتوای اختصاصی"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای اختصاصی">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}
			else if (this.state.contentProduct === false) {
				return (
					<>
						<Tabs>
							<TabList>
								<Tab>سفارش محتوای محصول و خدمات فروش آنلاین</Tab>
							</TabList>
							<TabPanel>
								<div className="p-5" id="input">
									<div className="preview">
										<label>لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید.</label>
										<input onChange={this.setChange} type="text" className="input  border mt-2 mr-2"
										       style={{width: "90%"}}
										       name="لطفا توضیح مختصری از کسب و کار و یا محصول خود بنویسید. سفارش محتوای محصول و خدمات فروش آنلاین"/>
										<div className="mt-5">
											<label>به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات
												خود به
												تولید محتوا نیاز دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="به دنبال خدمات کامل فروش آنلاین هستید و یا تنها برای معرفی محصولات خود به تولید محتوا نیاز دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا قصد استفاده از تبلیغات و کمپین های فروش را هم دارید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول)
												هستید؟</label>
											<input onChange={this.setChange} type="text"
											       className="input  border mt-2 mr-2"
											       style={{width: "90%"}}
											       name="آیا به دنبال تولید محتوای آموزشی و خبری (در کنار محتوای محصول) هستید؟ سفارش محتوای محصول و خدمات فروش آنلاین"/>
										</div>
										<div className="mt-5">
											<label>توضیحات</label>
											<div className="mt-2">
				<textarea onChange={this.setChange} rows="8"
				          className="input border mt-2"
				          style={{height: "180px", width: '100%'}}
				          name="توضیحات سفارش محتوای محصول و خدمات فروش آنلاین">
				</textarea>
											</div>
										</div>
									</div>
								</div>
							</TabPanel>
						</Tabs>
						{this.renderButton()}
					</>
				)
			}

		}
		else if (this.state.button === false) {
			return (
				<div className="p-5" id="input">

					<div className="preview mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
						<button
							className={this.state.seo ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
							onClick={this.onClickSeo} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p className="">سئو و بهینه سازی محتوایی صفحات وب</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>
						</button>
						<button
							className={this.state.contentProduct ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
							onClick={this.onClickContentProduct} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p className="">سفارش محتوای محصول و بازاریابی محتوا</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>

						</button>
						<button
							className={this.state.contentSpecial ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
							onClick={this.onClickContentSpecial} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p className="">سفارش محتوای اختصاصی وبسایت</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>

						</button>
						<button
							className={this.state.strategy ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
							onClick={this.onClickStrategy} style={{width: '20%', height: '150px'}}>
							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p className=""> خدمات تعیین استراتژی محتوا و برندینگ</p>
								<FeatherIcon className="mr-auto" size={40} icon="package"/>
							</div>
						</button>
						<button
							className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
							onClick={this.onClickSocial} style={{width: '20%', height: '150px'}}>

							<div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
								<p className="">تولید و بهینه سازی محتوای شبکه‌های اجتماعی</p>
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

	renderButton() {
		return (
			<div className="m-auto pb-3">
				<button onClick={this.forms.bind(this)} type="button" className="button bg-theme-1 mb-4 text-white "
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
					</div> : "تایید"}
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
				<Mobile/>
				<div className="flex">
					<NavBar activeClass={this.state.activeClass}/>
					<div className="content">
						<Top/>
						<div className="grid grid-cols-12 gap-6 mt-5">
							<div className="intro-y col-span-12 lg:col-span-12">
								<div className="intro-y box">
									<div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
									     style={{justifyContent: "center", flexDirection: 'column'}}>
										<h2>محتواپردازی و سئو</h2>
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

export default seo
