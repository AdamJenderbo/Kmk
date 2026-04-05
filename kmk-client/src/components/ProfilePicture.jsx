export const ProfilePicture = ({user}) => {    

    return (
        <img style={{margin: 10, width: 40, height: 40, borderRadius: 100}} src={user.userPictureUrl}></img>
     );
};
