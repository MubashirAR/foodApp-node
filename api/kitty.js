import app from '../index';
import Cat from '../models/kitty'
// Endpoints
app.post('/helloworld', function(req, res){
    console.log('Hello World')
    res.send("Hello world!");

});
app.get('/addKitty', function(req, res){

    const kitty = new Cat({ name: 'asdasdasd' });
    kitty.save().then(() => console.log('meow'));
    res.send(kitty);
});
app.get('/getKitties', async function(req, res){

    try {
        var cats = await Cat.find()
        res.send(cats)
    } catch (error) {
        res.send({error: error.message});
    }
});