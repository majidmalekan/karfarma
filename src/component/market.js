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
import 'react-tabs/style/react-tabs.css';
import DatePicker from "react-modern-calendar-datepicker";

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

class market extends Component {
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
        tel: true,
        counter: true,
        sell: true,
        strategy: true,
        system: true,
        button: false,
        usename: '',
        x: [],
        xx: [],
        sus_id: '',

    };

    constructor(props) {
        super(props);
        this.loginUp = this.loginUp.bind(this);
        this.onClickSystem = this.onClickSystem.bind(this);
        this.onClickCounter = this.onClickCounter.bind(this);
        this.onClickStrategy = this.onClickStrategy.bind(this);
        this.onClickTel = this.onClickTel.bind(this);
        this.onClickSell = this.onClickSell.bind(this);
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

    onClickSystem() {
        this.setState({
            system: !this.state.system,
        });
        if (this.state.system === true) {
            this.state.status.push({
                'sub_id': '12',
                'title': 'طراحی سیستم'
            });
            console.log(this.state.status)
        }
        if (this.state.system === false) {
            this.state.status.indexOf('12');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '12') {
                        this.state.status.pop()
                    }
                }
            )
        }
        console.log(this.state.system)

    }

    onClickCounter() {
        this.setState({
            counter: !this.state.counter,
        });
        if (this.state.counter === true) {
            this.state.status.push({
                'sub_id': '15',
                'title': 'آموزش کانتر فروش'
            });
            console.log(this.state.status)
        }
        if (this.state.counter === false) {
            this.state.status.indexOf('15');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '15') {
                        this.state.status.pop()
                    }
                }
            )
        }
        console.log(this.state.counter)

    }

    onClickStrategy() {
        this.setState({
            strategy: !this.state.strategy,
        });
        if (this.state.strategy === true) {
            this.state.status.push({
                'sub_id': '13',
                'title': 'تعیین استراتژی'
            });
        }
        if (this.state.strategy === false) {
            this.state.status.indexOf('13');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '13') {
                        this.state.status.pop()
                    }
                }
            )
        }
        console.log(this.state.strategy)

    }

    onClickTel() {
        this.setState({
            tel: !this.state.tel,
        });
        if (this.state.tel === true) {
            this.state.status.push({
                'sub_id': '16',
                'title': 'بازاریابی تلفن'
            });
        }
        if (this.state.tel === false) {
            this.state.status.indexOf('16');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '16') {
                        this.state.status.pop()
                    }
                }
            )
        }
        console.log(this.state.tel)

    }

    onClickSell() {
        this.setState({
            sell: !this.state.sell,
        });
        if (this.state.sell === true) {
            this.state.status.push({
                'sub_id': '14',
                'title': 'فروش محصول یا خدمات'
            });
        }
        if (this.state.sell === false) {
            this.state.status.indexOf('14');
            this.state.status.map((st, index) => {
                    if (st.sub_id === '14') {
                        this.state.status.pop()
                    }
                }
            )
        }
        console.log(this.state.sell)
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

    loginUp() {
        this.setState({
            button: true,
            loading: true,
        });
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
                        loading: false
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
        this.setState({loading: true});
        this.setState(prev => {
            return {
                xx: [...prev.xx, this.state.x[0]]
            }
        });
        setTimeout(() => {
                this.sendData()
            }
            , 1000)
    }

    sendData(){
        let {xx, sus_id} = this.state;
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
                    history.push({
                        pathname: './contract',
                        state: {sus_id: result.data.sus_id}
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
    renderShow() {
        if (this.state.button === true) {
            if (this.state.system === false && this.state.strategy === false && this.state.sell===false && this.state.counter === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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

            else if (this.state.system === false && this.state.strategy === false && this.state.sell===false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.system === false && this.state.strategy === false && this.state.sell===false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.system === false && this.state.strategy === false && this.state.counter===false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.system === false && this.state.sell === false && this.state.counter===false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.strategy === false && this.state.sell === false && this.state.counter===false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.system === false && this.state.strategy === false && this.state.sell === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
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
            else if (this.state.system === false && this.state.strategy === false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.system === false && this.state.strategy === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.system === false && this.state.sell === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.system === false && this.state.counter === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.sell === false && this.state.counter === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.strategy === false && this.state.sell === false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.strategy === false && this.state.sell === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.strategy === false && this.state.counter === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.system === false && this.state.strategy === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
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
            else if (this.state.system === false && this.state.sell === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
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
            else if (this.state.system === false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.system === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.strategy === false && this.state.sell === false) {
                return (

                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
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
            else if (this.state.strategy === false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.strategy === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.sell === false && this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.sell === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
                                                    </textarea>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.counter === false && this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
                                                    </textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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


            else if (this.state.strategy === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>تعیین استراتژی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>بازار هدف؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازار هدف؟ تعیین استراتژی"/>

                                        <div className="mt-5">
                                            <label>شعار سازمانی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="شعار سازمانی؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ تعیین استراتژی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات  تعیین استراتژی ">
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
            else if (this.state.system === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>طراحی سیستم</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد مشتریان فعال؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input  w-50 border mt-2 mr-2"
                                               name="تعداد مشتریان فعال؟ طراحی سیستم"/>

                                        <div className="mt-5">
                                            <label>تعداد مشتریان غیرفعال؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="تعداد مشتریان غیرفعال؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   name="مدت زمان فعالیت؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیروهای درحال کاربازایابی؟</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50  border mt-2 mr-2"
                                                   placeholder="تعداد نیروهای درحال کاربازایابی؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد نیرو های در حال کار CRM ؟</label>
                                            <input onChange={this.setChange} value={this.state.name} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   placeholder="تعداد نیرو های در حال کار CRM ؟ طراحی سیستم"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات طراحی سیستم">
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
            else if (this.state.tel === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>بازاریابی تلفنی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <div>
                                            <label>هدف فروش ماهیانه</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input w-50 border mt-2 mr-2"
                                                   name="هدف فروش ماهیانه بازاریابی تلفنی"/>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>بازارهدف فروش</label>
                                                <input onChange={this.setChange} value={this.state.name} type="text"
                                                       className="input w-50 border mt-2 mr-2"
                                                       name="بازارهدف فروش بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <div>
                                                <label>حجم فروش ماهیانه حال حاضر</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input w-50  border mt-2 mr-2"
                                                       name="حجم فروش ماهیانه حال حاضر بازاریابی تلفنی"/>
                                            </div>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات بازاریابی تلفنی">
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
            else if (this.state.counter === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>آموزش کانتر فروش</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>تعداد نیروهای مورد نیاز؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش"/>

                                        <div className="mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                                            <label>تعداد نیروهای مورد نیاز؟</label>
                                            <select onChange={this.seSelect}
                                                    className="input w-50 border"
                                                    name="تعداد نیروهای مورد نیاز؟ آموزش کانتر فروش">
                                                <option value="حرفه ای">حرفه ای</option>
                                                <option value=" پیشرفته"> پیشرفته</option>
                                                <option value=" مبتدی"> مبتدی</option>
                                            </select>
                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات آموزش کانتر فروش">
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
            else if (this.state.sell === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>فروش محصول یا خدمات</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="mt-5">
                                        <label>حجم فروش کلی سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="حجم فروش کلی سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>هدف گذاری فروش سالیانه؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="هدف گذاری فروش سالیانه؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>بازارهدف فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50 border mt-2 mr-2"
                                               name="بازارهدف فروش؟ فروش محصول یا خدمات "/>
                                    </div>
                                    <div className="mt-5">
                                        <label>استراتژی فروش؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="استراتژی فروش؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>تعداد نیروهای درحال کار؟</label>
                                        <input onChange={this.setChange} type="text"
                                               className="input w-50  border mt-2 mr-2"
                                               name="تعداد نیروهای درحال کار؟ فروش محصول یا خدمات"/>
                                    </div>
                                    <div className="mt-5">
                                        <label>توضیحات</label>
                                        <div className="mt-2">
                                                    <textarea onChange={this.setChange} rows="8"
                                                              className="input border mt-2"
                                                              style={{height: "180px", width: '100%'}}
                                                              name="توضیحات فروش محصول یا خدمات">
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
                    <div className="flex flex-col sm:flex-col items-center p-5"
                         style={{justifyContent: "center"}}>
                        <label>نوع خدمات درخواستی</label>
                    </div>
                    <div className="preview mt-5" style={{display: 'flex', justifyContent: 'center'}}>
                        <button
                            className={this.state.system ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickSystem} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className=""> طراحی سیستم</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.strategy ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickStrategy} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">
                                    تعیین استراتژی
                                </p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.sell ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickSell} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">
                                    فروش محصول یا خدمات
                                </p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.tel ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickTel} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">
                                    بازاریابی تلفنی
                                </p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.counter ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickCounter} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">
                                    آموزش کانتر فروش
                                </p>
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
                        <div className="intro-y flex items-center mt-8" style={{justifyContent: "center"}}>
                            <h2 className="text-lg font-medium">
                                بازاریابی
                            </h2>
                        </div>
                        <div className="grid grid-cols-12 gap-6 mt-5">
                            <div className="intro-y col-span-12 lg:col-span-12">
                                <div className="intro-y box">
                                    <div className="flex flex-col sm:flex-row items-center p-5 border-b border-gray-200"
                                         style={{justifyContent: "center"}}>
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

export default market
