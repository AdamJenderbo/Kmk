import { Link } from "react-router-dom";
import '../style/app.scss';

export const MenuBar = () => {    

    return (
        <div className="menubar">
            <Link style={{padding: 10}} to={"/politician"}>Politiker</Link>
            <Link  style={{padding: 10}} to={"/group"}>Partier</Link>
        </div>
     );
};
