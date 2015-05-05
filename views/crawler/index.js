var request = require("request");
var fs = require("fs");
var cheerio = require("cheerio");
  

exports.init = function (req, res, next)
{
  var workflow = new req.app.utility.workflow(req, res);
    
    workflow.on('query', function() {
      request({
      url: "http://www.imdb.com/title/tt1229340/",
      method: "GET"
    }, function(error,response,html) {
      if(error || !html) { return; }
      var $ = cheerio.load(html);
      var result = [];
      var result2 =[];
      var jsonResult = [];
      var titles = $("li.item h2");
      var content = $("li.item p");

      for(var i=0;i<titles.length;i++) {
        result.push($(titles[i]).text()); 
      }

      for(var i=0;i<content.length;i++) {
        result2.push($(content[i]).text()); 
      }
      
      console.log("titles: " + JSON.stringify(result));
      console.log("content: " + JSON.stringify(result2));

      for(var i=0;i<result.length;i++) {
        console.log("titlesqqq: " + (result[i])); 
        console.log("contenqqq: " + (result2[i]));
        var item = {
          "title": result[i],
          "content": result2[i]
        };

        jsonResult.push(item);
      }

      console.log("json_json: " + JSON.stringify({jsonResult: jsonResult}));

      //fs.writeFileSync("result.json", JSON.stringify(result));
    });
      
      return workflow.emit('response');
  });

    workflow.on('render', function() {
        res.render('crawler/index');
            
    });

    return workflow.emit('query');
};


exports.imdb = function (req, res, next)
{
  var workflow = new req.app.utility.workflow(req, res);
    
    workflow.on('query', function() {
      request({
      url: "http://www.imdb.com/title/tt2395427/?ref_=hm_otw_t0",
      method: "GET"
    }, function(error,response,html) {
      if(error || !html) { return; }
      var $ = cheerio.load(html);
      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

       $('.header').filter(function(){
        var data = $(this);
        title = data.children().first().text();            
        release = data.children().last().children().text();

        json.title = title;
        json.release = release;
    });

    $('.star-box-giga-star').filter(function(){
        var data = $(this);
        rating = data.text();

        json.rating = rating;
    });
  

      console.log("json_json: " + JSON.stringify({jsonResult: json}));
  });
      //fs.writeFileSync("result.json", JSON.stringify(result));
   
      
      return workflow.emit('response');
  });

    workflow.on('render', function() {
        res.render('crawler/index');
            
    });

    return workflow.emit('query');
};
