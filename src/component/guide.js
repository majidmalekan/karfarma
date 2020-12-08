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

class guide extends Component {
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
        home: true,
        internet: true,
        produce: true,
        cooperative: true,
        business: true,
        button: false,
        usename: '',
        x: [],
        xx: [],
        sus_id: '',

    };

    constructor(props) {
        super(props);
        this.loginUp = this.loginUp.bind(this);
        this.onClickInternet = this.onClickInternet.bind(this);
        this.onClickProduce = this.onClickProduce.bind(this);
        this.onClickBusiness = this.onClickBusiness.bind(this);
        this.onClickCooperative = this.onClickCooperative.bind(this);
        this.onClickHome = this.onClickHome.bind(this);
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

    onClickBusiness() {
        this.setState({
            business: !this.state.business,
        });
        if (this.state.business === true) {
            this.state.status.push({
                'sub_id': '19',
                'title': 'مشاوره کسب و کار بازرگانی'
            });
        }
        if (this.state.business === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '19') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickProduce() {
        this.setState({
            produce: !this.state.produce,
        });
        if (this.state.produce === true) {
            this.state.status.push({
                'sub_id': '20',
                'title': 'مشاوره کسب و کار تولیدی'
            });
        }
        if (this.state.produce === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '20') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickHome() {
        this.setState({
            home: !this.state.home,
        });
        if (this.state.home === true) {
            this.state.status.push({
                'sub_id': '21',
                'title': 'مشاوره کسب و کار خانگی'
            });
        }
        if (this.state.home === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '21') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickInternet() {
        this.setState({
            internet: !this.state.internet,
        });
        if (this.state.internet === true) {
            this.state.status.push({
                'sub_id': '22',
                'title': 'مشاوره کسب و کار اینترنتی'
            });
        }
        if (this.state.internet === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '22') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }

    onClickCooperative() {
        this.setState({
            cooperative: !this.state.cooperative,
        });
        if (this.state.cooperative === true) {
            this.state.status.push({
                'sub_id': '23',
                'title': 'مشاوره کسب و کار تعاونی'
            });
        }
        if (this.state.cooperative === false) {
            this.state.status.map((st, index) => {
                    if (st.sub_id === '23') {
                        this.state.status.pop()
                    }
                }
            )
        }
    }
    renderShow() {
        if (this.state.button === true) {
            if (this.state.home === false && this.state.business === false && this.state.internet === false && this.state.produce === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.home === false && this.state.business === false && this.state.internet && this.state.produce === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.home === false && this.state.business === false && this.state.internet && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.home === false && this.state.business === false && this.state.produce && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.home === false && this.state.internet === false && this.state.produce && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>


                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.business === false && this.state.internet === false && this.state.produce && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.home === false && this.state.business === false && this.state.internet === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
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
            else if (this.state.home === false && this.state.business === false && this.state.produce === false) {
                return (
                    <>
                        <>
                            <Tabs>
                                <TabList>
                                    <Tab>مشاوره کسب و کار خانگی</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                            <label>نام کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                            <div className="mt-5">
                                                <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                                <input onChange={this.setChange}
                                                       name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                       type="text" className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                />
                                            </div>
                                            <div className="mt-5">
                                                <label>تعداد پرسنل خود را وارد کنید</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                            </div>
                                            <div className="mt-5">
                                                <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                            </div>
                                            <div className="mt-5">
                                                <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>توضیحات</label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>

                            <Tabs>
                                <TabList>
                                    <Tab>مشاوره کسب و کار بازرگانی</Tab>
                                </TabList>
                                <TabPanel>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                            <label>نام کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                            <div className="mt-5">
                                                <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                                <input onChange={this.setChange}
                                                       name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                       type="text" className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                />
                                            </div>
                                            <div className="mt-5">
                                                <label>تعداد پرسنل خود را وارد کنید</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                            </div>
                                            <div className="mt-5">
                                                <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                            </div>
                                            <div className="mt-5">
                                                <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>توضیحات</label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>
                            </Tabs>

                            <Tabs>
                                <TabList>
                                    <Tab>مشاوره کسب و کار تولیدی</Tab>

                                </TabList>
                                <TabPanel>
                                    <div className="p-5" id="input">
                                        <div className="preview">
                                            <label>نام کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                            <div className="mt-5">
                                                <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                                <input onChange={this.setChange}
                                                       name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                       type="text" className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                />
                                            </div>
                                            <div className="mt-5">
                                                <label>تعداد پرسنل خود را وارد کنید</label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                            </div>
                                            <div className="mt-5">
                                                <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                                <input onChange={this.setChange} type="text"
                                                       className="input  border mt-2 mr-2"
                                                       style={{width: "90%"}}
                                                       name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                            </div>
                                            <div className="mt-5">
                                                <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                            </div>
                                            <div className="mt-5">
                                                <label>توضیحات</label>
                                                <textarea onChange={this.setChange} rows="8"
                                                          className="input border mt-2"
                                                          style={{height: "180px", width: '100%'}}
                                                          name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                            </div>
                                        </div>
                                    </div>
                                </TabPanel>

                            </Tabs>

                            {this.renderButton()}
                        </>
                        {this.renderButton()}
                    </>
                )
            }
            else if (this.state.home === false && this.state.business === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.home === false && this.state.internet === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.home === false && this.state.produce === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.internet === false && this.state.produce === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.business === false && this.state.internet === false && this.state.produce === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.business === false && this.state.internet === false && this.state.cooperative === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.business === false && this.state.produce === false && this.state.cooperative === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.home === false && this.state.business === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
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
            else if (this.state.home === false && this.state.internet === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
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
            else if (this.state.home === false && this.state.produce === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.home === false && this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.business === false && this.state.internet === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
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
            else if (this.state.business === false && this.state.produce === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>


                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.business === false && this.state.cooperative === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.internet === false && this.state.produce === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.internet === false && this.state.cooperative === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.produce === false && this.state.cooperative === false) {
                return (
                    <>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                    </div>
                                </div>
                            </TabPanel>

                        </Tabs>

                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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


            else if (this.state.business === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار بازرگانی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار بازرگانی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار بازرگانی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار بازرگانی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار بازرگانی">
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
            else if (this.state.home === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار خانگی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار خانگی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار خانگی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار خانگی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار خانگی">
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
            else if (this.state.cooperative === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تعاونی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تعاونی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تعاونی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تعاونی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تعاونی">
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
            else if (this.state.produce === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار تولیدی</Tab>

                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار تولیدی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار تولیدی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار تولیدی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار تولیدی">
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
            else if (this.state.internet === false) {
                return (
                    <>
                        <Tabs>
                            <TabList>
                                <Tab>مشاوره کسب و کار اینترنتی</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="p-5" id="input">
                                    <div className="preview">
                                        <label>نام کسب و کار خود را وارد کنید</label>
                                        <input onChange={this.setChange}
                                               name="نام کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                               type="text" className="input  border mt-2 mr-2"
                                               style={{width: "90%"}}
                                        />
                                        <div className="mt-5">
                                            <label>مدت زمان فعالیت کسب و کار خود را وارد کنید</label>
                                            <input onChange={this.setChange}
                                                   name="مدت زمان فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"
                                                   type="text" className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            <label>تعداد پرسنل خود را وارد کنید</label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="تعداد پرسنل خود را وارد کنید مشاوره کسب و کار اینترنتی"/>
                                        </div>
                                        <div className="mt-5">
                                            <label>زمینه فعالیت کسب و کار خود را وارد کنید </label>
                                            <input onChange={this.setChange} type="text"
                                                   className="input  border mt-2 mr-2"
                                                   style={{width: "90%"}}
                                                   name="زمینه فعالیت کسب و کار خود را وارد کنید مشاوره کسب و کار اینترنتی"/>

                                        </div>
                                        <div className="mt-5">
                                            <label>مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مهم‌ترین منابع و قابلیت‌های کسب و کار شما که آن را از دیگران متمایز می‌کند چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>نقاط قوت و ضعف کسب و کار شما چیست؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="نقاط قوت و ضعف کسب و کار شما چیست؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>مشکلات و چالش‌های روبروی شما چه هستند؟ </label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="مشکلات و چالش‌های روبروی شما چه هستند؟ مشاوره کسب و کار اینترنتی">
                                                    </textarea>

                                        </div>
                                        <div className="mt-5">
                                            <label>توضیحات</label>
                                            <textarea onChange={this.setChange} rows="8"
                                                      className="input border mt-2"
                                                      style={{height: "180px", width: '100%'}}
                                                      name="توضیحات مشاوره کسب و کار اینترنتی">
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

                    <div className="preview mt-5" style={{display: 'flex', justifyContent: 'space-around'}}>
                        <button
                            className={this.state.home ? 'button shadow-md mr-2 mb-2 bg-gray-200 border-none border-4' : 'button  mr-2 shadow-md mb-2 bg-theme-9 text-white border-none border-4'}
                            onClick={this.onClickHome} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p>مشاوره کسب و کار خانگی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.internet ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickInternet} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className=""> مشاوره کسب و کار اینترنتی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>

                        </button>
                        <button
                            className={this.state.produce ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickProduce} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">مشاوره کسب و کار تولیدی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>

                        </button>
                        <button
                            className={this.state.cooperative ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickCooperative} style={{width: '20%', height: '150px'}}>
                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">مشاوره کسب و کار تعاونی</p>
                                <FeatherIcon className="mr-auto" size={40} icon="package"/>
                            </div>
                        </button>
                        <button
                            className={this.state.business ? 'button w-75 shadow-md mr-2 mb-2 bg-gray-200' : 'button w-75 shadow-md mr-2 mb-2 bg-theme-9 text-white'}
                            onClick={this.onClickBusiness} style={{width: '20%', height: '150px'}}>

                            <div style={{display: 'flex', flexDirection: 'row', textAlign: 'right'}}>
                                <p className="">مشاوره کسب و کار بازرگانی</p>
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
    handleShowConfirm = () => {
        this.setState({showConfirm: true});
    };
    handleCloseConfirm = () => {
        this.setState({showConfirm: false});
    };

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



    forms() {
        this.setState({button: true});
        let {xx, sus_id, finishSpecial, finishPublic} = this.state;
        let apiToken = localStorage.getItem('apiToken');
        let user_id = localStorage.getItem('user_id');
        this.setState(prev => {
            return {
                xx: [...prev.xx, this.state.x[0]]
            }
        });
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
                                        <h2>مشاوره کسب و کار</h2>
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

export default guide
