import React from 'react';
import './App.css';
import Login from './component/login'
import Dashboard from './component/dashboard'
import completeProfile from './component/completeProfile'
import sendProject from './component/sendProject'
import Inbox from './component/inbox'
import InboxBookmark from './component/inboxBookmark'
import InboxTrash from './component/inboxTrash'
import Invoice from './component/invoice'
import Profile from './component/profile'
import changePassword from './component/changePassword'
import Just from './component/just'
import Seo from './component/seo'
import Digital from './component/digital'
import Article from './component/article'
import Category from './component/category'
import Web from './component/web'
import Dev from './component/dev'
import Shop from './component/shop'
import Design from './component/design'
import Guide from './component/guide'
import Payments from './component/payments'
import Meeting from './component/meeting'
import Modal from './component/modal'
import Projects from './component/project'
import SingleProject from './component/singleProject'
import SinglePayment from './component/singlePayment'
import Bill from './component/bill'
import MeetingDetail from './component/meetingDetail'
import SupportDetail from './component/supportDetail'
import Ticketing from './component/ticketing'
import showMeeting from './component/showMeetinng'
import Contract from './component/contract'
import Alo from './component/alo'
import Market from './component/market'
import ShowSupport from './component/showSupport'
import Auth from './component/auth'
import Payed from './component/payed'
import './css/app.css';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom';
import history from "./component/history";
const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
function App() {
  return (
      <BrowserRouter history={history}>
          <React.Suspense fallback={loading()}>
              <Switch>
                  <Router history={history} basename={"/karfarma"}>
                  <Route  path={`${process.env.PUBLIC_URL}/`} exact  name="login Page" component={Login}  />
                  <Route  path={`${process.env.PUBLIC_URL}/dashboard`}   name="login Page" component={Dashboard}  />
                  <Route  path={`${process.env.PUBLIC_URL}/completeProfile`}   name="login Page" component={completeProfile}  />
                      <Route  path={`${process.env.PUBLIC_URL}/just`}    name="login Page" component={Just}  />
                      <Route  path={`${process.env.PUBLIC_URL}/sendProject`}    name="login Page" component={sendProject}  />
                  <Route  path={`${process.env.PUBLIC_URL}/inbox`}    name="login Page" component={Inbox}  />
                  <Route  path={`${process.env.PUBLIC_URL}/invoice`}   name="login Page" component={Invoice}  />
                  <Route  path={`${process.env.PUBLIC_URL}/profile`}   name="login Page" component={Profile}  />
                  <Route  path= {`${process.env.PUBLIC_URL}/changePassword`}   name="login Page" component={changePassword}  />
                  <Route  path= {`${process.env.PUBLIC_URL}/Payment`}   name="login Page" component={Payments}  />
                      <Route  path= {`${process.env.PUBLIC_URL}/singlePayment`}   name="login Page" component={SinglePayment}  />
                      <Route  path={`${process.env.PUBLIC_URL}/inboxBookmark`}   name="login Page" component={InboxBookmark}  />
                      <Route  path={`${process.env.PUBLIC_URL}/inboxTrash`}    name="login Page" component={InboxTrash}  />
                      <Route  path={`${process.env.PUBLIC_URL}/meeting`}    name="login Page" component={Meeting}  />
                      <Route  path={`${process.env.PUBLIC_URL}/modal`}   name="login Page" component={Modal}  />
                      <Route  path={`${process.env.PUBLIC_URL}/projects`}    name="login Page" component={Projects}  />
                      <Route  path={`${process.env.PUBLIC_URL}/singleProject`}    name="login Page" component={SingleProject}  />
                      <Route  path={`${process.env.PUBLIC_URL}/ticket`}  name="login Page" component={Ticketing}  />
                      <Route  path={`${process.env.PUBLIC_URL}/category`}   name="login Page" component={Category}  />
                      <Route  path={`${process.env.PUBLIC_URL}/digital`}    name="login Page" component={Digital}  />
                      <Route  path={`${process.env.PUBLIC_URL}/seo`}   name="login Page" component={Seo}  />
                      <Route  path={`${process.env.PUBLIC_URL}/article`}   name="login Page" component={Article}  />
                      <Route  path={`${process.env.PUBLIC_URL}/web`}  name="login Page" component={Web}  />
                      <Route  path={`${process.env.PUBLIC_URL}/dev`}   name="login Page" component={Dev}  />
                      <Route  path={`${process.env.PUBLIC_URL}/shop`}  name="login Page" component={Shop}  />
                      <Route  path={`${process.env.PUBLIC_URL}/design`}    name="login Page" component={Design}  />
                      <Route  path={`${process.env.PUBLIC_URL}/guide`}   name="login Page" component={Guide}  />
                      <Route  path={`${process.env.PUBLIC_URL}/showMeeting`}   name="login Page" component={showMeeting}  />
                      <Route  path={`${process.env.PUBLIC_URL}/contract`}   name="login Page" component={Contract}  />
                      <Route  path={`${process.env.PUBLIC_URL}/market`}   name="login Page" component={Market}  />
                      <Route  path={`${process.env.PUBLIC_URL}/showSupport`}   name="login Page" component={ShowSupport}  />
                      <Route  path={`${process.env.PUBLIC_URL}/auth`}   name="login Page" component={Auth}  />
                      <Route  path={`${process.env.PUBLIC_URL}/payed`}   name="login Page" component={Payed}  />
                      <Route  path={`${process.env.PUBLIC_URL}/bills`}   name="login Page" component={Bill}  />
                      <Route  path={`${process.env.PUBLIC_URL}/alo`}   name="login Page" component={Alo}  />
                      <Route  path={`${process.env.PUBLIC_URL}/meetingDetail`}   name="login Page" component={MeetingDetail}  />
                      <Route  path={`${process.env.PUBLIC_URL}/supportDetail`}   name="login Page" component={SupportDetail}  />

                  </Router>
              </Switch>
          </React.Suspense>
      </BrowserRouter>
  );
}

export default App;
