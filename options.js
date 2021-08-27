
var table = []

function convertToArray(selector, isList){
  var convertedIntoArray = [];
  $(selector).each(function() {
    if (!isList) {var rowDataArray = [];}
    var actualData = $(this).find('td');
    if (actualData.length > 0) {
       actualData.each(function() {
         if (isList) {convertedIntoArray.push($(this).text()) }
         else { rowDataArray.push($(this).text()); }
       });
       if (!isList) {convertedIntoArray.push(rowDataArray);}
    }
  });
  return convertedIntoArray
}

$(document).ready(function () {
    //import { listener_fn } from './background.js';
    //const { listener_fn } = require('./background.js');
    var sites1 = []

    chrome.storage.local.get("sites", ({ sites }) => {
        sites1 = sites
        let dataSet = []
        for (const item of sites1) {
            dataSet.push([item])
        }
        table = $('#example').DataTable({
            data: dataSet,
            columns: [
                { title: "URL" }
            ],
            searching: false,
            paging: false,
        });
        console.log(table.length)
    });

    chrome.storage.local.get("unblock_times", ({ unblock_times }) => {
        //https://www.w3schools.com/jsref/prop_input_time_value.asp
        console.log(unblock_times)
        for (var i = 0; i < unblock_times.length; i++) {
          let time = unblock_times[i]
          html = `
            <div class="time">
              <label for="site">From </label>
              <input class="time" type="time" Value=${time[0]}>
              <label for="site"> to </label>
              <input class="time" type="time" Value=${time[1]}>
              <input class="btn btn-primary removeTime" type="button" value="Remove">
              <br>
            </div>
          `
          $('#form-time').append(html);
        }

        $('.removeTime').on('click', function() {
          parent = $(this).parent()
          console.log(parent)
          parent.remove()
        })
    });

    $('#add-time').on('click', function() {
      html = `
        <div class="time">
          <label for="site">From </label>
          <input class="time" type="time" Value="00:00">
          <label for="site"> to </label>
          <input class="time" type="time" Value="00:00">
          <input class="btn btn-primary removeTime" type="button" value="Remove">
          <br>
        </div>
      `
      $('#form-time').append(html);
      $('.removeTime').on('click', function() {
        parent = $(this).parent()
        console.log(parent)
        parent.remove()
      })
    })

    $('#save-time').on('click', function() {
      var convertedIntoArray = [];
      $("#form-time div.time").each(function() {
        let startend = []
        //console.log($(this))
        $(this).children('input.time').each(function() {
          //console.log($(this)[0].value)
          startend.push($(this)[0].value)
        });
        convertedIntoArray.push(startend)
      });
      console.log(convertedIntoArray)
      chrome.storage.local.set({ unblock_times: convertedIntoArray }, function () {
        console.log('chrome.storage.local set unblock_times');
        console.log(convertedIntoArray)
      })
    })

    $('#submit').on('click', function () {
        console.log("submitted")
        val = $('#site')[0].value
        console.log(val)
        table.row.add([val]).draw(false);
        console.log(table)
    })

    $('#example').on( 'click', 'tbody tr', function () {
        console.log($(this)[0])
        if ( $(this).hasClass('selected') ) {
            $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
    } );

    $('#remove').click( function () {
        table.row('.selected').remove().draw( false );
        console.log(table)
    } );

    $('#save').click( function () {
      //console.log(table)
      let array = convertToArray("table#example tr", true)
      console.log(array);
      chrome.storage.local.set({ sites: array }, function () {
          console.log('chrome.storage.local set sites');
          console.log(array)
          //chrome.runtime.sendMessage('get-user-data')
      })
    })
});
