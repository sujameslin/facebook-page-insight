var config_offset = 30;
var DEBUG_MODE = false;

// For logging responses
function update_insights(response) {
    var params = '';
    $.ajax({
        url: '/update_page_views',
        type: 'get',
        data: params
    }).success(function(result) {
        view_page_views(result);
    }).error(function (xhr) {
      try{
        var response = JSON.parse(xhr.responseText);
        if(response.error && response.redirectUri) {
          window.location = response.redirectUri;
        }
      } catch(err) {
      }
       // todo: handle error
    });

    $.ajax({
        url: '/update_page_likes',
        type: 'get',
        data: params
    }).success(function(result) {
        view_page_likes(result);
    }).error(function (xhr) {
      try{
        var response = JSON.parse(xhr.responseText);
        if(response.error && response.redirectUri) {
          window.location = response.redirectUri;
        }
      } catch(err) {
      }
       // todo: handle error
    });

    $.ajax({
        url: '/update_reach',
        type: 'get',
        data: params
    }).success(function(result) {
        view_reach(result);
    }).error(function (xhr) {
      try{
        var response = JSON.parse(xhr.responseText);
        if(response.error && response.redirectUri) {
          window.location = response.redirectUri;
        }
      } catch(err) {
      }
       // todo: handle error
    });

    $.ajax({
        url: '/update_post_engagements',
        type: 'get',
        data: params
    }).success(function(result) {
        view_post_engagements(result);
    }).error(function (xhr) {
      try{
        var response = JSON.parse(xhr.responseText);
        if(response.error && response.redirectUri) {
          window.location = response.redirectUri;
        }
      } catch(err) {
      }
       // todo: handle error
    });

    $.ajax({
        url: '/update_videos',
        type: 'get',
        data: params
    }).success(function(result) {
        view_videos(result);
    }).error(function (xhr) {
      try{
        var response = JSON.parse(xhr.responseText);
        if(response.error && response.redirectUri) {
          window.location = response.redirectUri;
        }
      } catch(err) {
      }
       // todo: handle error
    });
}

function view_page_views(result) {
    create_chart(result, "page_views", "Page Views");
}

function view_page_likes(result) {
    create_chart(result, "page_likes", "Page Likes");
}

function view_reach(result) {
    create_chart(result, "reach", "Reach");
}

function view_post_engagements(result) {
    create_chart(result, "post_engagements", "Post Engagements");
}

function view_videos(result) {
    create_chart(result, "videos", "Videos");
}

$(function () {
    $("#update_insights").click(function() {
        update_insights(null);
    });
});


function create_chart(result, chat_name, chat_text){
  $.getScript("http://canvasjs.com/assets/script/canvasjs.min.js", function(){
        var datapoints = create_datapoints(result);

        var chart = new CanvasJS.Chart(chat_name, {
            theme: "theme2",
            title: {
              text: chat_text
            },
            animationEnabled: true,
            axisX: {
              valueFormatString: "DD/MMM",
              interval: 1,
              intervalType: "day"

            },
            axisY: {
              includeZero: false

            },
            data: [{
              type: "line",
              //lineThickness: 3,
              dataPoints: datapoints
            }]
        });
        chart.render();
    });
}
function create_datapoints(data){
  var datapoints = Array();
  if(typeof data !== 'undefined' && data.length > 0){
    data = data[0].values;
    for(item in data){
        var dataobject = Object();
        dataobject.y = data[item].value;
        dataobject.x = new Date(data[item].end_time);
        dataobject.x.setDate(dataobject.x.getDate() - 1);

        datapoints.push(dataobject);
    }
  }
  else{
    for(offset = config_offset; offset >= 0; offset--){
      var myDate = new Date();
      myDate.setDate(myDate.getDate() - offset);

      var dataobject = Object();
      dataobject.x = myDate;
      dataobject.y = 0;

      datapoints.push(dataobject);
    }
    datapoints.reverse();
  }
  return datapoints;
}
