import React from 'react';

const Landing = () =>(
    <div className="App">

        <div className="header-panel" style={{float: 'left'}}>
            <div className="container">
                <div className="parallax">
                    <img alt = "main Image" src="https://media.antwerpen.be/media/6/Z/Z1GNZIZLkHSdpTWVNO3VCOaB/1498871957827.jpg" style={{width: 760, float:'left', height:200, overflow: 'hidden', paddingRight: 30}}></img>
                    <div className="header-panel teal-text lighten-2">
                        <h4>Welcome to our shopping Site!</h4>
                    </div>

                    <div className="light-blue-text">
                        <h6> Enjoy your shopping experience with our personalized chatbot </h6>
                    </div>

                </div>
            </div>
        </div>




        <div className="card-panel" style={{float: 'left', width: 280*3}}>
            <div className="row" style={{"white-space": "nowrap"}}>
                <div style={{width: 260, paddingRight:30, float: 'left' }}>
                    <div className="card">
                        <div className="card-image" style={{width:230}}>
                            <img alt = "SomeImage" src="https://images-na.ssl-images-amazon.com/images/I/51d3TROruWL._UL1024_.jpg"/>
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
                            <img alt = "SomeImage" src="https://images-na.ssl-images-amazon.com/images/I/71DPnEmqW%2BL._UL1500_.jpg"/>
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
                            <img alt = "SomeImage" src="https://d4zpg1jklewne.cloudfront.net/steak/spree-variant/slm-007-lbl-3-1547860483005/mens-slim-jeans-in-light-wash-product.jpg?1547860492"/>
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


export default Landing;
