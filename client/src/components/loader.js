import '../styles/loader.scss';
const Loader = ({relative, style}) => {
    return (
        <div style={style} id={relative && 'relative'} className="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    ); 
}

export default Loader;