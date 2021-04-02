// import { connect } from 'mongodb';
// import MongoLib from './MongoLib'

const MongoCon = () => {
    console.log("Parece que fallóFIRST");

    var conn = require('./MongoLib').test;
    console.log(conn);


    //const doc = document()
    console.log("Parece que fallóRETURN");
    return (
        <div className="MongoCon">
            {conn}
        </div>
    );
}

export default MongoCon;
