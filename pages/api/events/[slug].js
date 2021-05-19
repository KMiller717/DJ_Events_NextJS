const {events} = require('./data.json')


export default (req, res) => {
    const evt = events.filter(ev => ev.slug === req.query.slug)
    
    if(req.method === 'GET'){
        res.status(200).json(evt)
    }
    else{
        res.setHeader('Allow', ['GET'])
        // Limit the methods to only allow GET requests, POST are not allowed
        res.status(405).json({message: `Method ${req.method} is not allowed`})
    }
  
}
