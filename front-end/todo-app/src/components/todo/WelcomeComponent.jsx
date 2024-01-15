import {Link, useParams} from 'react-router-dom'
import { useState } from 'react';
import { retrieveHelloWorldPathVariable } from './api/HelloWorldApiService';
import { useAuth } from './security/AuthContext';

export default function WelcomeComponent() {

    const [message, setMessage] = useState(null)

    const { username } = useParams();

    const authContext = useAuth()

    function callHelloWorldRestApi() {

        retrieveHelloWorldPathVariable('in28minutes', authContext.token)
        .then(response => successfulResponse(response))
        .catch(error => errorResponse(error))
        .finally(() => console.log('cleanup'))
    }

    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error) {
        console.log(error)
    }

    return(
        <div className="WelcomeComponent">
            <h1>Welcome {username}!</h1>
            <div>
                To Manage Your Todo's <Link to="/todos">Go Here!</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className="text-info">{message}</div>
        </div>
    )
}