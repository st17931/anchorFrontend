import ResultTableData from "./ResultTableData"

export default function ResultBodyComponent(prop){
    let arr = prop.data;
    const tableRows = arr.slice(1).map((item,i)=>(
        <ResultTableData p = {item} rank={i}  key={i}/>
    ));
    return(
        <table className="table">
            <thead>
               <tr>
                   <th>Rank</th>
                   <th>Title</th>
                   <th>Thumbnail</th>
                   <th>Views</th>
                   <th>Likes</th>
                   <th>Comment</th>
                   <th>Uploaded on</th>
                   <th>*Estimated Earning</th>
               </tr>
            </thead>
            <tbody>
              {tableRows}
            </tbody>
        </table>
    )
}