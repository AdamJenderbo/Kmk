import Icon from "./Icon";
import '../style/optionsList.scss';


const Option = ({option, selected, onSelect}) => {

    return <div className="option" onClick={() => onSelect(option.value)}>
        {option.icon && <Icon icon={option.icon}/>}
        {option.text}
        <div className={selected ? "dot selected" : "dot"}>
            <div className={selected ? "inner selected" : "inner"}></div>
        </div>
    </div>

};


export const OptionsList = ({options, value, onSelect}) => {    

    return (
        <div className="optionsList">
            {options.map((option, index) => <Option
                key={index}
                onSelect={onSelect}
                option={option} 
                selected={option.value === value}
            />)}
        </div>
     );
};
