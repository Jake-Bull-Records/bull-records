import '../app.css'

import DiggerDiv from '../components/DiggerDiv.jsx'

function crateDigger(){
    return(
        <div className='pageContent'>
            <h1>Welcome to the Crate Digger, friend.</h1>
            <br></br>
         <DiggerDiv />
        </div>
    )
}

export default crateDigger