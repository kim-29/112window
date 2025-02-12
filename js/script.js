const book = {
  "diesbook":{
    /*형번호:무게(kg/m)*/
    "45p-16-1":0.546,
    "45p-19":0.549,
    "1110":0.18,
    "118":0.172,
    "116":0.162,
    "116-1":0.141,
    "ns88sl114":0.988,
    "ns88sl401":0.497,
    "ns88sl403":0.487,
    "ns88sl601":0.586,
    "ns88sl603":0.557,
    "ns88sl701":0.599,
    "ns88sl703":0.595,
    "ns88sl801":0.522,
    "ns88sl803":0.515,
    "ns112sl104":1.202,
    "ns112sl401":0.648,
    "ns112sl403":0.618,
    "ns112sl404":0.633,
    "ns112sl602":1.267,
    "ns112sl603":1.07,
    "ns112sl604":1.099,
    "ns112sl605":1.104,
    "ns112sl607":1.311,
    "ns112sl701":0.798,
    "ns112sl702":0.769,
    "ns112sl704":0.818,
    "ns112sl707":0.79,
    "ns112sl801":0.769,
    "ns112sl802":0.739,
    "ns112sl804":0.758,
    "ns112sl805":0.793,
    "ns112sl807":0.76,
    "ns112sl701-A":0.297,
    "sc-8":0.267,
    "sc-19":0.375,
    "sc-20":0.391,
  },
  "colorbook":{
    /*색상바 단가*/
    "헨켈":10500,
    "메탈실버":11000,
    "백색":11000,
    "검정색":11500,
    "코팅색상":12000,
  },
  "tolerancebook":{
    /*슬라이딩 윈도우 공차 : [2짝문 너비공차, 3짝문 너비공차, 4짝문 너비공차, 높이공차]*/
    "window112":[175,192,292,68],
    "screen112":[-7,20,-11,55],
    "window88":[147,156,235,68],
    "screen88":[2,20,5,55],
    /*프로젝트 윈도우 공차 : [너비공차,높이공차]*/
    "project45":[36,36],
    "project-parts":[115,145],
  },
  "glassbook":{
    "8mm":["ns112sl401","ns112sl604","ns112sl701","ns112sl801"],
    "16mm":['ns112sl403','ns112sl602','ns112sl702','ns112sl802'],
    "20mm":['ns112sl404','ns112sl607','ns112sl707','ns112sl807'],
  },
}

