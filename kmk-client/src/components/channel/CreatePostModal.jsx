import Button from "../Button";



export const CreatePostModal = ({user}) => {

    return (<div style={{marginTop: 20, backgroundColor: "white", borderRadius: 5, position: "absolute", width: 400}}>
        <div style={{fontSize: "large", padding: 20, fontWeight: "bold", borderBottom: "1px solid rgb(240, 242, 245)"}}>Skapa inlägg</div>
        <div style={{textAlign: "left", padding: 20}}>{`${user.firstName} ${user.lastName}`}</div>
        {/* <TextField></TextField> */}
        <div style={{padding: 20, justifyContent: "center", display: "flex"}}><Button>Publicera</Button></div>
    </div>);
}