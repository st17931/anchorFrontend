import ResultNavComponent from "./Components/ResultNavComponent";
import ResultBodyComponent from "./Components/ResultBodyComponent"
function ResultPage(prop){
    console.log("Inside Result page",prop);
    return(
    <>
    <ResultNavComponent/>
    <ResultBodyComponent p={prop.p}/>
    </>
    )
}
export default ResultPage;