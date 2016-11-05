var Map = new Map();
var wordArray = [];


$(document).ready(function () {



	$("#button").click(function() {


	    var class_name = document.getElementById("class_name").value;
	    var class_location = document.getElementById("class_location").value;
	   var class_time = document.getElementById("class_time").value;


	    entry = {name: class_name,location: class_location, time: class_time};
	   	//map[class_time] = entry;
	   	wordArray.push(entry);
	    var row = "<tr>";

	    row += ("<td>" + entry.name + "</td>");
	    	  //  alert(row);

	    row += ("<td>" + entry.location+ "</td>");
	    	  //  alert(row);

	    row += ("<td>" + entry.time + "</td>");
	    	 //   alert(row);

	    row += "</tr>";
	    //alert(row);
	$("#surface").append(row);
	//$('#surface').append('<tr> <td></td> <td></td> <td>/td> </tr>')
	}); 
});




//TODO insert a table
//put entries in an array
//sort entries by time
//