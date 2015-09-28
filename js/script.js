
var theOrgs = {};
var theData = [];
var allVals = [];


$(document).ready(function() {

	$.getJSON("js/data.json", function(data) {
		setData.init(data);
		theTable.init();
	});

});



var setData = {
	init : function(data) {

		$.each(data, function(i, item) {

			if (!theOrgs[item.media]) {
				theOrgs[item.media] = {
					finalist : [],
					winner : []
				}
			}

			theOrgs[item.media][item.status].push(item);

		});


		$.each(theOrgs, function(org, item) {

			var obj = {
				org : org,
				finalist : item.finalist.length,
				winner : item.winner.length,
			}

			allVals.push(parseInt(item.finalist.length) + parseInt(item.winner.length));

			theData.push(obj);
		});


	}
}





var theTable = {
	init : function() {

		var maxVal = d3.max(allVals)

		$.each(theData, function(i, item) {

			var orgTotal = item.winner + item.finalist;
			var pct = parseFloat(orgTotal/maxVal * 100, 10);

			$(".the-table tbody").append(
				"<tr org='"+item.org+"'>"+
					"<td>"+item.org+"</td>"+
					"<td class='num'>"+item.finalist+"</td>"+
					"<td class='num'>"+item.winner+"</td>"+
					"<td class='num total'><span class='val'>"+orgTotal+"</span><div class='bar' style='width : "+pct+"%'></div></td>"+
				"</tr>"
			);

		});

		$(".the-table").DataTable({
			"order": [[ 3, "desc" ]]
		});

		$(document).on("click", ".the-table tr", function() {
			var org = $(this).attr("org");
			theCard.init(org);
		});

	}
}



var theCard = {
	init : function(org) {
		var card = $("#table-card").html();
		var $thisRow = $("tr[org='"+org+"']");

	
		$(".table-card-row").remove();
		$(card).insertAfter($thisRow);
		$(".card").slideDown();

		$(".card .org-name").html(org);

		$.each(theOrgs[org].winner, function(i, item) {
			
			$(".card .org-table").append(
				"<tr>"+
					"<td>"+item.year+"</td>"+
					"<td>"+item.award+"</td>"+
					"<td>"+item.status+"</td>"+
				"</tr>"
			);

			
		});

		$.each(theOrgs[org].finalist, function(i, item) {
			$(".card .org-table").append(
				"<tr>"+
					"<td>"+item.year+"</td>"+
					"<td>"+item.award+"</td>"+
					"<td>"+item.status+"</td>"+
				"</tr>"
			);
		});

	
		// // $(cardMarkup).insertAfter("#data-table tr[co='co_"+coObj.id+"']");
	}
}






