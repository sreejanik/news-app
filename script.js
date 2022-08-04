let newsAPI = "http://api.mediastack.com/v1/news?countries=us,in&access_key=2720e6ca9665e312e3205f"
let dummyImage="dummy-image.jpg";

let app = document.querySelector(".app");
let screen = {
  main:app.querySelector("main-screen"),
  news:app.querySelector("news-screen")
};

let categories = ["General","Business","Technology","Entertainment","Health","Science","Sports"];

for(let i=0;i<categories.length;i++){
  let div = document.createElement("div");
  div.innertext = categories[i];
  div.addEventListener("click",function(){
    screen.main.querySelector(".categories .active").classlist.remove("active");
    div.classlist.add("active");
    fetchCategoryNews(categories[i]);
  });
  if(i==0){
    div.classlist.add("active");
    fetchCategoryNews(categories[i]);
  }
  screen.main.querySelector(".categories").appendChild(div);
}

async function fetchCategoryNews(category){
  screen.main.querySelector(".news-list").innerHTML ="";
  try {
    let res = await fetch(newsAPI + category.tolowerCase());
    let data = await res.json();
    let news = data.data;
    
    for(let i=0;i<news.length;i++){
      let div = document.createElement("div");
      div.classlist.add("item");
      div.addEventListener("click",function(){
        showFULLNEWS(news[i]);
      });
      div.innerHTML =
        <div class ="thumbnail">
          <img src="${news[i].image || dummyImage}">
        </div>
        <div class="details">
        <h2>${news[i].title}</h2>
        <p>${news[i].descriptiom}</p>
      </div>
      ;
     screen.main.querySelector(".news-list").appendchild(div);
    }
  } catch(msg){}

  
  function showFullNews(news){
    screen.main.classlist.add("hidden");
    screen.news.classlist.remove("hidden");
    
     screen.news.querySelector(".header .title").innertext = news.title;
    screen.news.querySelector(".header .back-btn").addEventListener("click",function(){
      screen.main.classlist.add("hidden");
      screen.main.classlist.remove("hidden");
    });
    screen.news.querySelector("#news-frame").src = news.url;
  }
                
