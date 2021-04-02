// import { connect } from 'mongodb';
// import MongoLib from './MongoLib'

const MongoCon = () => {
    console.log("Parece que fallóFIRST");
    var conn = require('./MongoLib');

    console.log(conn.test);


    //const doc = document()
    console.log("Parece que fallóRETURN");
    return (
        <div className="MongoCon">
            {/* { doc} */}
        </div>
    );
}

export default MongoCon;
