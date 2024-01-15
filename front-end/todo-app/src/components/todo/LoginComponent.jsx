import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useAuth } from './security/AuthContext'

export default function LoginComponent() {

    const [username, setUsername] = useState('in28minutes')
    const [password, setPassword] = useState('')

    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate();

    const authContext = useAuth()

    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`)
        }
        else {
            setShowErrorMessage(true)
            navigate('/login')
        }
    }

    return(
        <div className="Login">
            <h1>Time to Login!</h1>
            {showErrorMessage && <div className="errorMessage">Authentication failed! Please check your credentials</div>}
            
            <div className="LoginForm">
                <div>
                    <label>User name</label>
                    <input type="text" name="username" value={username} onChange={event => {
                        setUsername(event.target.value)
                    }}/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="password" value={password} onChange={event => {
                        setPassword(event.target.value)
                    }}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}