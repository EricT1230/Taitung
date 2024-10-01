<template>
  
  <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Home</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC:wght@300;400;700&display=swap" rel="stylesheet">  
 
    
</head>

<div id="app">
  <router-view ></router-view>
  <div v-if="showHeaderFooter">
  
  
    <header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark " style="background-color:  #6abf69;">
    <div class="container-fluid">
      <a href="#" class="navbar-brand" >台東減碳x慢食遊</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link "  href="carbon_info.html">減碳資訊及平台介紹</a>
          </li>
          
          <li class="nav-item">
            <router-link to="/calculator"  class="nav-link" >碳排計算機</router-link>
          </li>
          
        
          <li class="nav-item">
            <a class="nav-link "   href="slowfood_info.html">慢食趣</a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link " href="restaurent_info.html">餐廳介紹</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>
    </header> 
   
      
  <a href="./carbon_info.html">
    <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="./assets/img/index_2.jpg"  class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="./assets/img/index_3.jpg"  class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="./assets/img/index_1.jpg"  class="d-block w-100" alt="...">
      </div>
      <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
    </div>
    <div class="carousel-caption d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle w-100">
      <h3 class="text-center">減碳資訊</h3>
    </div>
    </div>
  </a>
  <router-link to="/calculator" target="_blank">
      <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="./assets/img/index_1.jpg"  class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="./assets/img/index_3.jpg"  class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="./assets/img/index_2.jpg"  class="d-block w-100" alt="...">
          </div>
          <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
        </div>
        <div class="carousel-caption d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle w-100">
          <h3 class="text-center">碳排計算機</h3>
        </div>
      </div>
    </router-link>
    
      <a href="./slowfood_info.html">
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="./assets/img/index_3.jpg"  class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="./assets/img/index_2.jpg"  class="d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
              <img src="./assets/img/index_1.jpg"  class="d-block w-100" alt="...">
            </div>
            <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
          </div>
          <div class="carousel-caption d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle w-100">
            <h3 class="text-center">慢食趣</h3>
          </div>
        </div>
        </a>

       
          <a href="./restaurent_info.html">
            <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src="./assets/img/index_2.jpg"  class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="./assets/img/index_3.jpg"  class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                  <img src="./assets/img/index_1.jpg"  class="d-block w-100" alt="...">
                </div>
                <div class="overlay position-absolute top-0 start-0 w-100 h-100"></div>
              </div>
              <div class="carousel-caption d-flex align-items-center justify-content-center position-absolute top-50 start-50 translate-middle w-100">
                <h3 class="text-center">餐廳資訊</h3>
              </div>
            </div>
            </a>
          </div>
    

<!-- Footer -->
<footer class="custom-footer">
  <div class="container">
    <div class="row">
      <!-- Mobile view: stacked layout with centered text and small logo in the bottom-right corner -->
      <div class="d-md-none text-center position-relative">
        <div class="mb-3">
          <img src="./assets/img/logo1.png" alt="First Logo" class="footer-logo">
        </div>
        <div class="mb-3 footer-text-container"> <!-- Added padding-bottom to ensure space for the logo -->
          <p class="footer-text text-center">
            &copy; 113數位發展部公民科技試驗場域開發案 <br>
            Developed by 減碳慢食小餐館
          </p>
        </div>
        <div class="small-logo">
          <img src="./assets/img/logo2.png" alt="MODA Logo" class="footer-logo">
        </div>
      </div>

      <!-- Desktop view: side-by-side layout -->
      <div class="d-none d-md-flex col-md-6 text-md-start text-center logo-container">
        <div>
          <img src="./assets/img/logo1.png" alt="First Logo" class="footer-logo">
        </div>
        <div>
          <p class="footer-text">
            &copy; 113數位發展部公民科技試驗場域開發案 <br>
            Developed by 減碳慢食小餐館
          </p>
        </div>
      </div>
      <div class="d-none d-md-flex col-md-6 text-md-end text-center logo-container">
        <div style="margin-left: auto;">
          <img src="./assets/img/logo2.png" alt="MODA Logo" class="footer-logo">
        </div>
      </div>
    </div>
  </div>
</footer>
</div>






</html>



</template>
<style>
#app {
  position: relative;
  z-index: 10; /* 確保主內容顯示在 .overlay 之上 */
}
</style>

<script>
//import router from './router';

export default {
  name: 'App',// methods 不再需要，因為已經使用了 router-link 來處理導航
  data() {
    return {
      showHeaderFooter: true,
    };
  },
  watch: {
    // 動態控制 header 和 footer 顯示
    $route(to) {
      if (to.path ==='/calculator') {
        this.showHeaderFooter = false; 
      } else {
        this.showHeaderFooter = true;  
      }
    },
  },
}
</script>

<style>
button {
  margin-right: 10px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}
</style>

<style scoped>
/* 導覽樣式設置 */
nav {
  display: flex;
  justify-content: space-around;
  background-color: #6abf69;
  padding: 1rem;
}

router-link {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

/* 調整全局視圖區域，使每個頁面內容占據整個畫面 */
#app {
  width: 100%;
  height: 100vh; /* 確保主容器佔據整個視口 */
  display: flex;
  flex-direction: column;
}
</style>
