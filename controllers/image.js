const Clarifai = require ('clarifai');

//You must add your own API key here from Clarifai.
const app = new Clarifai.App({
  apiKey: ''                     
});

//If this model doesn't work, search for new one in your cabinet on https://portal.clarifai.com/
const handleApiCall = (req, res) => {
  app.models
  .predict('f76196b43bbd45c99b4f3cd8e8b40a8a', req.body.input)  
  .then(data => {                                             
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0])
  })
  .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
  handleImage,
  handleApiCall
}