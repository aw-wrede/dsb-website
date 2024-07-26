import './App.sass'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import axios from "axios";
import SiteUser from "./sites/user/SiteUser.tsx";
import HeaderComponent from "./components/header/HeaderComponent.tsx";
import {createContext, useEffect, useState} from "react";
import UserInfo from "./interfaces/user/UserInfo.ts";
import SiteLogin from "./sites/login/SiteLogin.tsx";
import SiteUserList from "./sites/user/SiteUserList.tsx";
import SiteCreateOverlayTemplate from "./sites/overlay/template/SiteCreateOverlayTemplate.tsx";
import SiteCreateOverlay from "./sites/overlay/SiteCreateOverlay.tsx";
import {fetchUserData} from "./axios/AxiosApi.ts";
import SiteTemplateList from "./sites/overlay/template/SiteTemplateList.tsx";
import LoginStatus from "./interfaces/LoginStatus.ts";
import LoadingComponent from "./components/LoadingComponent.tsx";
import SiteHome from "./sites/home/SiteHome.tsx";
import {getBrowserLocalization} from "./functions/localizationFunctions.ts";
import SiteCreateTeam from "./sites/team/SiteCreateTeam.tsx";
import SiteOverlayList from "./sites/overlay/SiteOverlayList.tsx";
import SiteEditOverlay from "./sites/overlay/SiteEditOverlay.tsx";
import SiteTeamList from "./sites/team/SiteTeamList.tsx";

import "./style/style.sass"
import SiteTeamEdit from "./sites/team/SiteTeamEdit.tsx";

export const UserContext = createContext<UserInfo>(null)

function AuthedRoutes({user, setUser}:{user:UserInfo, setUser: (user:UserInfo) => void}) {
    return <Routes>
        <Route path={"/"} element={<SiteHome />} />
        <Route path={"/user"} element={<SiteUser />} />
        <Route path={"/list"} element={<SiteUserList />} />

        <Route path={"/team/create"} element={<SiteCreateTeam />} />
        <Route path={"/team/list"} element={<SiteTeamList />} />
        <Route path={"/team/edit/:uuid"} element={<SiteTeamEdit />} />

        <Route path={"/overlay/edit/:uuid"} element={<SiteEditOverlay />} />
        <Route path={"/overlay/create"} element={<SiteCreateOverlay />} />
        <Route path={"/overlay/list"} element={<SiteOverlayList user={user} setUser={setUser} />} />
        <Route path={"/overlay/template/create"} element={<SiteCreateOverlayTemplate />} />
        <Route path={"/overlay/template/list"} element={<SiteTemplateList />} />
    </Routes>
}

function App() {
    const [user, setUser] = useState<UserInfo>({
        user:null,
        localization: getBrowserLocalization(),
        loginStatus: LoginStatus.Pending});

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()

        // add api token to url request if given in url
        // api token will then set as cookie by backend
        fetchUserData(cancelToken.token, new URLSearchParams(window.location.search).get("apiToken")).then(user => {
            setUser(user)
        }, () => {
            setUser(user)
        })

        return () => {
            cancelToken.cancel()
        }
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user]);

    return <UserContext.Provider value={user}>
        <div className={"main"}>
            <BrowserRouter>
                <HeaderComponent user={user} setUser={setUser}/>
                <Routes>
                    {/* ====== AUTHENTICATION ONLY ======== */}
                    <Route path={"/*"} element={
                        user.loginStatus === LoginStatus.Authorized ?
                            <AuthedRoutes user={user} setUser={setUser} /> :
                            user.loginStatus === LoginStatus.Pending ?
                                <LoadingComponent/> :
                                <Navigate to={"/login"} replace/>}
                    />

                    {/* ====== NO AUTHENTICATION ======== */}
                    <Route path={"/login"} element={user.loginStatus === LoginStatus.Authorized ?
                        <Navigate to={"/dadada"} replace/> :
                        <SiteLogin user={user} setUser={setUser}/>}
                    />
                </Routes>
            </BrowserRouter>
        </div>
    </UserContext.Provider>
}

export default App
