export default function ResultTableData(prop){
    return(
        <tr>
            <td>{prop.rank+2}</td>
            <td>{prop.p.title}</td>
            <td className="tableData"><img src={prop.p.thumbnail}/></td>
            <td>{prop.p.views}</td>
            <td>{prop.p.likes}</td>
            <td>{prop.p.comments}</td>
            <td>{prop.p.uploadedOn}</td>
            <td>{prop.p.earnings}</td>
        </tr>
    )
}