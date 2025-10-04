import React from 'react'
import Login from './pages/Login'
import CreateAccountForm from './pages/CreateAccountForm'
import SuccessScreen from './pages/SuccessScreen'
import WorkspaceBasics from './pages/WorkspaceBasics'
import WorkspaceList from './pages/WorkspaceList'
import ChannelSelection from './pages/ChannelSelection'
import WorkspaceFinish from './pages/WorkspaceFinish'
import ResetPassword from './pages/ResetPassword'
import CreateNewPassword from './pages/CreateNewPassword'
import SessionExpired from './pages/SessionExpired'

const App = () => {
  return (
    <div>
      <Login/>
      <CreateAccountForm/>
      <SuccessScreen
      onPrimary={() => console.log("Go to workspace")}
      onSecondary={() => console.log("Choose/create workspace")}
      
    />
    <WorkspaceBasics/>
    <WorkspaceList/>
    <ChannelSelection/>
    <WorkspaceFinish/>
    <ResetPassword/>
    <CreateNewPassword/>
    <SessionExpired/>
    </div>
  )
}

export default App
