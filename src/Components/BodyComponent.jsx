import { useState } from "react"


export default function BodyComponent(p){
    const[link,setLink] = useState('');

    function handleChange(e){
        const v = e.target.value;
        setLink(v);
        p.prop.func(v);
    }

    function buttonHandler(){
        setLink('');
        p.prop.buttonHandler();
    }
    
    return(
        <div className="body">
            <div className="item">
                
                 <h1>Discover your earning potential </h1>
                 <p>Turn your Youtube expertise into a lucrative income through resource sharing</p>
                 <div className="itemLower">
                    <input type="search" placeholder="Enter youtube video link" onChange={handleChange} value={link}/>
                    <button onClick={buttonHandler}></button>
                 </div>
            </div>
        </div>
    )
}