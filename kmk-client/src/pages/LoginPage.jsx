import '../style/login.scss';
import '../style/card.scss';
import '../style/button.scss';

import PasswordField from '../components/PasswordField';
import React, { useState } from 'react';
import TextField from '../components/TextField';
import Label from '../components/Label';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { logIn } from '../actions/authentication';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';

const mapStateToProps = state => {
    return {
        form: state.user.register.form,
        isLoggedIn: state.authentication.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logIn: (email, password) => dispatch(logIn(email, password))
    }
}

export const LoginPage = ({logIn}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(undefined);


    const navigate = useNavigate();

    const valid = () => {
        return email && email.length > 0 
            && password && password.length > 0;
    }

    const onClickLogIn = async () => {
        const response = await logIn(email, password);

        if(response.isSuccess) {
            navigate("/");
        } else {
            setError(response.message)
        }
    };

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>          
                <Card padding={true}>
                    <Label label="Email">
                        <TextField 
                            source={{email}} 
                            property="email" 
                            onEdit={(change) => setEmail(change.email)}
                        />
                    </Label>
                    <Label label="Lösenord">
                        <PasswordField 
                            source={{password}} 
                            property="password" 
                            onEdit={(change) => setPassword(change.password)}
                        />
                    </Label>
                    {error && <div style={{color: "red"}}>{error}</div>}  
                </Card>
                <div className='row'>
                    <Button label="Logga in" disabled={!valid()} onClick={onClickLogIn} shape="rounded">Logga in</Button>
                </div>
              </div>
        </div>
    );
}



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)