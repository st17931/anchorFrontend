import no1_icon from "../asset/no1_icon.png"
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ResultTableComponent from "./ResultTableComponent"

export default function ResultBodyComponent(prop){
    const data = prop.p;
    console.log("Data Inside ResultBodyComponent", data);
    return(
        <>
        <div className="resultBody">
            <div className="banner-1">
               <div className="first-column">
                    <div className="image-section">
                       <div className="icon-2"><img src={no1_icon}/></div>
                       <div className="text-2">Top earner video</div> 
                    </div>
                    <div className="secondImage"><img src={data[0].thumbnail} alt="" /></div>
                    <div>Uploaded on-{data[0].uploadedOn}</div>
               </div>
               <div className="second-column">
                    <div>{data[0].title}</div>
                    <div className="flex data-point">
                     <VisibilityIcon/>
                     <div>{data[0].views}</div>
                    </div>
                    <div className="flex data-point">
                     <ThumbUpAltIcon/>
                     <div>{data[0].likes}</div>
                    </div>
                    <div className="flex data-point">
                        <ChatBubbleIcon/>
                        <div>{data[0].comments}</div>
                    </div>
               </div>
               
                 <div className="box2 ">

                  <div className="third-column-data">
                    <div className="flex ">
                        <CurrencyRupeeIcon   style={{ fontSize: '3rem' }}/>
                        <div className="price">{data[0].earnings}</div>
                    </div>
                    <div className="Button"></div>
                  </div>

                 
                 
               </div>
        </div>
        
        </div>
        <p className="para">Other Videos Potentials</p>
        <ResultTableComponent  data={data}/>
        </>
    )
}