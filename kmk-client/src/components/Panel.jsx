import '../style/panel.scss';

export const Panel = ({children, header}) => {
    return (
    <div className='panel'>
        <div className='panel-header'>{header}</div>
        <div className='panel-content'>
            {children}
        </div>
    </div>)
}