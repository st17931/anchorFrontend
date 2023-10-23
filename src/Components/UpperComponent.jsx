import companyLogo from '../asset/anchorimg.jpg';

function UpperComponent(){
    return(
        <div className='nav'>
        <img src={companyLogo}/>
        <h1>anchors</h1>
        <div>Beta</div>
        </div>
    )
}

export default UpperComponent;