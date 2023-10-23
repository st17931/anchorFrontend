import UpperComponent from './Components/UpperComponent';
import BodyComponent from './Components/bodyComponent';

export default function HomePage(prop){
    return (
        <>
          <UpperComponent/>
          <BodyComponent prop={prop}/>
        </>
      )
}