import '../../style/login.scss';
import '../../style/card.scss';
import '../../style/button.scss';

import React from 'react';
import RegisterUserForm from '../../components/RegisterUserForm';
import { editUserForm, registerUser, validateUserForm } from '../../actions/user';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { useNavigate } from 'react-router-dom';

export const RegisterUserPage = ({editUserForm, form, registerUser}) => {

    const navigate = useNavigate();

    const onClickRegisterUser = async () => {
        const response = await registerUser();

        if(response.isSuccess) {
            navigate("/login");
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>         
            <Card padding={true}>
                <RegisterUserForm 
                    form={form} 
                    onClickRegister={registerUser} 
                    onEdit={editUserForm}
                />
            </Card>
            <Button 
                onClick={onClickRegisterUser} 
                disabled={!validateUserForm(form)} 
                shape={"rounded"}
            >
                Bli medlem
            </Button>
        </div>
    </div>);
}

const mapStateToProps = state => {
    return {
        form: state.user.register.form
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user) => dispatch(registerUser(user)),
        editUserForm: (change) => dispatch(editUserForm(change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage)