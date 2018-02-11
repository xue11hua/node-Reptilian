var cheerio=require("cheerio");
var path = require('path');
var express=require('express');
var superagent=require('superagent');
var app=express();
app.get('/',function(req,res,next){
	var url="http://theater.mtime.com/China_Shanxi_Province_Xian/"; //网址
	superagent.get(url).end(function(err,sres){
		if(err){
			console.log(err)
		}
		var $=cheerio.load(sres.text);
         var itmes=[];
         $(".othermovie .clearfix dt a").each((iten,i)=>{
	           	 itmes.push({
	            	content:[
	            		{id:path.basename($(i).attr('href'))},
	            		{title:$(i).text()},
	            	]
         	 }) 
        })  
          res.send(itmes);
	})
})
app.get('/xq/:id',function(req,res,next){
	var id=req.params['id'];
	var url="http://movie.mtime.com/"+id; //网址
	
	superagent.get(url).end(function(err,sres){
		if(err){
			console.log(err)
		}
		var $=cheerio.load(sres.text);
         var itmes=[];
         
         $("#db_head .clearfix h1").each((iten,i)=>{
         	$(".base_r .mt6").each((iten,b)=>{
	           	 itmes.push({
	            	content:[
	            		{title:$(i).text()},
	            		{con:$(b).text()},
	            	]
	            }) 
	           }) 
        })   
          res.send(itmes);
	})
})
app.listen(3000);