/*=========변수설정=====================*/
  
  const frame_out = document.querySelector('.frame.result')
  const top_out = document.querySelector('.window-top.result')
  const bottom_out = document.querySelector('.window-bottom.result')
  const outside_out = document.querySelector('.window-outside.result')
  const inside_out = document.querySelector(".window-inside.result")
  const window_part_out = document.querySelector(".window-part.result")
  const screen_frame_out = document.querySelector('.screen-frame.result')
  const screen_out = document.querySelector('.screen.result')
  const sub_total = document.querySelector('.sub-total.result')
  const production_cost = document.querySelector('.production-cost.result')
  const total = document.querySelector('.total.result')
  
  const frame_cut = document.querySelector('.frame.cutting')
  const top_cut = document.querySelector('.window-top.cutting')
  const bottom_cut = document.querySelector('.window-bottom.cutting')
  const outside_cut = document.querySelector('.window-outside.cutting')
  const inside_cut = document.querySelector(".window-inside.cutting")
  const window_part_cut = document.querySelector(".window-part.cutting")
  const sc8_cut = document.querySelector('.sc8.cutting')
  const sc19_cut = document.querySelector('.sc19.cutting')
  const sc20_cut = document.querySelector('.sc20.cutting')
  
  let type, width, height, color, tickness, tickness_16
  
  
  /*=========예상 견적가 및 절단내역=====================*/  
  const result_button = document.querySelector('.button112')
  result_button.addEventListener('click',()=>{
    
  /*변수 설정*/
  let elements,sum=0,weight=0,weight_sum=0
  type = Number(document.querySelector('#type').value)
  width = Number(document.querySelector('#width').value)
  height = Number(document.querySelector('#height').value)
  color = document.querySelector('#color').value
  tickness = document.querySelector('#tickness').value
  tickness_16 = document.querySelector('#tickness-16').value
  const top_bar = book.glassbook[tickness][0]
  const bottom_bar = tickness=="16mm"?tickness_16:book.glassbook[tickness][1]
  
  const outside_bar = book.glassbook[tickness][2]
  const inside_bar = book.glassbook[tickness][3] 
  const screen_frame = document.querySelector('#screen-frame')
  const screen = document.querySelector('#screen')
  const rain_hole = document.querySelector('#rain-hole')
  
  const frame_width = width
  const frame_height = height
  const window_height= height - book.tolerancebook.window112[3]      
  const screen_height = height - 55
  let side_width,center_width,outside_bar_count,inside_bar_count
  let sindow_part_count, screen_frame_count, screen_width
  let price, color_price = Number(book.colorbook[color])
  
  
  switch(type){
    case 2:
      side_width = (width-book.tolerancebook.window112[0])/2
      center_width = 0
      window_width = side_width*2
      outside_bar_count=2
      inside_bar_count=2
      window_part_count=0
      screen_frame_count=1
      screen_width=width/2+7
      break 
    case 3:
      side_width = (width-book.tolerancebook.window112[1])/4
      center_width = side_width*2
      window_width = side_width*2+center_width
      outside_bar_count=2
      inside_bar_count=4
      window_part_count=0
      screen_frame_count=2
      screen_width=side_width+94
      break
    case 4:
      side_width = (width-book.tolerancebook.window112[2])/4
      center_width = 0
      window_width = side_width*4
      outside_bar_count=2
      inside_bar_count=4
      window_part_count=1
      screen_frame_count=2
      screen_width=width/4+11
      break;
  }

  /*예상견적가 초기화*/
    const results = document.querySelectorAll('.result');
    
    results.forEach(result =>{
      if(result.className!="title result"){
        elements = result.querySelectorAll('span');     elements[2].innerHTML=elements[3].innerHTML=elements[4].innerHTML=""  
      }
    })
  
  /*frame 예상견적가*/
  elements = frame_out.querySelectorAll('span')
  elements[2].innerHTML = book.diesbook[elements[1].textContent]
  elements[3].innerHTML = (frame_width+frame_height)*2
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*창문(top_bar) 예상견적가*/
  elements = top_out.querySelectorAll('span')
  elements[1].innerHTML = top_bar;
  elements[2].innerHTML = book.diesbook[top_bar]
  elements[3].innerHTML = window_width
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*창문(bottom_bar) 예상견적가*/
  elements = bottom_out.querySelectorAll('span')
  elements[1].innerHTML = bottom_bar;
  elements[2].innerHTML = book.diesbook[bottom_bar]
  elements[3].innerHTML = window_width
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*창문(outside_bar) 예상견적가*/
  elements = outside_out.querySelectorAll('span')
  elements[1].innerHTML = outside_bar;
  elements[2].innerHTML = book.diesbook[outside_bar]
  elements[3].innerHTML = window_height*outside_bar_count
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*창문(inside_bar) 예상견적가*/
  elements = inside_out.querySelectorAll('span')
  elements[1].innerHTML = inside_bar;
  elements[2].innerHTML = book.diesbook[inside_bar]
  elements[3].innerHTML = window_height*inside_bar_count
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*창문부속 예상견적가*/
  elements = window_part_out.querySelectorAll('span')
  elements[2].innerHTML = book.diesbook[elements[1].textContent]
  elements[3].innerHTML = window_height*window_part_count
  weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
  price = Math.ceil(weight*color_price)
  elements[4].innerHTML = price.toLocaleString("en-US")
  sum=sum+price
  weight_sum = weight_sum+weight
  
  /*방충망 틀 예상견적가*/
  elements = screen_frame_out.querySelectorAll('span')
  elements[1].innerHTML = screen_frame.value;
  if(screen_frame.value !="미설치"){
    elements[2].innerHTML = book.diesbook[screen_frame.value]
    elements[3].innerHTML = (screen_width+screen_height)*2*screen_frame_count
    weight = Number(elements[2].innerHTML)*Number(elements[3].innerHTML)/1000
    price = Math.ceil(weight*color_price)
    elements[4].innerHTML = price.toLocaleString("en-US")
    sum=sum+price
    weight_sum = weight_sum+weight
  }
  
  /*방충망 예상견적가*/
  elements = screen_out.querySelectorAll('span')
  if(screen_frame.value !="미설치" & screen.checked == true ){
    price =Math.ceil(screen_width*screen_height/100) /*임시값으로 방충망에 대한 정확한 견적값 입력 필요*/
    elements[4].innerHTML =price.toLocaleString("en-US")
    sum=sum+price
  }
  
  /*자재견적가 sub-total 예상견적가*/
  elements = sub_total.querySelectorAll('span')
  elements[4].innerHTML =sum.toLocaleString("en-US")
  
  /*제작비 예상견적가*/
  elements = production_cost.querySelectorAll('span')
  switch(type){
    case 2:price=Math.ceil(14500+weight_sum*25000) /*부속비용 + 인건비(무게*25000원)*/
      break;
    case 3:price=Math.ceil(20600+weight_sum*25000)
      break;
    case 4:price=Math.ceil(24200+weight_sum*25000)
      break;
  }                        /*임시값으로 수정 필요*/
  elements[4].innerHTML =price.toLocaleString("en-US")
  sum=sum+price
  
  /*제작시 견적가 예상견적가*/
  elements = total.querySelectorAll('span')
  elements[4].innerHTML =sum.toLocaleString("en-US")

  
  /*=========절단 상세내역=====================*/
  
  /*초기화*/
  const cuttings = document.querySelectorAll('.cutting');
    cuttings.forEach(cutting =>{
      if(cutting.className!="title cutting"){
        elements = cutting.querySelectorAll('span')
        elements[2].innerHTML=elements[3].innerHTML=""  
      }
    })
  
  
  /*frame 절단내역*/
  elements = frame_cut.querySelectorAll('span')
  elements[2].innerHTML = frame_width + "mm X "+2
  elements[3].innerHTML = frame_height + "mm X "+2
  
  /*창문(top_bar) 절단내역*/
  elements = top_cut.querySelectorAll('span')
  elements[1].innerHTML = top_bar
  elements[2].innerHTML = side_width + "mm X "+(type==3?2:type)
  elements[3].innerHTML = type==3?center_width + "mm X "+1:""
  
  /*창문(bottom_bar) 절단내역*/
  elements = bottom_cut.querySelectorAll('span')
  elements[1].innerHTML = bottom_bar
  elements[2].innerHTML = side_width + "mm X " +(type==3?2:type)
  elements[3].innerHTML = type==3?center_width + "mm X "+1:""
  
  /*창문(outside_bar) 절단내역*/
  elements = outside_cut.querySelectorAll('span')
  elements[1].innerHTML = outside_bar
  elements[2].innerHTML = window_height + "mm X "+outside_bar_count
  
  /*창문(inside_bar) 절단내역*/
  elements = inside_cut.querySelectorAll('span')
  elements[1].innerHTML = inside_bar
  elements[2].innerHTML = window_height + "mm X "+inside_bar_count
  
  /*창문부속 절단내역*/
  elements = window_part_cut.querySelectorAll('span')
  elements[2].innerHTML = type==4?window_height + "mm X " + 1:""
  
  /*방충망틀 절단내역*/
  switch(screen_frame.value){
    case "sc-8":
      elements = sc8_cut.querySelectorAll('span')
      elements[2].innerHTML = screen_width + "mm X " + (type==2?2:4)
      elements[3].innerHTML = screen_height + "mm X " + (type==2?2:4)
      break;
    case "sc-19":
      elements = sc19_cut.querySelectorAll('span')
      elements[2].innerHTML = screen_width + "mm X " + (type==2?2:4)
      elements[3].innerHTML = screen_height + "mm X " + (type==2?2:4)
      break;
    case "sc-20":
      elements = sc19_cut.querySelectorAll('span')
      elements[2].innerHTML = screen_width + "mm X " + (type==2?2:4)
      elements = sc20_cut.querySelectorAll('span')
      elements[3].innerHTML = screen_height + "mm X " + (type==2?2:4)
      break;
    case "미설치":
      break;
  }
  
    
    /*다운로드 버튼 생성*/
const style = document.querySelector('style').innerHTML
const result_container = document.querySelector('.result-container').innerHTML
const cutting_container = document.querySelector('.cutting-container').innerHTML
const new_html = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <title>112mm slide window File</title>
    <style>${style}</style>
  </head>
  <body>
    <section class="order-container container">
      <h1 class="section-title">주문내용</h1>
      <ul class="order-list">
        <li class="type">타입(type): <span>${type}짝문</span></li>
        <li class="type">너비(wide): <span>${width}mm</span></li>
        <li class="type">높이(height): <span>${height}mm</span></li>
        <li class="type">색상(color): <span>${color}</span></li>
        <li class="type">유리두께(tickness): <span>${tickness}</span></li>
        <li class="type">망충망(screen) 설치: <span>${screen.checked?"설치":"미설치"}</span></li>
        <li class="type">빗물 홈: <span>${rain_hole.checked?"설치":"미설치"}</span></li>
      </ul>
    </section>
    <section class="result-container container">${result_container}</section>
    <section class="cutting-container container">${cutting_container}</section>
  </body>
  </html>
  `
const blob = new Blob([new_html], { type: 'text/html' })

// Blob 객체를 가리키는 URL 생성
const url = URL.createObjectURL(blob)
 
// 다운로드 링크 생성
const downloadLink = document.querySelector('.download')
downloadLink.href = url;
downloadLink.download = 'new-file.html';
  
})

