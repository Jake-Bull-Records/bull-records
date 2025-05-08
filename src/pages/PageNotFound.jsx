import "../app.css"
import cornerBull from '../assets/cornerBull.png';

function pagenotfound(){
    return(
       <div className='page'>

       <div className='pageContent'>
            <h1>That page ain't here yet brother</h1>
        </div>
        <img src={cornerBull}></img>
        </div>
    )
}

export default pagenotfound