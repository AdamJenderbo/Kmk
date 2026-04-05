export const FileInput = ({onChange}) => {
    
    return (
        <input 
            type="file" 
            id="img" 
            name="img"
            onChange={onChange}
        />
    );
}
    