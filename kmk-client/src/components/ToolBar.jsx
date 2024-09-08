import Button from "./Button"

export const ToolBar = ({onCreate, onDelete, onSave, loading, saveDisabled}) => {
    return (
        <div className='toolbar' style={{justifyContent: "space-between", display: "flex", marginBottom: 20}}>
            {onSave && <Button
                className={"save"}
                width={50} 
                height={30} 
                onClick={onSave}
                shape="rounded"
                disabled={saveDisabled || loading}
            >
                Spara
            </Button>}
            {onCreate && <Button
                className={"save"}
                width={50} 
                height={30} 
                onClick={onCreate}
                shape="rounded"
                disabled={saveDisabled || loading}
            >
                Skapa
            </Button>}
            {onDelete && <Button
                className="delete"
                width={50} 
                height={30} 
                onClick={onDelete}
                shape="rounded"
                disabled={loading}
            >
                Radera
            </Button>}
        </div>)
}