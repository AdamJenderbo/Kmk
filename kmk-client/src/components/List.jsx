

const MenuDropDown = ({items, Item}) =>{


    const ref = useOutsideClick(onClickOutside);

    return(
            <div>
                {items.map((item, index) => (
                    <div key={index}><Item/></div>))}
            </div>
        );
}