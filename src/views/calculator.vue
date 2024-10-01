<template>
 


<!-- Header -->
<header>
    <nav class="navbar fixed-top navbar-expand-lg navbar-dark " style="background-color:  #6abf69;">
    <div class="container-fluid">
      <router-link to="/"  class="navbar-brand" >台東減碳x慢食遊</router-link>
    
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link "  href="carbon_info.html">減碳資訊及平台介紹</a>
          </li>
          
          <li class="nav-item">
            <router-link to="/calculator"  class="nav-link active" aria-current="page">碳排計算機</router-link>
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
<div class="top">
<h1>碳排計算機</h1>
<p>計算您餐點的碳排放量，助力環保</p>
</div>
<!-- Main Content -->
<main>
  <!-- 食材選擇區 食材類 -->
  <section class="ingredient-selection">
    <h2>食材類
      <small style="font-size: 0.4em; color: gray; margin-left: 4px;">(按 + 可新增)</small>
    </h2>
    <div class="ingredient-row" v-for="(ingredient, index) in ingredientsForFood" :key="index">
      <select class="ingredient-category" v-model="ingredient.category" @change="fetchItems(index, 'food')">
        <option value="">選擇種類</option>
        <option v-for="category in categories.filter(category => category.category_type === 2)" :key="category.category_id" :value="category.category_id">
          {{ category.category_name }}
        </option>
      </select>
      <select class="ingredient-name" v-model="ingredient.name" @change="updateCarbonEmission(index, 'food')">
        <option value="">選擇名稱</option>
        <option v-for="item in ingredient.items" :key="item.item_id" :value="item.item_id">
          {{ item.item_name }}
        </option>
      </select>
      <input type="number" class="ingredient-weight" v-model.number="ingredient.weight" @input="updateCarbonEmission(index, 'food')" :placeholder="ingredient.unit || '請輸入數值'">
      <button class="add-row" @click="addRow('food')">+</button>
    </div>
  </section>
</main>

<main>
  <!-- 食材選擇區 能源類 --><!--測試用能源資料 預計於拍攝後改善新版能源'資料-->
  <section class="ingredient-selection">
    <h2>能源類</h2>
    <div class="ingredient-row" v-for="(ingredient, index) in ingredientsForEnergy" :key="index">
      <select class="ingredient-category" v-model="ingredient.category" @change="fetchItems(index, 'energy')">
        <option value="">選擇種類</option>
        <option v-for="category in categories.filter(category => category.category_type === 3)" :key="category.category_id" :value="category.category_id">
          {{ category.category_name }}
        </option>
      </select>
      <select class="ingredient-name" v-model="ingredient.name" @change="updateCarbonEmission(index, 'energy')">
        <option value="">選擇名稱</option>
        <option v-for="item in ingredient.items" :key="item.item_id" :value="item.item_id">
          {{ item.item_name }}
        </option>
      </select>
      <input type="number" class="ingredient-weight" v-model.number="ingredient.weight" @input="updateCarbonEmission(index, 'energy')" :placeholder="ingredient.unit || '請輸入數值'">
      <button class="add-row" @click="addRow('energy')">+</button>
    </div>
  </section>
</main>

<main>
  <!-- 食材選擇區 運輸類 -->
  <section class="ingredient-selection">
    <h2>運輸類</h2>
    <div class="ingredient-row" v-for="(ingredient, index) in ingredientsForTransport" :key="index">
      <select class="ingredient-category" v-model="ingredient.category" @change="fetchItems(index, 'transport')">
        <option value="">選擇種類</option>
        <option v-for="category in categories.filter(category => category.category_type === 1)" :key="category.category_id" :value="category.category_id">
          {{ category.category_name }}
        </option>
      </select>
      <select class="ingredient-name" v-model="ingredient.name" @change="updateCarbonEmission(index, 'transport')">
        <option value="">選擇名稱</option>
        <option v-for="item in ingredient.items" :key="item.item_id" :value="item.item_id">
          {{ item.item_name }}
        </option>
      </select>
      <input type="number" class="ingredient-weight" v-model.number="ingredient.weight" @input="updateCarbonEmission(index, 'transport')" :placeholder="ingredient.unit || '請輸入數值'">
      <button class="add-row" @click="addRow('transport')">+</button>
    </div>
  </section>
