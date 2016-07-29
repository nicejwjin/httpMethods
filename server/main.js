cl = console.log;

var pictures = new Mongo.Collection("pictures");
var messages = new Mongo.Collection("messages");

HTTP.methods({
  'test': function() {
    cl('test run');
    var arr = [];
    for(var i = 0; i < 9; i++) {
      arr.push({
        imageName: '',
        count: 0
      });
    }

    return arr;
  },
  'insertData': function(data) {
    cl(data);
    var pic = pictures.findOne({imageName: data.imageName});
    if(pic) {
      pic.count++;
      pictures.update({_id: pic._id}, pic);
    }
    else{
      data.count = 1;
      pictures.insert(data);
    }
    data.result = 'success';
    return data;
  },
  'findData': function(data) {
    cl(data);
    var rslt = {};
    rslt.result = 'success';
    rslt.array = pictures.find().fetch();
    cl(rslt);
    return rslt;
  },
  'sendMessage': function(data) {
    cl(data);
    data.createdAt = new Date();
    messages.insert(data)
    var rslt = {};
    rslt.result = 'success';
    rslt.array = messages.find({}, {sort: {createdAt: -1}}).fetch();
    cl(rslt);
    return rslt
  }
});


//HTTP.post('http://localhost:3000/insertData', {
//  data: {foo: 10}
//}, function(err, rslt) {
//  cl('post');
//  cl(rslt);
//});