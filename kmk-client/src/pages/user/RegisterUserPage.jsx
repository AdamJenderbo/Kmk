import '../../style/login.scss';
import '../../style/card.scss';
import '../../style/button.scss';
import 'react-image-crop/src/ReactCrop.scss'

import React, { useState } from 'react';
import { editUserForm, registerUser, validateUserForm } from '../../actions/user';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import { Card } from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import { ImageCropper } from '../../components/ImageCropper';
import { useOutsideClick } from '../../effects/outsideClickEffect';
import TextField from '../../components/TextField';
import { DateField } from '../../components/fields/DateField';
import Label from '../../components/Label';
import PasswordField from '../../components/PasswordField';
import SelectField from '../../components/SelectField';
import { instrumentOptions } from '../../actions/instrument,';
import { FileInput } from '../../components/FileInput';

const MIN_DIMENSION = 150;

export const RegisterUserPage = ({registerUser}) => {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        instrument: 1,
        password: "",
        passwordConfirm: ""
    })
    
    const [error, setError] = useState(undefined);
    const [image, setImage] = useState("");
    const [imageError, setImageError] = useState("");
    const [croppedImage, setCroppedImage] = useState(undefined);

    const navigate = useNavigate();

    const onClickRegisterUser = async () => {
        setError(undefined);
        const response = await registerUser(user, croppedImage);

        if(response.isSuccess) {
            navigate("/");
        }
        else {
            setError(response.message);
        }
    }

    const onChangeImage = (event) => {

        const file = event.target.files?.[0];
        if (!file) 
            return;
    
        const reader = new FileReader();

        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            imageElement.addEventListener("load", (e) => {
            if (imageError) 
                setImageError("");

            const { naturalWidth, naturalHeight } = e.currentTarget;
            
            if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
                setImageError("Bild måste vara 150 x 150 pixlar.");
                return setImage("");
            }
            });

            setImage(imageUrl);
        });

        reader.readAsDataURL(file);
    }

    const onClickOutsideImage = () => {
        setImage(undefined);
    }

    const ref = useOutsideClick(onClickOutsideImage);

    const onClickConfirmCrop = (dataUrl) => {
        setCroppedImage(dataUrl);
        setImage(undefined);
    }

    const editUser = (change) => {
        setUser({
            ...user,
            ...change
        });
    }

    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            <div style={{width: "60%", marginTop: 20}}>
            {image && <div style={{position: "absolute"}} ref={ref}>
                <Card>
                    <ImageCropper 
                        imgSrc={image} 
                        onClickConfirm={onClickConfirmCrop}
                    />
                </Card>
            </div>}         
            <Card padding={true}>
                {error && <div style={{color: "red"}}>{error}</div>}
                <Label label="Förnamn">
                    <TextField source={user} property="firstName" onEdit={editUser}/>
                </Label>
                <Label label="Efternamn">
                    <TextField source={user} property="lastName" onEdit={editUser}/>
                </Label>
                <Label label="Födelsedag">
                    <DateField source={user} property="dateOfBirth" onEdit={editUser}/>
                </Label>
                <Label label="Email">
                    <TextField source={user} property="email" onEdit={editUser}/>
                </Label>
                <Label label="Telefonnummer">
                    <TextField source={user} property="phoneNumber" onEdit={editUser}/>
                </Label>
                <Label label="Adress">
                    <TextField source={user} property="address" onEdit={editUser}/>
                </Label>
                <Label label="Intrument">
                    <SelectField source={user} property="instrument" onEdit={editUser} options={instrumentOptions} />
                </Label>
                <Label label="Lösenord">
                    <PasswordField source={user} property="password" onEdit={editUser} />
                </Label>
                <Label label="Bekräfta lösenord">
                    <PasswordField source={user} property="passwordConfirm" onEdit={editUser} />
                </Label>
                {/* <Label label="Profil bild">
                    <ImageInput 
                        onChange={onChangeImage}
                    />
                    {imageError && <div>{imageError}</div>}
                    {croppedImage && <div style={{margin: 10}}><img src={croppedImage} width={150}/></div>}
                </Label> */}
            </Card>
            <div style={{marginTop: 20}}>
                <Button 
                    onClick={onClickRegisterUser} 
                    disabled={!validateUserForm(user)} 
                    shape={"rounded"}
                >
                    Bli medlem
                </Button>
            </div>
        </div>
    </div>);
}

const mapStateToProps = state => {
    return {
        form: state.user.form
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (user, image) => dispatch(registerUser(user, image)),
        editUserForm: (change) => dispatch(editUserForm(change)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage)