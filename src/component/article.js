import React, {Component} from 'react'
import './../css/app.css';
import Mobile from './Mobile'
import NavBar from './navbar'
import Top from './Top'
import Modal from 'react-modal';
import {ClassicSpinner} from "react-spinners-kit";
import FeatherIcon from 'feather-icons-react';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import 'react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from 'react-modern-calendar-datepicker';
import history from './history'
import {DateInput} from 'react-hichestan-datetimepicker';

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

class article extends Component {
    state = {
        status: [],
        show: false,
        loading: false,
        error: '',
        showConfirm: false,
        activeClass: '7',
        button: false,
        public: true,
        special: true,
        finishPublic: '',
        finishSpecial: '',
        finishPublic_formatted: '',
        finishSpecial_formatted: '',
        usename: '',
        x: [],
        xx: [],
        sus_id: '',
    };

    constructor(props) {
        super(props);
        this.loginUp = this.loginUp.bind(this);
        this.onClickPublic = this.onClickPublic.bind(this);
        this.onClickSpecial = this.onClickSpecial.bind(this);
        this.setChange = this.setChange.bind(this);
        this.seSelect = this.seSelect.bind(this);
        this.forms = this.forms.bind(this);

    }

    handleClose = () => {
        this.setState({show: false});
    };
    handleShow = () => {
        this.setState({show: true});
    };

    onClickPublic() {
        this.setState({
            public: !this.state.public,
        });
        if (this.state.public === true) {
            this.state.status.push({
                'sub_id': '6',
                'title': 'عمومی'
            });
            console.log(this.state.status)
        }
        if (this.state.public === false) {
            this.state.status.indexOf('6');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '6') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickSpecial() {
        this.setState({
            special: !this.state.special,
        });
        if (this.state.special === true) {
            this.state.status.push({
                'sub_id': '7',
                'title': 'خصوصی'
            });
            console.log(this.state.status);
        }
        if (this.state.special === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '7') {
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

    forms() {
        this.setState({
            loading: true
        });
        let {finishSpecial_formatted, finishPublic_formatted} = this.state;
        if (finishPublic_formatted !== '' && finishSpecial_formatted !== '') {
            const nameSpecial = "زمان تحویل خصوصی";
            const namePublic = "زمان تحویل عمومی";
            this.setState((prev) => {
                return {
                    xx: [...prev.xx, this.state.x[0]]
                }
            });
            this.setState((prev) => {
                return {
                    xx: [...prev.xx, {[nameSpecial]: finishSpecial_formatted}]
                }
            });
            console.log({[nameSpecial]: finishSpecial_formatted});
            this.setState((prev) => {
                return {
                    xx: [...prev.xx, {[namePublic]: finishPublic_formatted}]
                }
            });
            setTimeout(() => {
                    this.sendData()
                }
                , 1000)
        }
        else if (finishPublic_formatted !== '') {
            const namePublic = "زمان تحویل";
            this.setState(prev => {
                return {
                    xx: [...prev.xx, this.state.x[0]]
                }
            });
            this.setState(prev => {
                return {
                    xx: [...prev.xx, {[namePublic]: finishPublic_formatted}]
                }
            });
            setTimeout(() => {
                    this.sendData()
                }
                , 1000)
        }
        else if (finishSpecial_formatted !== '') {
            const nameSpecial = "زمان تحویل";
            this.setState(prev => {
                return {
                    xx: [...prev.xx, this.state.x[0]]
                }
            });
            this.setState(prev => {
                return {
                    xx: [...prev.xx, {[nameSpecial]: finishSpecial_formatted}]
                }
            });
            setTimeout(() => {
                    this.sendData()
                }
                , 1000)
        }
    }

    sendData() {
        let {xx, sus_id} = this.state;
        console.log(xx)
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        fetch('https://test.skenap.ir/api/v1/auRelation', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                api_token: apiToken,
                user_id: user_id,
                xx: xx,
                sus_id: sus_id
            }),
        }).then((response) => response.json())
            .then((result) => {
                console.log(result);
                if (result.stats === 'success') {
                    this.setState({loading: false});
                    history.push({
                        pathname: './contract',
                        state: {sus_id: result.data},
                    })
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

    setChange(event) {
        const {name, value} = event.target;
        if (this.state.usename === name) {
            this.setState({
                x: [{[name]: value}]
            });
        }
        else if (this.state.usename !== null) {
            this.setState(prev => {
                return {
                    xx: [...prev.xx, this.state.x[0]]
                }
            });
        }
        this.setState({usename: name});
    }

    seSelect(event) {
        const {name, value} = event.target;
        console.log(event.target);
        this.setState(prev => {
            return {
                xx: [...prev.xx, {[name]: value}]
            }
        });
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
            if (this.state.public === false && this.state.special === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>عمومی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label >عنوان مقاله مورد نیاز</label>
                                        <input onChange={this.setChange}
                                               type="text"
                                               className="input text-gray-700 border mt-2 mr-2 text-gray-700"
                                               style={{width: "90%"}}
                                               name="عنوان مقاله مورد نیاز عمومی"/>
                                    </div>
                                    <div className="mt-5" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly'
                                    }}>
                                        <div>
                                            <label>زبان مورد نظر</label>
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-75 border mr-2 text-gray-700"
                                                    name="زبان مورد نظر عمومی">
                                                <option style={{color: '#B6C1CF'}} value="">زبان مورد نظر خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="فارسی">فارسی</option>
                                                <option value="انگلیسی">انگلیسی</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>نوع مقاله</label>
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-56 border mr-2"
                                                    name="نوع مقاله عمومی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">نوع مقاله خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="کلاسی-دانشگاهی">کلاسی-دانشگاهی</option>
                                                <option value="ISI">ISI</option>
                                                <option value="پژوهش آزاد">پژوهش آزاد</option>
                                                <option value="پایان نامه">پایان نامه</option>
                                                <option value="برای انتشار در وبلاگ و وبسایت">برای انتشار در وبلاگ و
                                                    وبسایت
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد صفحات (یا تعداد کلمات)</label>
                                        <input onChange={this.setChange}
                                               type="text"
                                               className="input text-gray-700  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                               name="تعداد صفحات (یا تعداد کلمات) عمومی"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="ml-4">زمان تحویل</label>
                                        <div className="mt-3" style={{width: '50%'}}>
                                            <DateInput
                                                value={this.state.finishPublic}
                                                name={'finishPublic'}
                                                className="input text-gray-700  border"
                                                placeholder="تاریخ تحویل مورد نظر را وارد کنید"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات اختیاری</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات اختیاری عمومی"
                                                              rows="8"
                                                              className="input text-gray-700 border mt-2"
                                                              style={{height: "180px", width: '100%'}}>
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تخصصی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>عنوان مقاله مورد نیاز</label>
                                        <input onChange={this.setChange}
                                               type="text" className="input text-gray-700
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
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-75 border mr-2"
                                                    name="زبان مورد نظر تخصصی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">زبان مورد نظر خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="فارسی">فارسی</option>
                                                <option value="انگلیسی">انگلیسی</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>نوع مقاله</label>
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-56 border mr-2"
                                                    name="نوع مقاله تخصصی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">نوع مقاله خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="کلاسی-دانشگاهی">کلاسی-دانشگاهی</option>
                                                <option value="ISI">ISI</option>
                                                <option value="پژوهش آزاد">پژوهش آزاد</option>
                                                <option value="پایان نامه">پایان نامه</option>
                                                <option value="برای انتشار در وبلاگ و وبسایت">برای انتشار در وبلاگ و
                                                    وبسایت
                                                </option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد صفحات (یا تعداد کلمات)</label>
                                        <input onChange={this.setChange}
                                               type="text" className="input text-gray-700  border mt-2 mr-2"
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
                                                className="input text-gray-700  border"
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
                                                              className="input text-gray-700 border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات اختیاری تخصصی">
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
            else if (this.state.public === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>عمومی</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>عنوان مقاله مورد نیاز</label>
                                        <input onChange={this.setChange}
                                               type="text"
                                               className="input text-gray-700 border mt-2 mr-2"
                                               style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
                                               name="عنوان مقاله مورد نیاز عمومی"/>
                                    </div>
                                    <div className="mt-5" style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-evenly'
                                    }}>
                                        <div>
                                            <label>زبان مورد نظر</label>
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-75 border mr-2"
                                                    name="زبان مورد نظر عمومی">
                                                <option style={{color: '#B6C1CF'}} value="">زبان مورد نظر خود را انتخاب
                                                    کنید
                                                </option>
                                                <option name="زبان مورد نظر عمومی" value="فارسی">فارسی</option>
                                                <option name="زبان مورد نظر عمومی" value="انگلیسی">انگلیسی</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>نوع مقاله</label>
                                            <select onChange={this.seSelect}
                                                    className="input text-gray-700 w-56 border mr-2"
                                                    name="نوع مقاله عمومی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">نوع مقاله خود را انتخاب
                                                    کنید
                                                </option>
                                                <option name="نوع مقاله عمومی" value="کلاسی-دانشگاهی">کلاسی-دانشگاهی
                                                </option>
                                                <option name="نوع مقاله عمومی" value="ISI">ISI</option>
                                                <option name="نوع مقاله عمومی" value="پژوهش آزاد">پژوهش آزاد</option>
                                                <option name="نوع مقاله عمومی" value="پایان نامه">پایان نامه</option>
                                                <option name="نوع مقاله عمومی"
                                                        value="برای انتشار در وبلاگ و وبسایت">برای انتشار در وبلاگ و
                                                    وبسایت
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد صفحات (یا تعداد کلمات)</label>
                                        <input onChange={this.setChange}
                                               type="text"
                                               className="input text-gray-700  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                               placeholder="لطفا عنوان مقاله مورد نیاز خود را وارد کنید"
                                               name="تعداد صفحات (یا تعداد کلمات) عمومی"
                                        />
                                    </div>
                                    <div className="mt-5">
                                        <label className="ml-4">زمان تحویل</label>
                                        <div className="mt-3" style={{width: '50%'}}>
                                            <DateInput
                                                value={this.state.finishPublic}
                                                name={'finishPublic'}
                                                className="input text-gray-700  border"
                                                placeholder="تاریخ آغازین مورد نظر را وارد کنید"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات اختیاری</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              name="توضیحات اختیاری عمومی"
                                                              rows="8"
                                                              className="input text-gray-700 border mt-2"
                                                              style={{height: "180px", width: '100%'}}>
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
            else if (this.state.special === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تخصصی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>عنوان مقاله مورد نیاز</label>
                                        <input onChange={this.setChange}
                                               type="text" className="input text-gray-700
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
                                            <select onChange={this.setChange}
                                                    className="input text-gray-700 w-75 border mr-2"
                                                    name="زبان مورد نظر تخصصی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">زبان مورد نظر خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="فارسی">فارسی</option>
                                                <option value="انگلیسی">انگلیسی</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label>نوع مقاله</label>
                                            <select onChange={this.setChange}
                                                    className="input text-gray-700 w-56 border mr-2"
                                                    name="نوع مقاله تخصصی"
                                            >
                                                <option style={{color: '#B6C1CF'}} value="">نوع مقاله خود را انتخاب
                                                    کنید
                                                </option>
                                                <option value="کلاسی-دانشگاهی">کلاسی-دانشگاهی</option>
                                                <option value="ISI">ISI</option>
                                                <option value="پژوهش آزاد">پژوهش آزاد</option>
                                                <option value="پایان نامه">پایان نامه</option>
                                                <option value="برای انتشار در وبلاگ و وبسایت">برای انتشار در وبلاگ و
                                                    وبسایت
                                                </option>

                                            </select>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد صفحات (یا تعداد کلمات)</label>
                                        <input onChange={this.setChange}
                                               type="text" className="input text-gray-700  border mt-2 mr-2"
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
                                                className="input text-gray-700  border"
                                                placeholder="تاریخ آغازین مورد نظر را وارد کنید"
                                                onChange={this.handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات اختیاری</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange}
                                                              value={this.state.descriptionSpecial} rows="8"
                                                              className="input text-gray-700 border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات اختیاری تخصصی">
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

        }
        else if (this.state.button === false) {
            return (
                <div className="p-5" id="input">
                    <div className="preview " style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button
                            className={this.state.public ? 'button shadow-md mr-2 mb-2 bg-gray-200 text-center border-none border-4' : 'button mr-2 shadow-md mb-2 bg-theme-9 text-white text-center border-none border-4'}
                            onClick={this.onClickPublic} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p>عمومی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.special ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickSpecial} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p>تخصصی</p>
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
                        <Top disable="yes"/>
                        <div className="intro-y flex items-center mt-8" style={{justifyContent: "center"}}>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-12">
                                <div className="intro-y box">
                                    <div className="flex flex-col sm:flex-col items-center p-5 border-b border-gray-200"
                                         style={{justifyContent: "center", flexDirection: 'column'}}>
                                        <h2 className="lg:text-lg font-medium">
                                            مقاله نویسی
                                        </h2>
                                        <p className="text-gray-700 md:font-medium">(از میان گزینه ها محدودیتی در انتخاب به صورت همزمان
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

export default article
