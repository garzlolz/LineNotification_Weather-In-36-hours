var lineToken = 'Your Line Token';        //Line Token
function WheatherReport(){                                            //Json
  var response = UrlFetchApp.fetch('https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=CWB-6308B6CA-3EB6-45BC-A030-4FAF2F582E05&downloadType=WEB&format=JSON');

  var json = JSON.parse(response.getContentText());
  var location=json.cwbopendata.dataset.location[3]                   //台中市
  var place = location.locationName;                                  //台中市名
  var strBody = location.weatherElement;                              //Content


  var startTime_1 = strBody[0].time[0].startTime;                 
    startTime_1 =startTime_1.replace('2021-','').replace('+8:00','').replace('T',' ');    //startTime1
  var endTime_1 = strBody[0].time[0].endTime;
    endTime_1   = endTime_1.replace('2021-','').replace('+8:00','').replace('T',' ');      //endTime1

  var startTime_2 = strBody[0].time[1].startTime;
    startTime_2 = startTime_2.replace('2021-','').replace('+8:00','').replace('T',' ');    //startTime2
  var endTime_2 = strBody[0].time[1].endTime;
    endTime_2 = endTime_2.replace('2021-','').replace('+8:00','').replace('T',' ');        //endTime2

  var startTime_3 = strBody[0].time[2].startTime;
    startTime_3 = startTime_3.replace('2021-','').replace('+8:00','').replace('T',' ');    //startTime3
  var endTime_3 = strBody[0].time[2].endTime;
    endTime_3 = endTime_3.replace('2021-','').replace('+8:00','').replace('T',' ');        //endTime3
    
  var Wx_1 = strBody[0].time[0].parameter.parameterName           //氣象1~3
  var Wx_2 = strBody[0].time[1].parameter.parameterName           
  var Wx_3 = strBody[0].time[2].parameter.parameterName  

  var MaxT_1 = strBody[1].time[0].parameter.parameterName + '°C'    //最高溫度1～3
  var MaxT_2 = strBody[1].time[1].parameter.parameterName + '°C'
  var MaxT_3 = strBody[1].time[2].parameter.parameterName + '°C'

  var MinT_1 = strBody[2].time[0].parameter.parameterName + '°C'    //最高溫度1~3
  var MinT_2 = strBody[2].time[1].parameter.parameterName + '°C'
  var MinT_3 = strBody[2].time[2].parameter.parameterName + '°C'

  var CI_1 = strBody[3].time[0].parameter.parameterName + ''
  var CI_2 = strBody[3].time[1].parameter.parameterName + ''
  var CI_3 = strBody[3].time[2].parameter.parameterName + ''

  var POP_1 = strBody[4].time[0].parameter.parameterName + "%";
  var POP_2 = strBody[4].time[1].parameter.parameterName + "%";
  var POP_3 = strBody[4].time[2].parameter.parameterName + "%";
  var nowDate = new Date();
  console.log(nowDate)
  strBody = `
  \n
  ${place}今明36小時天氣預報 \n\n 
  ${startTime_1.replace(':00:00+08:00','點')}至\n ${endTime_1.replace(':00:00+08:00','點')}\n
  天氣現象 ：${Wx_1} \n
  最高溫度 ：${MaxT_1} \n
  最低溫度 ：${MinT_1} \n
  舒適度   ：${CI_1} \n
  降雨機率 ：${POP_1} \n\n
  ${startTime_2.replace(':00:00+08:00','點')}至\n ${endTime_2.replace(':00:00+08:00','點')}\n
  天氣現象 ：${Wx_2} \n
  最高溫度 ：${MaxT_2} \n
  最低溫度 ：${MinT_2} \n
  舒適度   ：${CI_2} \n
  降雨機率 ：${POP_2} \n\n
  ${startTime_3.replace(':00:00+08:00','點')}至\n ${endTime_3.replace(':00:00+08:00','點')}\n
  天氣現象 ：${Wx_3} \n
  最高溫度 ：${MaxT_3} \n
  最低溫度 ：${MinT_3} \n
  舒適度   ：${CI_3} \n
  降雨機率 ：${POP_3} \n\n
  `;
  sendToLine(strBody)
}


/************************.  Send To Line  ********************* */
function sendToLine(strBody){
  var token = lineToken;
  var  formData = {
  'message': strBody
};
  var options = 
  {
    "method" : "post",
    "payload": formData,
    "headers": {
      "Authorization": "Bearer " + token, 
      "Content-Type" : "application/x-www-form-urlencoded"        
    }
  };
  Logger.log(options.payload)
  UrlFetchApp.fetch('https://notify-api.line.me/api/notify',options)
}




  //////////////////////////
  ////////////            //     
  ////////////            //
  //////////////////////////
  ////////////            //
  ////////////            //
  //////////////////////////   
