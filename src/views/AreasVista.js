import React from 'react'
import TarjetasVista from './TarjetasVista';

const AreasVista = ({posts, changeParams}) => {
    return (
        <div className="AreasVista">
            <TarjetasVista changeParams={changeParams} tarjetas={posts} />
        </div>
    );
    // return (
    //     <div className="AreasVista">
    //         <TarjetasVista tarjetas={posts} />
    //     </div>
    // );
    
}

export default AreasVista