</main>


<main>
  <!-- 計算按鈕 -->
  <div class="button-group">
    <button class="reset-button" @click="resetCalculator">重新計算</button>

    <button class="calculate-button" @click="calculateEmissions">計算碳排放</button>
    
  </div>

  <!-- 結果顯示區 -->
  <section class="results">
    <h2>總碳排放量</h2>
    <p id="total-emission">{{ totalEmission.toFixed(2) }} kg CO₂e</p>
    <div class="comparison">
      <p><span id="trees-saved">{{ treesSaved }}</span> 棵樹木一個月的吸收量</p>
    </div>

    <!-- 圖表 -->
    <div class="chart-container-wrapper">
      <div class="Chart-container">
        <canvas v-if="totalEmission > 0" id="emissionChart"></canvas>
      </div>
    </div>

    <!-- 詳細資料 -->
    <div>
      <button v-if="totalEmission > 0" type="button" class="btn btn-dark details-btn" data-bs-toggle="modal" data-bs-target="#detailsModal">
        詳細資料
      </button>
    </div>
  </section>

  <!-- 模態窗口 -->
  <div class="modal fade" id="detailsModal" tabindex="-1" aria-labelledby="detailsModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailsModalLabel">計算詳細資料</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <!-- 單個表格包含所有數據 -->
          <table class="table">
            <thead>
              <tr>
                <th scope="col">名稱</th>
                <th scope="col">重量/距離</th>
                <th scope="col">碳排放量(kg CO₂e)</th>
                <th scope="col">資料來源</th>
                <th scope="col">資料分級 <i class="bi bi-info-circle" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#infoModal"></i></th>
              </tr>
            </thead>
            <tbody>
              <!-- 食材類 -->
              <tr>
                <td colspan="5"><strong>食材類</strong></td>
              </tr>
              <tr v-for="item in foodData" :key="item.item_name">
                <td>{{ item.item_name }}</td>
                <td>{{ item.input_value }}</td>
                <td>{{ item.carbon_emission.toFixed(4) }}</td>
                <td>{{ item.source }}</td>
                <td>{{ item.level }}</td>
              </tr>
              
              <!-- 能源類 -->
              <tr>
                <td colspan="5"><strong>能源類</strong></td>
              </tr>
              <tr v-for="item in energyData" :key="item.item_name">
                <td>{{ item.item_name }}</td>
                <td>{{ item.input_value }}</td>
                <td>{{ item.carbon_emission.toFixed(4) }}</td>
                <td>{{ item.source }}</td>
                <td>{{ item.level }}</td>
              </tr>

              <!-- 運輸類 -->
              <tr>
                <td colspan="5"><strong>運輸類</strong></td>
              </tr>
              <tr v-for="item in transportData" :key="item.item_name">
                <td>{{ item.item_name }}</td>
                <td>{{ item.input_value }}</td>
                <td>{{ item.carbon_emission.toFixed(4) }}</td>
                <td>{{ item.source }}</td>
                <td>{{ item.level }}</td>
              </tr>
            </tbody>
          </table>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>

  <!-- 資料分級模態窗口 -->
  <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="infoModalLabel">資料來源分級說明</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img src="@/assets/img/data_source.jpg" alt="資料來源分級說明" class="img-fluid">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>
</main>



</template>

<script>
import { ref, nextTick, computed } from 'vue';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';



Chart.register(...registerables);

