import '../style/card.scss';
import '../style/button.scss';
import '../style/app.scss';

import React, { useState } from 'react';
import { Card } from '../components/Card';
import PasswordField from '../components/PasswordField';
import TextField from '../components/TextField';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const LoginForm = ({logIn}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(undefined);

    const navigate = useNavigate();

    
    const valid = () => {
        return email && email.length > 0 
            && password && password.length > 0;
    }
    
    const onClickLogIn = async () => {
        setIsLoading(true);
        const response = await logIn(email, password);
        setIsLoading(false);

        if(response.isSuccess) {
            navigate("/");
        } else {
            setError(response.message)
        }
    };

    const onClickBecomeMember = async () => {
        navigate("/register");
    }

    return (
        <Card>
            <div>
                <div style={{margin: 10}}>
                    <TextField 
                        source={{email}} 
                        property="email" 
                        onEdit={(change) => setEmail(change.email)}
                        className="login"
                    />
                </div>
                <div style={{margin: 10}}>
                    <PasswordField
                        className="login" 
                        source={{password}} 
                        property="password" 
                        onEdit={(change) => setPassword(change.password)}
                    />
                </div>
                {error && <div style={{color: "red"}}>{error}</div>}
                <div style={{margin: 10}}>
                    <Button 
                        disabled={!valid() || isLoading} 
                        onClick={onClickLogIn} 
                        shape="rounded"
                    >
                        Logga in
                    </Button>
                </div>  
                <div style={{margin: 10, marginTop: 30, paddingTop: 20, borderTop: "1px solid black"}}>
                    <Button
                        disabled={isLoading}
                        onClick={onClickBecomeMember} 
                        shape="rounded"
                    >
                        Bli medlem
                    </Button>
                </div>  
            </div>
    </Card>);
}

export const FrontPage = ({logIn}) => {
    return (
        <div style={{paddingTop: 200}}>
            <div style={{display: "flex", textAlign: "center", justifyContent: "center"}}>
                <div style={{display: "block", paddingRight: 50}}>
                    {/* <video controls={false} muted loop width="400" autoplay="autoplay" style={{
                        position: "fixed",
                        right: 0,
                        bottom: 0,
                        minWidth: "100%", 
                        minHeight: "100%",
                        zIndex: -1

                    }}>
                        <source src="Comp 1.mp4" type="video/mp4"/>
                        Your browser does not support HTML video.
                    </video> */}
                    <div style={{width: 580, fontSize: "xxx-large", fontWeight: "bold", marginBottom: 50}}>Kungälvs musikkår</div>
                    <div><LoginForm logIn={logIn}></LoginForm></div>
                </div>
            </div>


        </div>

     );
};