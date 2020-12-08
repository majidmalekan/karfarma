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

class digital extends Component {
    state = {
        status: [],
        pic: null,
        show: false,
        loading: false,
        error: '',
        showConfirm: false,
        activeClass: '7',
        campaign: true,
        email: true,
        service: true,
        social: true,
        button: false,
        xx: [],
        usename: '',
        x: [],
        sus_id: '',
    };

    constructor(props) {
        super(props);
        this.loginUp = this.loginUp.bind(this);
        this.onClickCampaign = this.onClickCampaign.bind(this);
        this.onClickService = this.onClickService.bind(this);
        this.onClickSocial = this.onClickSocial.bind(this);
        this.onClickEmail = this.onClickEmail.bind(this);
        this.forms = this.forms.bind(this);
        this.setChange = this.setChange.bind(this);
        this.seSelect = this.seSelect.bind(this);
	    this.seSelect2 = this.seSelect2.bind(this);
	    this.seSelect1 = this.seSelect1.bind(this);
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

    onClickEmail() {
        this.setState({
            email: !this.state.email,
        });
        if (this.state.email === true) {
            this.state.status.push({
                'sub_id': '11',
                'title': ' بازاریابی ایمیلی و پیامکی'
            });
        }
        if (this.state.email === false) {
            this.state.status.indexOf('11');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '11') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickSocial() {
        this.setState({
            social: !this.state.social,
        });
        if (this.state.social === true) {
            this.state.status.push({
                'sub_id': '10',
                'title': '  سرویس شبکه های اجتماعی'
            });
        }
        if (this.state.social === false) {
            this.state.status.indexOf('10');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '10') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickService() {
        this.setState({
            service: !this.state.service,
        });
        if (this.state.service === true) {
            this.state.status.push({
                'sub_id': '9',
                'title': 'سرویس سایت'
            });
        }
        if (this.state.service === false) {
            this.state.status.indexOf('7');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '7') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickCampaign() {
        this.setState({
            campaign: !this.state.campaign,
        });
        if (this.state.campaign === true) {
            this.state.status.push({
                'sub_id': '8',
                'title': 'کمپین و تبلیغات'
            });
        }
        if (this.state.campaign === false) {
            this.state.status.indexOf('8');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '8') {
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
            if (this.state.email === false && this.state.social === false && this.state.service === false && this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>راه اندازی کمپین و تبلیغات</Tab>
                            </TabList>
	                        <TabPanel>
		                        <div className="p-5" id="input">
			                        <div className="preview">
				                        <label> نامی برای پروژه‌ی خود انتخاب کنید</label>
				                        <input onChange={this.setChange}
				                               type="text"
				                               className="input border mt-2 mr-2"
				                               style={{width: "90%"}}
				                               name="نامی برای پروژه‌ی خود انتخاب کنید. راه اندازی کمپین و تبلیغات"/>
				                        <div className="mt-5">
					                        <label>نام شرکت یا کسب وکار خود را وارد کنید</label>
					                        <input
						                        type="text"
						                        className="input border mt-2 mr-2"
						                        style={{width: "90%"}}
						                        placeholder='...'
						                        onChange={this.setChange}
						                        name="نام شرکت یا کسب وکار خود را وارد کنید راه اندازی کمپین و تبلیغات"
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
					                               name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آدرس وبسایت خود را وارد کنید</label>
					                        <input type="text"
					                               className="input border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               placeholder='...'
					                               onChange={this.setChange}
					                               name="آدرس وبسایت خود را وارد کنید (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>شرح کار وبسایت خود را معرفی کنید</label>
					                        <input type="text"
					                               className="input border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               placeholder='...'
					                               onChange={this.setChange}
					                               name="شرح کار وبسایت خود را معرفی کنید راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>
						                        حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟
                                            </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        قصد دارید کمپین تبلیغاتی خود را از طریق چه کانال‌هایی اطلاع رسانی کنید
					                        </label>
						                        <input onChange={this.setChange}
						                               type="text"
						                               className="input  border mt-2 mr-2"
						                               style={{width: "90%"}}
						                                name="قصد دارید کمپین تبلیغاتی خود را از طریق چه کانال‌هایی اطلاع رسانی کنید راه اندازی کمپین و تبلیغات"

						                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        هدف خود را از راه اندازی کمپین تبلیغاتی شرح دهید
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="هدف خود را از راه اندازی کمپین تبلیغاتی شرح دهید راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        قصد دارید از چه کانال‌هایی تبلیغات انجام دهید
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
                                                   name="قصد دارید از چه کانال‌هایی تبلیغات انجام دهید راه اندازی کمپین و تبلیغات"

						                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        آیا قصد استفاده از تبلیغاتی محیطی را دارید؟ مثل تبلیغات در تلویزیون، تبلیغات بیلبوردی،
                                            </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا قصد استفاده از تبلیغاتی محیطی را دارید؟ مثل تبلیغات در تلویزیون، تبلیغات بیلبوردی، راه اندازی کمپین و تبلیغات"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        آیا قصد استفاده از تبلیغات دیجیتالی را دارید؟ مثل تبلیغات کلیکی، تبلیغات بنری، تبلیغات گوگل
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا قصد استفاده از تبلیغات دیجیتالی را دارید؟ مثل تبلیغات کلیکی، تبلیغات بنری، تبلیغات گوگل راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        آیا قصد استفاده از گوگل ادوردز را دارید؟ برای چه کلمات کلیدی ؟
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا قصد استفاده از گوگل ادوردز را دارید؟ برای چه کلمات کلیدی ؟ راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        آیا تا به حال از روش‌های کمپین‌های تبلیغاتی (ایمیل مارکتینگ، بازاریابی سنتی، تبلیغات محیطی مثل چاپ بنر  و ...) استفاده کرده‌اید؟ لطفا تجربه خود و میزان تاثیرگذاری آن‌ها را شرح دهید
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا تا به حال از روش‌های کمپین‌های تبلیغاتی (ایمیل مارکتینگ، بازاریابی سنتی، تبلیغات محیطی مثل چاپ بنر  و ...) استفاده کرده‌اید؟ لطفا تجربه خود و میزان تاثیرگذاری آن‌ها را شرح دهید راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        ایا دیتابیس مشخصی از مشتریان یا مخاطبین خود دارید؟ شرح دهید
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="ایا دیتابیس مشخصی از مشتریان یا مخاطبین خود دارید؟ شرح دهید راه اندازی کمپین و تبلیغات"
					                        />
				                        </div>
			                        </div>
		                        </div>
	                        </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>سئو و بهینه سازی موتورهای جستجو سرویس سایت</Tab>
                            </TabList>
	                        <TabPanel>
		                        <div className="p-5" id="input">
			                        <div className="preview">
				                        <label> نامی برای پروژه‌ی خود انتخاب کنید</label>
				                        <input onChange={this.setChange}
				                               type="text"
				                               className="input border mt-2 mr-2"
				                               style={{width: "90%"}}
				                               name="نامی برای پروژه‌ی خود انتخاب کنید. سئو و بهینه سازی موتورهای جستجو سرویس سایت"/>
				                        <div className="mt-5">
					                        <label>نام شرکت یا کسب وکار خود را وارد کنید</label>
					                        <input
						                        type="text"
						                        className="input border mt-2 mr-2"
						                        style={{width: "90%"}}
						                        placeholder='...'
						                        onChange={this.setChange}
						                        name="نام شرکت یا کسب وکار خود را وارد کنید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سئو و بهینه سازی موتورهای جستجو سرویس سایت"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آدرس وبسایت خود را وارد کنید</label>
					                        <input type="text"
					                               className="input border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               placeholder='...'
					                               onChange={this.setChange}
					                               name="آدرس وبسایت خود را وارد کنید (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>در کمتر از یک سطر هدف خود را برای استفاده از بهینه‌سازی صفحات وب شرح
						                        دهید</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="در کمتر از یک سطر هدف خود را برای استفاده از بهینه‌سازی صفحات وب شرح دهید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
						                                name="آیا می‌دانید که فرآیند بهینه‌سازی صفحات وب یک پروسه زمان‌بر است و رتبه گرفتن صفحات وبسایت شما یک شبه اتفاق نمی‌افتد؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="آیا در گذشته نسبت به بهینه‌سازی (سئوی ) وبسایت خود اقدام کرده‌اید؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
						                                name="در کدام حوزه‌های بهینه‌سازی صفحات وبسایت مایل به سرمایه‌گذاری هستید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
						                                name="تمایل دارید کدامیک از انواع محتوا برای شما تولید و بهینه شود؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="کلمات کلیدی مورد نظر خود را معرفی کنید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="در کدام کلمات کلیدی قصد دارید در جایگاه اول صفحه نتایج گوگل قرار بگیرید؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="محصولات و خدمات خود را معرفی کنید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="اگر قصد مقاله نویسی اختصاصی برای وب سایت خود را دارید، حوزه‌ها و موضوعات آن‌ها را مشخص کنید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="اهداف استراتژی محتوایی خود را معرفی کنید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="مشتریان شما چه کسانی هستند و از چه کانال‌هایی جذب شده‌اند؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="چند نفر در تیم محتوایی شما فعالیت می‌کنند؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب
						                        کنید)</label>
					                        <div className="mr-2" style={{width: '90%'}}>
						                        <Select options={special}
						                                placeholder='...'
						                                onChange={this.seSelect1}
						                                name="به کدام یک از خدمات زیر نیاز دارید؟(می تواند چندین گزینه را انتخاب کنید) سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
					                               name="اهداف و دستاوردها مخصوص شما در خصوص استراتژی محتوا و برندینگ چیست؟ سئو و بهینه سازی موتورهای جستجو سرویس سایت"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>زمان مورد نظر خود را برای انجام پروژه بفرمایید</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="زمان مورد نظر خود را برای انجام پروژه بفرمایید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        از کسب و کار خود بیشتر بگوئید
					                        </label>
					                        <textarea onChange={this.setChange}
					                                  name="از کسب و کار خود بیشتر بگوئید سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
						                                name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) سئو و بهینه سازی موتورهای جستجو سرویس سایت"
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
                                <Tab>بازاریابی شبکه‌های اجتماعی</Tab>
                            </TabList>
	                        <TabPanel>
		                        <div className="p-5" id="input">
			                        <div className="preview">
				                        <label> نامی برای پروژه‌ی خود انتخاب کنید</label>
				                        <input onChange={this.setChange}
				                               type="text"
				                               className="input border mt-2 mr-2"
				                               style={{width: "90%"}}
				                               name="نامی برای پروژه‌ی خود انتخاب کنید. بازاریابی شبکه‌های اجتماعی"/>
				                        <div className="mt-5">
					                        <label>نام شرکت یا کسب وکار خود را وارد کنید</label>
					                        <input
						                        type="text"
						                        className="input border mt-2 mr-2"
						                        style={{width: "90%"}}
						                        placeholder='...'
						                        onChange={this.setChange}
						                        name="نام شرکت یا کسب وکار خود را وارد کنید بازاریابی شبکه‌های اجتماعی"
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
					                               name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) بازاریابی شبکه‌های اجتماعی"
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
					                               name=" آیا برای کسب و کار خود وبسایت طراحی کرده‌اید؟ آدرس وبسایت خود را وارد کنید بازاریابی شبکه‌های اجتماعی"
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
					                               name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ بازاریابی شبکه‌های اجتماعی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟ از چه
						                        زمانی؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟ از چه زمانی؟ بازاریابی شبکه‌های اجتماعی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>هدف خود را از تمایل برای راه‌اندازی بازاریابی شبکه‌های اجتماعی شرح
						                        دهید</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="هدف خود را از تمایل برای راه‌اندازی بازاریابی شبکه‌های اجتماعی شرح دهید بازاریابی شبکه‌های اجتماعی"
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
					                               name="مایلید بازاریابی شبکه‌های اجتماعی شما از چه پلتفرم‌هایی صورت گیرد؟ اینستاگرام، تلگرام، لینکدین، توئیتر، فیسبوک بازاریابی شبکه‌های اجتماعی"
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
						                                name="چه نوع محتوایی را برای شبکه‌های اجتماعی خود می‌پسندید؟ بازاریابی شبکه‌های اجتماعی"
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
					                               name="به پست شدن چه نوع عکس‌هایی در پست‌های اینستاگرام خود علاقه‌مندید؟ بازاریابی شبکه‌های اجتماعی"
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
						                                name=" با چه نوع لحنی مطالب شما نگاشته شوند؟ لحن داستانی، لحن رسمی، لحن محاوره‌ای، لحن گفت‌وگو (پرسش‌و پاسخ)، لحن خاطره بازاریابی شبکه‌های اجتماعی"
						                                isSearchable={true}
						                                isRTL={true}
						                                isClearable={true}
						                                styles={{width: '75%'}}
						                        />
					                        </div>
				                        </div>
				                        <div className="mt-5">
					                        <label>به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم)</label>
					                        <div className="mr-2" style={{width: '90%'}}>
						                        <Select options={socialSkills}
						                                placeholder='...'
						                                onChange={this.seSelect1}
						                                name="به چه مهارتهایی برای پیشبرد پروژه‌ی خود نیازمندید؟ (حداکثر 5 مهارت را انتخاب کنید تا بتوانیم درک بهتری از نیاز شما پیدا کنیم) بازاریابی شبکه‌های اجتماعی"
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
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
	                        <TabPanel>
		                        <div className="p-5" id="input">
			                        <div className="preview">
				                        <label> نامی برای پروژه‌ی خود انتخاب کنید</label>
				                        <input onChange={this.setChange}
				                               type="text"
				                               className="input border mt-2 mr-2"
				                               style={{width: "90%"}}
				                               name="نامی برای پروژه‌ی خود انتخاب کنید. بازاریابی ایمیلی و پیامکی"/>
				                        <div className="mt-5">
					                        <label>نام شرکت یا کسب وکار خود را وارد کنید</label>
					                        <input
						                        type="text"
						                        className="input border mt-2 mr-2"
						                        style={{width: "90%"}}
						                        placeholder='...'
						                        onChange={this.setChange}
						                        name="نام شرکت یا کسب وکار خود را وارد کنید بازاریابی ایمیلی و پیامکی"
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
					                               name="از کسب و کار خود بیشتر بگوئید ... (موضوع کسب و کار خود را در یک سطر یا کمتر توصیف کنید) بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>هدف شما از بازاریابی ایمیلی و پیامکی چیست؟</label>
					                        <input type="text"
					                               className="input border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               placeholder='...'
					                               onChange={this.setChange}
					                               name="هدف شما از بازاریابی ایمیلی و پیامکی چیست؟ بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>
						                        ایا از پنل یا سرویس خاصی برای بازاریابی ایمیلی استفاده می‌کنید؟ لطفا تجربه کاری خود را توصیف کنید
                                            </label>
					                        <input type="text"
					                               className="input border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               placeholder='...'
					                               onChange={this.setChange}
					                               name="ایا از پنل یا سرویس خاصی برای بازاریابی ایمیلی استفاده می‌کنید؟ لطفا تجربه کاری خود را توصیف کنید بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>
						                        ایا از شرکت یا سرویس خاصی برای بازاریابی پیامکی خود استفاده می‌کنید؟ لطفا تجربه کاری خود را توصیف کنید
                                                </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="ایا از شرکت یا سرویس خاصی برای بازاریابی پیامکی خود استفاده می‌کنید؟ لطفا تجربه کاری خود را توصیف کنید بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آدرس وبسایت خود را وارد کنید</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آدرس وبسایت خود را وارد کنید بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>
						                        شرح کار وبسایت خود را معرفی کنید
					                        </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="شرح کار وبسایت خود را معرفی کنید بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟
					                        </label>
                                                <input onChange={this.setChange}
						                                       type="text"
						                                       className="input  border mt-2 mr-2"
						                                       style={{width: "90%"}}
						                                name="حدودا در چه تاریخی وبسایت خود (یا سایر کانال‌ها) را راه‌اندازی کرده‌اید؟ بازاریابی ایمیلی و پیامکی"
						                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟
                                            </label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا تاکنون بازاریابی از طریق شبکه‌های اجتماعی انجام داده‌اید؟ بازاریابی ایمیلی و پیامکی"
					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label className="ml-4">
						                        چقدر با ایمیل مارکتینگ آشنایی دارید؟
					                        </label>
					                        <div className="mr-2" style={{width: '90%'}}>
						                        <input onChange={this.setChange}
						                                type="text"
						                                className="input  border mt-2 mr-2"
						                                style={{width: "90%"}}
						                                name="چقدر با ایمیل مارکتینگ آشنایی دارید؟  بازاریابی ایمیلی و پیامکی"
                                                />
					                        </div>
				                        </div>
				                        <div className="mt-5">
					                        <label>آیا تا به حال از بازاریابی ایمیلی استفاده کرده‌اید؟ از بازاریابی پیامکی چطور؟</label>
						                        <input onChange={this.setChange}
						                               type="text"
						                               className="input  border mt-2 mr-2"
						                               style={{width: "90%"}}
                                                       name="آیا تا به حال از بازاریابی ایمیلی استفاده کرده‌اید؟ از بازاریابی پیامکی چطور؟ بازاریابی ایمیلی و پیامکی"

						                        />

				                        </div>
				                        <div className="mt-5">
					                        <label>انتظار دارید که به صورت ماهانه چه تعداد کمپین ایمیلی ارسال شود؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="انتظار دارید که به صورت ماهانه چه تعداد کمپین ایمیلی ارسال شود؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>به کدام بخش از لیست مشتریان شما ایمیل شود و چه زمانی این ایمیل‌ها‌ ارسال شود؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="به کدام بخش از لیست مشتریان شما ایمیل شود و چه زمانی این ایمیل‌ها‌ ارسال شود؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>ایا دیتابیسی از دریافت کنندگان ایمیل یا پیامک، دارید یا خیر؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="ایا دیتابیسی از دریافت کنندگان ایمیل یا پیامک، دارید یا خیر؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>مخاطبین بازاریابی ایمیلی یا پیامکی شما از چه قشر یا تخصصی هستند؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="مخاطبین بازاریابی ایمیلی یا پیامکی شما از چه قشر یا تخصصی هستند؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آیا به طراحی خبرنامه نیاز دارید؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا به طراحی خبرنامه نیاز دارید؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آیا برای طراحی وارسال ایمیل اختیار کامل به شرکت می‌دهید یا مایلید طرح‌های ایمیلی، قبل از ارسال تأیید شما را دریافت کنند؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا برای طراحی وارسال ایمیل اختیار کامل به شرکت می‌دهید یا مایلید طرح‌های ایمیلی، قبل از ارسال تأیید شما را دریافت کنند؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>قصد دارید چه تعداد مشتری وفادار یا بازگشتی کسب کنید</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="قصد دارید چه تعداد مشتری وفادار یا بازگشتی کسب کنید بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>آیا نرخ کلیک (click rate)  و نرخ باز ( open rate) مشخصی را مد نظر دارید؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="آیا نرخ کلیک (click rate)  و نرخ باز ( open rate) مشخصی را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی"

					                        />
				                        </div>
				                        <div className="mt-5">
					                        <label>چه زمانی می‌خواهید گزارشات مربوط به معیارها را ببینید، و چه مواردی باید نشان داده شوند؟</label>
					                        <input onChange={this.setChange}
					                               type="text"
					                               className="input  border mt-2 mr-2"
					                               style={{width: "90%"}}
					                               name="چه زمانی می‌خواهید گزارشات مربوط به معیارها را ببینید، و چه مواردی باید نشان داده شوند؟ بازاریابی ایمیلی و پیامکی"

					                        />
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
						                    <h2 style={{fontSize: '16px'}}>
                                                <strong>
							                    راه اندازی کمپین و تبلیغات
                                            </strong>
							                    <strong>
								                    اهداف اصلی تبلیغات محیطی چیست؟
							                    </strong>
                                                استفاده از تبلیغات محیطی یک تفاوت عمده با برخی از روش‌های دیگر دارد و آن تفاوت این است که در تبلیغات محیطی، قبل از اینکه مشتری به مرکز خرید و یا بازار مراجعه نماید، نام محصول خدمات در ذهن او حک شده است.
							                    <br/><br/>
							                    <strong>
								                    معایب استفاده از انواع روش‌های تبلیغات محیطی چیست؟
							                    </strong>
							                    گران بودن هزینه‌ی نصب بیلبورد
							                    ضرورت اخذ مجوزهای لازم برای تبلیغات در سطح شهر، که معمولاً با دردسرهای زیادی نیز همراه است.
							                    تاثیرگذاری ویژه‌ی تبلیغات محیطی که ضمن محبوب ساختن یک برند، می‌تواند حالت عکس نیز داشته باشد و در صورت عدم بهره‌گیری از اصول تبلیغات به صورت صحیح، کاهش محبوبیت برند را به دنبال دارد.
							                    در تبلیغات محیطی مانند تبلیغات اینترنتی نمی‌توان درصد بازدید را مورد سنجش قرار داد.
							                    <br/><br/>
							                    <strong>
								                    آیا می‌دانید که بهینه‌سازی سایت (سئو) یک پروسه‌ی زمان‌بر است و سایت شما به مرور زمان رتبه می‌گیرد؟
							                    </strong>
							                    ج. مدت زمان کسب نتیجه از سئو به چند فاکتور از جمله سن و اعتبار سایت و همینطور پنالتی بودن یا نبودن بستگی دارد.
							                    هیچ روش جادویی برای سئو وجود ندارد. سئوی اصولی سایت نیازمند برنامه‌ریزی، تنظیمات مجدد سایت برای کسب رتبه بهتر و ترافیک بیشتر است. کسانی که ادعای بهینه کردن سایت در یک بازه‌ی زمانی کوتاه دارند با روش‌های غیراصولی و سریع خود پس از مدتی باعث جریمه شدن سایت شما از جانب گوگل می‌شوند. گوگل با استفاده از الگوریتم های خود نسبت به افزایش سریع رتبه سایت ها مشکوک شده و در صورت تایید استفاده آنها از روش های کلاه سیاه، آنها را با جریمه‌های سنگین رو به رو می کند.
                                                <br/><br/>
							                    <strong>
								                    مهمترین عوامل رتبه‌بندی گوگل کدامند؟
							                    </strong>
							                    در واقع این سوال اکثر افراد است که "چگونه رتبه‌ی بهتری در گوگل کسب کنیم؟" یا اینکه "چه عواملی بر رنکینگ سئوی سایت موثرند؟"
							                    اما تنها الگوریتم‌های گوگل می‌دانند که چه فاکتورهای در رتبه‌گیری بهتر یک صفحه‌ی سایت موثرند. در واقع بیش از 200 عامل در رتبه‌بندی صفحات سایت گزارش شده‌اند. این 200 عامل نشان‌دهنده‌ی این هستند که مدل سرچ کردن کاربران اینترنت تغییر کرده پس همگام با تغییرات نحوه‌ی سرچ، عوامل تاثیرگذار در رتبه‌بندی نیز تغییر می‌کنند.
                                                <br/><br/>
							                    <strong>
								                    چرا سرعت بارگیری یک وب‌سایت در سئوی تکنیکال موثر است؟
							                    </strong>
							                    چه مدت منتظر بارگیری یک وب سایت هستید؟ 5 ثانیه؟ 3 ثانیه؟ کمتر؟
							                    وقتی صحبت از انتظار برای سرعت سایت می شود، آیا می‌دانید 47٪ از افراد انتظار دارند سایت شما در کمتر از 2 ثانیه بارگیری شود؟ و اگر بیش از 3 ثانیه طول بکشد، 40٪ آن را رها می کنند. به گفته‌ی خود گوگل اگر سرعت سرور شما از دو ثانیه کمتر باشد ، Google میزان خزنده هایی را که برای سایت شما ارسال می کند کاهش می‌دهد.
                                                <br/><br/>
							                    <strong>
								                    بک لینک چیست و چرا بک لینک‌ها مهم هستند؟
							                    </strong>
							                    به زبان ساده، هنگامی‌که یک وب‌سایت به یک وب‌سایت دیگر لینک می‌دهد، یک «بک لینک» ساخته شده است. به بک لینک، inbound link یا لینک «ورودی» هم گفته می‌شود، زیرا باعث می‌شود که مردم «وارد» سایت شما شوند. External link یا لینک خارجی هم یکی دیگر از عناوین بک لینک است با افزایش لینک‌های به سمت سایت شما که به تدریج به دست می آیند، کاربران نیز از طریق این لینک ها با سایت شما آشنا شده و از آن بازدید می کنند. به تدریج گوگل نیز متوجه زحماتی که شما بر روی ایجاد محتوا می گنید خواهد شد و رتبه سایت را بهبود می بخشد.
							                    <br/><br/>
                                            </h2>
					                    </AccordionItemButton>
				                    </AccordionItemHeading>
				                    <AccordionItemPanel>
					                    <h5 style={{textAlign: 'justify'}}>
						                    <strong>Google Ads چیست؟</strong>
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
						                    <h2 style={{fontSize: '16px'}}><strong>بازاریابی شبکه‌های اجتماعی </strong>
						                    </h2>
					                    </AccordionItemButton>
				                    </AccordionItemHeading>
				                    <AccordionItemPanel>
					                    <h5 style={{textAlign: 'justify'}}>
						                    <strong>محتوای متنی در اینستاگرام باید به چه اندازه باشد؟</strong>
						                    برخلاف تولید محتوا برای وبسایت که حجم محتوای متنی برای این پلتفروم با توجه به ظرفیت آن زیاد است، در اینستاگرام هر چه کپشن‌ پست‌ها مفید و مختصرتر نوشته شوند بازخورد بهتری می‌گیرند؛ برخی افراد حتی عکس نوشته را هم از کپشن نویسی سودمندتر می‌دانند.
                                            <br/><br/>
						                    <strong>
							                    برای نمایش پست‌هایمان در صفحه‌ی سرچ اینستاگرام چه اقداماتی انجام دهیم؟
						                    </strong>
						                    با توجه به الگوریتم‌های اینستاگرام مجموعه‌ای از اقدامات اعم پست‌هایی با ویژگی‌های بصری زیبا و حرفه‌ای و متن‌های مختصر و کاربردی همچنین استوری ویدئو لایوهای جذاب‌ برای دیده شدن صفحات و در نهایت اکانت شما موثر هستند.
						                    <br/><br/>
						                    <strong>
							                    شبکه‌های اجتماعی نظیر تلگرام، فیسبوک، توئیتر و ... چگونه در افزایش ترافیک وبسایت من تاثیرگذارند؟
						                    </strong>
                                            در این زمینه تمام محتواهای متنی به صورت هدفمند و با ذکر آدرس صفحات سایت شما تولید می‌شوند که با افزایش ترافیک وبسایت شما در نهایت باعث رتبه گرفتن بهتر سایت شما در موتور جستجو شده و به فروش آنلاین شما کمک شایانی می‌کنند.
                                            <br/><br/>
						                    <strong>محتوا در شبکه اجتماعی لینکدین باید چگونه باشد؟</strong>
						                    در LinkedIn خود، فقط به نام و عنوان تجاری خود اکتفا نکنید، به کاربران نحوه کار خود را اعلام کنید، به آنها بگوئید که از چه طریقی می توانید برای آنها سودمند باشید.
						                    محتوایی که به اشتراک می‌گذارید را با زبان ساده بیان کنید، محتوایی را به اشتراک بگذارید که باب میل کاربران باشد. جمع آوری آدرس ایمیل و شماره تماس کاربران نیز روشی دیگر برای حفظ کردن ارتباط خود با آنهاست.
                                            <br/><br/>
						                    <strong>بازاریابی دیجیتالی در لینکدین چگونه صورت می‌گیرد؟</strong>
						                    سعی کنید یک گروه خوب ایجاد کنید، فقط به یک موضوع یا صنعتی خاص اشاره داشته باشد و یا به عبارتی دیگر ، از پراکندگی موضوعات بپرهیزید.
						                    در پاسخگویی به پرسش و پاسخ‌های لینکدین فعال باشید؛ این کار تبحر شما را در زمینه‌‌ی کاریتان نشان می‌دهد.
						                    محتوای مناسب تولید کنید.
                                            <br/><br/>
						                    <strong>    چگونه می‌توان در یوتیوب از طریق تبلیغات گوگل کسب درآمد کرد؟</strong>
						                    اعتقاد عمومی این است که مدت زمان بارگذاری وب سایت شما، رتبه بندی موتور جستجو
						                    را تحت تاثیر قرار می دهد. این بدین معنی است که سایت سبک که در عرض چند ثانیه
						                    بارگذاری می شود، باید از لحاظ تئوری بالاتر از سایت دیگری باشد که سرعت لود آن
						                    مناسب نیست.
						                    <br/><br/>
						                    <strong>محتوا چه تاثیری روی رتبه گرفتن وبسایت دارد؟</strong>
						                    ارائه ویدئوهای منظم با محتوای جذاب به شما این امکان را می دهد که از طریق یوتیوب درآمد داشته باشید. طبق آمار بیش از یک میلیون نفر از سی کشور به خاطر ساختان ویدئو و گذاشتن آن در یوتیوب، از این سازمان پول دریافت می کنند. برای کسب درآمد از یوتیوب بایستی حداقل 1000 نفر شما را فالو کنند و در طول یک سال بازدید کنندگان و بیننده ها، 4000 ساعت ویدئوهای شما را ببینند.
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
						                    <h2 style={{fontSize: '16px'}}><strong>
							                    بازاریابی ایمیلی و پیامکی
							                    </strong></h2>
					                    </AccordionItemButton>
				                    </AccordionItemHeading>
				                    <AccordionItemPanel>
					                    <h5 style={{textAlign: 'justify'}}>
						                    <strong>
							                    چگونه بازاریابی ایمیل خود را شروع کنیم؟
                                            </strong>
						                    برای شروع ایمیل مارکتینگ، شما نیاز به یک لیست ایمیل از مشتریان هدفمند، یک ابزار ارسال ایمیل، محتوایی که می‌خواهید ارسال کنید و امکان گزارش‌گیری و بررسی نتایج ایمیل مارکتینگ دارید.
                                            <br/><br/>
						                    <strong>
							                    چگونه نرخ Open-Rate ایمیل‌های ارسالی را افزایش دهیم؟
                                            </strong>
						                    افزایش نرخ کلیک ایمیل‌ها Click Rate در حقیقت به معنای افزایش فروش سایت  است
						                    مهمترین نکته در ایمیل مارکتینگ ارسال ایمیل تبلیغاتی به افرادی است خودشان با سایت شما آشنا شده‌اند و از طریق ثبت‌نام در سایت شما ایمیلشان را در اختیار شما قرارداده‌اند.
						                    <br/><br/>
						                    <strong>
							                    چگونه صفحات وبلاگ را برای دریافت ایمیل بهینه‌سازی کنیم؟

                                            </strong>
						                    شرط اول برای دریافت ایمیل کاربران ارزشمند بودن مطالب است. اگر کاربران از کیفیت مقالات شما رضایت نسبی داشته باشند در سایت شما ثبت نام می‌کنند. می‌توانید به اشتراک آنها در لیست ایمیل خود امیدوار باشید. به منظور تولید و تکمیل لیست باشگان مشتریان برای فرستادن ایمیل و یا پیامک انبوه می‌توانیم از فرآیند lead generation ( جذب مشتری راغب) استفاده کنیم. در واقع اساس کار lead generation به این صورت است که کاربران برای آنکه بتوانند ادامه‌ی محتوای یک سایت ( محتوای متنی، محتوا به صورت فایل عکس یا فایل ویدئویی ) را ببینند در ابتدا باید یک فرم که به صورت پرسشنامه است و نام و ایمیل و شماره تماس و ... آنها را دریافت می‌کند پر کنند.
                                            <br/><br/>
						                    <strong>بازاریابی پیامکی یا اس ام اس مارکتینگ چیست؟
                                            </strong>
						                    بازاریابی پیامکی یا اس ام اس مارکتینگ یک روش بازاریابی از طریق پیامک است. بازاریابی پیامکی روش مقرون به صرفه و بسیار موثر است و با استفاده از پنل ارسال پیامک انجام میشود. به دلیل در دسترس بودن تلفن همراه و عدم نیاز به اینترنت برای دریافت تبلیغات، دیده شدن پیامک‌های تبلیغاتی به میانگین بالای ۹۰٪ رسیده است.
                                            <br/><br/>
						                    <strong>برند چیست و چرا برای موفقیت یک شرکت برند ضروری است؟</strong>
						                    <strong>چگونه سرعت بارگزاری صفحات وب روی بهینه‌سازی (سئو) تاثیر گذار
							                    است؟</strong>
						                    به طور کلی برند، فرایندیست که یک کمپانی، کسب و کار، سازمان و حتی یک فرد از
						                    سوی دیگران درک می‌شود. برند فراتر از یک نام تجاری، یک طرح، نشانه و… است و
						                    باید آن را احساس قابل تشخیص از یک محصول یا کسب و کار بدانیم.
						                    <br/><br/>
						                    <strong>
							                    نحوه ثبت نام و کار با پنل‌های پیامکی به چه صورت است؟
                                            </strong>
						                    کارکرد اصلی یک پنل پیامکی واقعاً ساده است: ارسال و دریافت پیامک به صورت انبوه. همین! پس مطمئناً کار با یک سامانه پیام کوتاه آنقدرها هم پیچیده نخواهد بود. گذشته از این‌ها شما قادرید با سپردن مدیریت پنل‌ها به اسپراک از گذراندن وقت در این قسمت هم صرف نظر کنید.
						                    <br/><br/>
					                    </h5>
				                    </AccordionItemPanel>
			                    </AccordionItem>
		                    </Accordion>
	                    </div>
                    </>
                )
            }
            else if (this.state.email === false && this.state.social === false && this.state.service === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.email === false && this.state.social === false && this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.email === false && this.state.service === false && this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.social === false && this.state.service === false && this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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

                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.social === false && this.state.service === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
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
            else if (this.state.social === false && this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
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
            else if (this.state.social === false && this.state.email === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.campaign === false && this.state.service === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
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
            else if (this.state.campaign === false && this.state.email === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.email === false && this.state.service === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.social === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> سرویس شبکه های اجتماعی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                        <select name="قصد فعالیت در کدام یک از شبکه های اجتماعی را دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" onChange={this.seSelect} className="input w-56 border mr-2">
                                            <option style={{color: '#B6C1CF'}} value="">
                                                ...
                                            </option>
                                            <option  value=" اینستاگرام">
                                                اینستاگرام
                                            </option>
                                            <option  value="تلگرام">
                                                تلگرام
                                            </option>
                                            <option  value=" لینکدین">
                                                لینکدین
                                            </option>
                                            <option  value=" توییتر">
                                                توییتر
                                            </option>
                                            <option  value=" فیسبوک">
                                                فیسبوک
                                            </option>
                                            <option  value="یوتیوب">
                                                یوتیوب
                                            </option>
                                        </select>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) </label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس شبکه های اجتماعی" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="">
                                                    ...
                                                </option>
                                                <option  value=" شناخت و دسته بندی مخاطبان">
                                                    شناخت و دسته بندی مخاطبان
                                                </option>
                                                <option value=" آنالیز صفحات رقبا">
                                                    آنالیز صفحات رقبا
                                                </option>
                                                <option  value=" تولید محتوای منظم">
                                                    تولید محتوای منظم
                                                </option>
                                                <option  value=" تحقیق کلید واژه ها">
                                                    تحقیق کلید واژه ها
                                                </option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value=" ادمین و مدیریت صفحه">
                                                    ادمین و مدیریت صفحه
                                                </option>
                                                <option  value=" جذب فالوئر و مخاطب">
                                                    جذب فالوئر و مخاطب
                                                </option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید</label>
                                                <input onChange={this.setChange}
                                                       name="لطفا شرحی از کسب و کار خود و وضعیت فعلی آن بیان کنید سرویس شبکه های اجتماعی"
                                                       type="text"
                                                       className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس شبکه های اجتماعی">
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
            else if (this.state.service === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>سرویس سایت</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید سرویس سایت " type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"/>
                                        <div className="mt-5">
                                            <label>به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید)</label>
                                            <select onChange={this.seSelect} name="به کدام یک از خدمات زیر نیاز دارید؟ (می توانید چندین گزینه را انتخاب کنید) سرویس سایت" className="input w-56 border mr-2">
                                                <option style={{color: '#B6C1CF'}} value="شناخت و نیاز سنجی مخاطبان"> شناخت و نیاز سنجی مخاطبان</option>
                                                <option  value="تحلیل رقبا و صنعت"> تحلیل رقبا و صنعت</option>
                                                <option  value="تولید محتوا"> تولید محتوا</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی تولید محتوا">
                                                    مشاوره و پیشنهاد استراتژی تولید محتوا
                                                </option>
                                                <option  value="برندینگ">برندینگ</option>
                                                <option  value="پروموشن"> پروموشن</option>
                                                <option  value=" بهبود رتبه سایت"> بهبود رتبه سایت</option>
                                                <option  value=" مشاوره و پیشنهاد استراتژی بازاریابی">
                                                    مشاوره و پیشنهاد استراتژی بازاریابی
                                                </option>
                                                <option value="طراحی فروشگاه آنلاین"> طراحی فروشگاه آنلاین</option>
                                                <option  value="ایجاد پنل کاربری"> ایجاد پنل کاربری</option>
                                                <option  value=" مدیریت ارتباط با مشتری(CRM)"> مدیریت ارتباط با مشتری(CRM)</option>
                                                <option value="تبلیغات گوگل (گوگل ادز)">تبلیغات گوگل (گوگل ادز)</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.description} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات سرویس سایت">
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
            else if (this.state.campaign === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab> کمپین و تبلیغات</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید کمپین و تبلیغات"
                                               type="text"
                                               className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>آیا رسانه تبلیغات خود را انتخاب کرده اید؟</label>
                                            <input onChange={this.setChange}
                                                   name="آیا رسانه تبلیغات خود را انتخاب کرده اید؟ کمپین و تبلیغات"
                                                   type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف یا پیام تبلیغاتی خود را ذکر کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هدف یا پیام تبلیغاتی خود را ذکر کنید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید</label>
                                            <input onChange={this.setChange}
                                                   name="هزینه یا بازه زمانی خود را برای تبلیغات بیان کنید کمپین و تبلیغات"
                                                   type="text" className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>کمی درباره مشتریان خود بنویسید</label>
                                            <input onChange={this.setChange}
                                                   name="کمی درباره مشتریان خود بنویسید کمپین و تبلیغات" type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات </label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات کمپین و تبلیغات">
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
            else if (this.state.email === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی ایمیلی و پیامکی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>لطفا شرحی از کسب و کار خود را بیان کنید</label>
                                        <input onChange={this.setChange}
                                               name="لطفا شرحی از کسب و کار خود را بیان کنید بازاریابی ایمیلی و پیامکی"
                                               type="text"
                                               className="input  border mt-2 mr-2" style={{width: "90%"}}
                                        />

                                        <div className="mt-5">
                                            <label>کدام یک را مد نظر دارید؟ </label>
                                            <select onChange={this.seSelect}
                                                    className="input w-56 border mr-2"
                                                    name="کدام یک را مد نظر دارید؟ بازاریابی ایمیلی و پیامکی">
                                                <option value="بازاریابی ایمیلی"> بازاریابی ایمیلی</option>
                                                <option value="بازاریابی پیامکی"> بازاریابی پیامکی</option>
                                                <option value="هردو">هردو</option>
                                            </select>
                                        </div>
                                        <div className="mt-8">
                                            <label>آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="آیا مخاطبان خود را شناسایی و دسته بندی کرده اید؟ بازاریابی ایمیلی و پیامکی"
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>هدف شما از این نوع بازاریابی چیست؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="هدف شما از این نوع بازاریابی چیست؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>محتوای شما آماده است یا نیاز به تولید محتوا دارید؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2" style={{width: "90%"}}
                                                   name="محتوای شما آماده است یا نیاز به تولید محتوا دارید؟ بازاریابی ایمیلی و پیامکی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات بازاریابی ایمیلی و پیامکی"
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
                        {this.renderButton()}
                    </>
                )
            }
        }
        else if (this.state.button === false) {
            return (
                <div className="p-5" id="input">
                    <div className="preview" style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button
                            className={this.state.campaign ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200 text-center' : 'button w-75 mr-2 shadow-md mb-2 bg-theme-9 text-white text-center'}
                            onClick={this.onClickCampaign} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className=""> کمپین و تبلیغات</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>

                        </button>
                        <button
                            className={this.state.service ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickService} style={{width: '20%', height: '150px'}}>

                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">  سرویس سایت</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.social ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickSocial} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">سرویس شبکه های اجتماعی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.email ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickEmail} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className=""> بازاریابی ایمیلی و پیامکی</p>
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


    renderButton(){
        return(
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
                <Mobile/>
                <div className="flex">
                    <NavBar activeClass={this.state.activeClass}/>
                    <div className="content">
                        <Top/>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-12">
                                <div className="intro-y box">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent: "center",flexDirection:'column'}}>
                                        <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                             style={{justifyContent:"center",flexDirection:'column'}}>
                                            <h2>بازاریابی دیجیتال</h2>
                                            <p className="text-gray-700">(از میان گزینه ها محدودیتی در انتخاب به صورت همزمان وجود ندارد)</p>

                                        </div>
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

export default digital