export default {
  name: 'AboutPage',
setup() {
const categories = ref([]);
const energyCategoryId = '7';  
const transportCategoryId = '1';  

const ingredientsForFood = ref([
  { category: '', name: '', weight: '', items: [], carbon_emission: 0 }
]);
const ingredientsForEnergy = ref([
  { category: energyCategoryId , name: '', weight: '', items: [], carbon_emission: 0 }
]);
const ingredientsForTransport = ref([
  { category: transportCategoryId , name: '', weight: '', items: [], carbon_emission: 0 }
]);
const totalEmission = ref(0.00);
const carTravel = ref(0);
const treesSaved = ref(0);
const chartInstance = ref(null);// Chart.js

const fetchCategories = () => {
  axios.get('http://localhost:3001/api/categories')
    .then(response => {
      categories.value = response.data;

      // 設置能源類的預選項
      const energyCategory = categories.value.find(cat => cat.category_name === '烹煮能源類');
      if (energyCategory) {
        ingredientsForEnergy.value[0].category = energyCategory.category_id;
        fetchItems(0, 'energy'); // 請求該類別的項目
      }

      // 設置運輸類的預選項
      const transportCategory = categories.value.find(cat => cat.category_name === '運輸類');
      if (transportCategory) {
        ingredientsForTransport.value[0].category = transportCategory.category_id;
        fetchItems(0, 'transport'); // 請求該類別的項目
      }
    })
    .catch(error => {
      console.error('There was an error fetching categories!', error);
    });
};



const fetchItems = (index, type) => {
  let ingredientsArray;
  if (type === 'food') {
    ingredientsArray = ingredientsForFood;
  } else if (type === 'energy') {
    ingredientsArray = ingredientsForEnergy;
  } else if (type === 'transport') {
    ingredientsArray = ingredientsForTransport;
  }

  const category_id = ingredientsArray.value[index].category;
  if (category_id) {
    axios.get(`http://localhost:3001/api/items/${category_id}`)
      .then(response => {
        ingredientsArray.value[index].items = response.data;
        ingredientsArray.value[index].name = ''; // 重製食材
      })
      .catch(error => {
        console.error('There was an error fetching items!', error);
      });
  }
};

fetchCategories(); // 在頁面加載時調用

const updateCarbonEmission = (index, type) => {
  let ingredientsArray;
  if (type === 'food') {
    ingredientsArray = ingredientsForFood;
  } else if (type === 'energy') {
    ingredientsArray = ingredientsForEnergy;
  } else if (type === 'transport') {
    ingredientsArray = ingredientsForTransport;
  }

  const ingredient = ingredientsArray.value[index];
  if (ingredient.weight < 0) {
    alert('重量不可為負值！');
    ingredient.weight = 0;
  }
  const selectedItem = ingredient.items.find(item => item.item_id === ingredient.name);
  if (selectedItem) {
    ingredient.carbon_emission = selectedItem.carbon_emission * ingredient.weight;
    ingredient.unit = selectedItem.unit || '';
  } else {
    ingredient.carbon_emission = 0;
    ingredient.unit = '';
  }
};

const addRow = (type) => {
  let newIngredient=null;
  if (type === 'food') {
    newIngredient = { category: '', name: '', weight: '', items: [], carbon_emission: 0 };
    ingredientsForFood.value.push(newIngredient);
    fetchItems(ingredientsForFood.value.length - 1, 'food');
  } else if (type === 'energy') {
    newIngredient = { category: '7', name: '', weight: '', items: [], carbon_emission: 0 };
    ingredientsForEnergy.value.push(newIngredient);
    fetchItems(ingredientsForEnergy.value.length - 1, 'energy');
  } else if (type === 'transport') {
    newIngredient = { category: '1', name: '', weight: '', items: [], carbon_emission: 0 }; 
    ingredientsForTransport.value.push(newIngredient);
    fetchItems(ingredientsForTransport.value.length - 1, 'transport');
  }
};

const detailedData = ref([]);
const foodData = computed(() => detailedData.value.filter(item => item.category === '食材類'));
const energyData = computed(() => detailedData.value.filter(item => item.category === '能源類'));
const transportData = computed(() => detailedData.value.filter(item => item.category === '運輸類'));

const calculateEmissions = () => {
  const foodEmission = ingredientsForFood.value.reduce((total, ingredient) => total + ingredient.carbon_emission, 0);
  const energyEmission = ingredientsForEnergy.value.reduce((total, ingredient) => total + ingredient.carbon_emission, 0);
  const transportEmission = ingredientsForTransport.value.reduce((total, ingredient) => total + ingredient.carbon_emission, 0);

  totalEmission.value = foodEmission + energyEmission + transportEmission;
  carTravel.value = totalEmission.value * 5; // 假設1kg CO2等於行駛5公里
  treesSaved.value = (totalEmission.value / 0.625).toFixed(1); // 假設1kg CO2等於10棵樹一個月的吸收量

detailedData.value = [
  ...ingredientsForFood.value.map(ingredient => ({
    category: '食材類',
    item_name: ingredient.items.find(item => item.item_id === ingredient.name)?.item_name || '',
    input_value: ingredient.weight,
    carbon_emission: ingredient.carbon_emission,
    source: ingredient.items.find(item => item.item_id === ingredient.name)?.source || '未知來源',
    level: ingredient.items.find(item => item.item_id === ingredient.name)?.level || '未知'
  })),
  ...ingredientsForEnergy.value.map(ingredient => ({
    category: '能源類',
    item_name: ingredient.items.find(item => item.item_id === ingredient.name)?.item_name || '',
    input_value: ingredient.weight,
    carbon_emission: ingredient.carbon_emission,
    source: ingredient.items.find(item => item.item_id === ingredient.name)?.source || '未知來源',
    level: ingredient.items.find(item => item.item_id === ingredient.name)?.level || '未知'
  })),
  ...ingredientsForTransport.value.map(ingredient => ({
    category: '運輸類',
    item_name: ingredient.items.find(item => item.item_id === ingredient.name)?.item_name || '',
    input_value: ingredient.weight,
    carbon_emission: ingredient.carbon_emission,
    source: ingredient.items.find(item => item.item_id === ingredient.name)?.source || '未知來源',
    level: ingredient.items.find(item => item.item_id === ingredient.name)?.level || '未知'
  }))
];

  // 只有當有碳排放量時才更新圖表並顯示
  if (totalEmission.value > 0) {
    nextTick(() => {
    updateChart(foodEmission, energyEmission, transportEmission);
  });
}
};

const updateChart = (foodEmission, energyEmission, transportEmission) => {
  const ctx = document.getElementById('emissionChart')?.getContext('2d');

  if (!ctx) {
    console.error("Canvas element not found");
    return;
  }

  if (chartInstance.value) {
    chartInstance.value.destroy(); // 如果圖表存在，就刪除
  }

  chartInstance.value = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['食材類', '能源類', '運輸類'],
      datasets: [{
        label: '碳排放比例',
        data: [
          foodEmission / totalEmission.value * 100,
          energyEmission / totalEmission.value * 100,
          transportEmission / totalEmission.value * 100,
        ],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.raw.toFixed(2) + '%';
            }
          }
        }
      }
    }
  });
};  

const resetCalculator = () => {
  ingredientsForFood.value = [{ category: '', name: '', weight: '', items: [], carbon_emission: 0 }];
  ingredientsForEnergy.value = [{ category: '7', name: '', weight: '', items: [], carbon_emission: 0 }];
  fetchItems(0, 'energy');
  ingredientsForTransport.value = [{ category: '1', name: '', weight: '', items: [], carbon_emission: 0 }];
  fetchItems(0, 'transport');
  totalEmission.value = 0.00;
  carTravel.value = 0;
  treesSaved.value = 0;

  if (chartInstance.value) {
    chartInstance.value.destroy(); // 重置時刪除圖表
  }
};

fetchCategories(); // 初始化時分類數據

return {
  categories,
  ingredientsForFood,
  ingredientsForEnergy,
  ingredientsForTransport,
  totalEmission,
  carTravel,
  treesSaved,
  fetchItems,
  updateCarbonEmission,
  addRow,
  calculateEmissions,
  resetCalculator,
  detailedData,
  foodData,
  energyData,
  transportData
};
},
mounted() {
const ctx = document.getElementById('emissionChart');
if (ctx) {
  ctx.height = 400; // 圖表高度
}

}
};


  </script>

  