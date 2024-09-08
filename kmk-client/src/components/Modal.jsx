import { useOutsideClick } from '../effects/outsideClickEffect';
import '../style/modal.scss';
import { Card } from './Card';

export const Modal = ({children, onClose}) => {

    const onClickOutside = () => {
        onClose();
    }

    const ref = useOutsideClick(onClickOutside);

    return (
        <div ref={ref} className='modal'>
            <Card>
                {children}
            </Card>
        </div>
    );
}