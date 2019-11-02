import React from 'react'
import itemList from './itemList'

const Shop = () =>(

<div className="App">
    <div className="header-panel" style={{float: 'left'}}>
    <div className="light-blue-text">

    <h3> Popular products </h3>
        </div>
</div>




<div className="card-panel" style={{float: 'left', width: 280*3}}>
    <div className="row" style={{"white-space": "nowrap"}}>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230}}>
                    <img alt = "SomeImage" src="https://www.america-today.com/dw/image/v2/BBPV_PRD/on/demandware.static/-/Sites-at-master-catalog/default/dw4607042a/images/product/shirts-hudson-men-yellow-1231002002-627-ms.jpg?sw=1200&sh=1200&sm=fit&sfrm=png"/>
                    <span className="card-title teal-text">Shirt</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230}}>
                    <img alt = "SomeImage" src="data:image/jpeg;base64,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"/>
                    <span className="card-title orange-text">Sweater</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230, height: 230}}>
                    <img alt = "SomeImage" src="https://ae01.alicdn.com/kf/HTB1VLPudFmWBuNjSspdq6zugXXaD/Oversized-Flannel-Vintage-Shirt-Men-Plaid-Long-Sleeve-Check-Shirts-For-Men-Loose-Men-Button-Up.jpg"/>
                    <span className="card-title blue-grey-text">Cool Shirt</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230, height: 230}}>
                    <img alt = "SomeImage" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ26p1M0VxP69eS_Dp4ZoGzz4j4h3SgwvrR-a9X3yw9aeLl_aWyOA&s"/>
                    <span className="card-title blue-grey-text">Jeans</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230, height: 230}}>
                    <img alt = "SomeImage" src="https://www.projectxparis.com/8559-large_default/distressed-skinny-jeans-with-contrasting-two-tone-stripes.jpg"/>
                    <span className="card-title blue-grey-text">Jeans</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        <div style={{width: 260, paddingRight:30, float: 'left' }}>
            <div className="card">
                <div className="card-image" style={{width:230, height: 230}}>
                    <img alt = "SomeImage" src="https://www.rebelsport.com.au/dw/image/v2/BBRV_PRD/on/demandware.static/-/Sites-srg-internal-master-catalog/default/dw4725402c/images/54506001/Rebel_54506001_whiteblack_hi-res.jpg?sw=1000&sh=1000&sm=fit"/>
                    <span className="card-title blue-grey-text">Jeans</span>
                </div>
                <div className="card-content">
                    <h6>Price $9.99 </h6>
                </div>
                <div className="card-action">
                    <a target="_blank" rel = "noopener noreferrer" href="/">Buy now</a>
                </div>
            </div>
        </div>
        

        </div>
    </div>
    </div>
    )

export default Shop