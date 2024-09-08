export const Card = ({children, header, padding = true}) => {    

    return (
        <div className="card">
            {/* <div className="card-header">{header}</div> */}
            <div className={`card-content ${padding ? "padding" : ""}`}>{children}</div>
            {/* <div className="card-footer"></div> */}
        </div>
     );
};
