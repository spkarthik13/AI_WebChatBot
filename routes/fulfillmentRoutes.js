const {WebhookClient} = require('dialogflow-fulfillment')

const mongoose = require('mongoose');
const Demand = mongoose.model('demand');
const Recommendations = mongoose.model('recommendation')

module.exports = app => {
    app.post('/', async (req, res) => {
        const agent = new WebhookClient({request: req, response: res})

        function Dexter(agent){
            agent.add('Welcome to Dexter fulfillment');
        }

        function fallback(agent){
            agent.add(`I didn't understand`);
            agent.add(`I'm sorry, can you try again?`);
        }

       async function purchase(agent){
            Demand.findOne({'product': agent.parameters.products}, function (err, product){
                if(product!= null){
                    product.counter++;
                    product.save();
                }else{
                    const demand = new Demand({product: agent.parameters.products});
                    demand.save();
                }


            })
            let responseText = `Thank you for the purchase of ${agent.parameters.products}. Your request will be processed soon`;

            let recm = await Recommendations.findOne({'product': agent.parameters.products});
            if(recm != null){
                responseText = `Here are your recommendations for ${agent.parameters.products}. Here's the link: ${recm.link}`;
            }

            agent.add(responseText);
        }

        let intentMap = new Map();

        intentMap.set('Dexter', Dexter);
        intentMap.set('Purchase products', purchase)
        intentMap.set('Default Fallback Intent', fallback);

        agent.handleRequest(intentMap);
    })
}