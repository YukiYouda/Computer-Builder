const config = {
  url: "https://api.recursionist.io/builder/computers?type=",
  addPCBtnID: "add-pc-btn",
}

// CPUのブランドの選択肢の生成
let cpuBrandSelect = document.getElementById("cpuBrand");
cpuBrandSelect.innerHTML = `<option selected>Select Brand</option>`;
let cpuBrand = [];

generateBrand("cpu", cpuBrand, cpuBrandSelect);

// CPUのモデルの選択肢の生成
let cpuModelSelect = document.getElementById("cpuModel");
let selectedCPUModelValue = cpuModelSelect.selectedOptions[0].textContent;
let selectedCPUBrandValue = cpuBrandSelect.selectedOptions[0].textContent;

document.getElementById("cpuBrand").addEventListener("change", function() {
  cpuModelSelect.innerHTML = `<option>Select Model</option>`;
  selectedCPUBrandValue = this.selectedOptions[0].textContent;

  generateModel("cpu", selectedCPUBrandValue, cpuModelSelect);
});

// CPUのベンチマークの取得
let cpuBenchmark = 0;

cpuModelSelect.addEventListener("change", async function() {
  const response = await fetch(config.url + "cpu");
  const data = await response.json();
  selectedCPUModelValue = this.selectedOptions[0].textContent;

  for(i = 0; i < data.length; i++){
    if(data[i].Model == selectedCPUModelValue){
      cpuBenchmark = data[i].Benchmark;
      break;
    }
  }
});

// GPUのブランドの選択肢の生成
let gpuBrandSelect = document.getElementById("gpuBrand");
gpuBrandSelect.innerHTML = `<option selected>Select Brand</option>`;
let gpuBrand = [];

generateBrand("gpu", gpuBrand, gpuBrandSelect);

// GPUのモデルの選択肢の生成
let gpuModelSelect = document.getElementById("gpuModel");
let selectedGPUBrandValue = gpuModelSelect.selectedOptions[0].textContent;

document.getElementById("gpuBrand").addEventListener("change", function() {
  gpuModelSelect.innerHTML = `<option selected>Select Model</option>`;
  selectedGPUBrandValue = this.selectedOptions[0].textContent;

  generateModel("gpu", selectedGPUBrandValue, gpuModelSelect);
});

// GPUのベンチマークの取得
let gpuBenchmark = 0;

gpuModelSelect.addEventListener("change", async function() {
  const response = await fetch(config.url + "gpu");
  const data = await response.json();
  selectedGPUModelValue = this.selectedOptions[0].textContent;

  for(i = 0; i < data.length; i++){
    if(data[i].Model == selectedGPUModelValue){
      gpuBenchmark = data[i].Benchmark;
      break;
    }
  }
});

// メモリのブランドの選択肢の生成
let memoryBrandSelect = document.getElementById("memoryBrand");
memoryBrandSelect.innerHTML = `<option selected>Select Brand</option>`;
let memoryBrand = [];

generateBrand("ram", memoryBrand, memoryBrandSelect);

// メモリのモデルの選択肢の生成
let memoryModelSelect = document.getElementById("memoryModel");
let numberOfMemorySelect = document.getElementById("memoryAmount");

document.getElementById("memoryBrand").addEventListener("change", function() {
  memoryModelSelect.innerHTML = `<option selected>Select Model</option>`;
  let selectedMemoryBrandValue = this.selectedOptions[0].textContent;
  let selectednumberOfMemory = numberOfMemorySelect.selectedOptions[0].textContent;

  fetch(config.url + "ram").then(response=>response.json()).then(function(data){
    for(i = 0; i < data.length; i++){
      let index = data[i].Model.lastIndexOf("x");
      let numberOfMemory = data[i].Model[index - 1];

      if(selectedMemoryBrandValue == data[i].Brand && selectednumberOfMemory == numberOfMemory){
        let newOption = document.createElement("option");
        newOption.textContent = data[i].Model;
        memoryModelSelect.appendChild(newOption);
      }
    }
  });
});

// メモリのベンチマークの取得
let memoryBenchmark = 0;

memoryModelSelect.addEventListener("change", async function() {
  const response = await fetch(config.url + "ram");
  const data = await response.json();
  let selectedMemoryModelValue = this.selectedOptions[0].textContent;

  for(i = 0; i < data.length; i++){
    if(data[i].Model == selectedMemoryModelValue){
      memoryBenchmark = data[i].Benchmark;
      break;
    }
  }
});

// ストレージのブランドの選択肢の生成
let storageBrandlSelect = document.getElementById("storageBrand");
let storageSizeSelect = document.getElementById("storageSize");


document.getElementById("storageType").addEventListener("change", function() {
  storageBrandlSelect.innerHTML = `<option selected>Select Brand</option>`;
  storageSizeSelect.innerHTML = `<option selected>Select Strorage</option>`;
  let selectedStorageTypeValue = this.selectedOptions[0].textContent;
  let storageBrand = [];
  let storageSize = [];

  if(selectedStorageTypeValue == "HDD"){
    fetch(config.url + "hdd").then(response=>response.json()).then(function(data){
      for(i = 0; i < data.length; i++){
        let tbMatch = data[i].Model.match(/\d+(?=TB)/);
        let gbMatch = data[i].Model.match(/\d+(?=GB)/);
        let storage = gbMatch ? gbMatch[0] + "GB" : tbMatch[0] + "TB";
        if(!storageSize.includes(storage)){
          storageSize.push(storage);
          let newOption = document.createElement("option");
          newOption.textContent = storage;
          storageSizeSelect.appendChild(newOption);
        }
        if(!storageBrand.includes(data[i].Brand)){
          storageBrand.push(data[i].Brand);
          let newOption = document.createElement("option");
          newOption.textContent = data[i].Brand;
          storageBrandlSelect.appendChild(newOption);
        }
      }
    });
  } else if(selectedStorageTypeValue == "SSD"){
    fetch(config.url + "ssd").then(response=>response.json()).then(function(data){
      for(i = 0; i < data.length; i++){
        let tbMatch = data[i].Model.match(/\d+(?=TB)/);
        let gbMatch = data[i].Model.match(/\d+(?=GB)/);
        let storage = gbMatch ? gbMatch[0] + "GB" : tbMatch[0] + "TB";
        if(!storageSize.includes(storage)){
          storageSize.push(storage);
          let newOption = document.createElement("option");
          newOption.textContent = storage;
          storageSizeSelect.appendChild(newOption);
        }
        if(!storageBrand.includes(data[i].Brand)){
          storageBrand.push(data[i].Brand);
          let newOption = document.createElement("option");
          newOption.textContent = data[i].Brand;
          storageBrandlSelect.appendChild(newOption);
        }
      }
    });
  }
});

// ストレージのモデルの選択肢の生成
let storageModelSelect = document.getElementById("storageModel");
let storageTypeSelect = document.getElementById("storageType");

document.getElementById("storageBrand").addEventListener("change", function() {
  storageModelSelect.innerHTML = `<option selected>Select Model</option>`;
  let selectedStorageBrandValue = this.selectedOptions[0].textContent;
  let selectedStorageTypeValue = storageTypeSelect.selectedOptions[0].textContent;
  let selectedStorageSizeValue = storageSizeSelect.selectedOptions[0].textContent;

  if(selectedStorageTypeValue == "HDD"){
    fetch(config.url + "hdd").then(response=>response.json()).then(function(data){
      for(i = 0; i < data.length; i++){
        let tbMatch = data[i].Model.match(/\d+(?=TB)/);
        let gbMatch = data[i].Model.match(/\d+(?=GB)/);
        let storage = gbMatch ? gbMatch[0] + "GB" : tbMatch[0] + "TB";
        if(selectedStorageBrandValue == data[i].Brand && selectedStorageSizeValue == storage){
          let newOption = document.createElement("option");
          newOption.textContent = data[i].Model;
          storageModelSelect.appendChild(newOption);
        }
      }
    });
  } else if(selectedStorageTypeValue == "SSD"){
    fetch(config.url + "ssd").then(response=>response.json()).then(function(data){
      for(i = 0; i < data.length; i++){
        let tbMatch = data[i].Model.match(/\d+(?=TB)/);
        let gbMatch = data[i].Model.match(/\d+(?=GB)/);
        let storage = gbMatch ? gbMatch[0] + "GB" : tbMatch[0] + "TB";
        if(selectedStorageBrandValue == data[i].Brand && selectedStorageSizeValue == storage){
          let newOption = document.createElement("option");
          newOption.textContent = data[i].Model;
          storageModelSelect.appendChild(newOption);
        }
      }
    });
  }
});

// ストレージのベンチマークの取得
let storageBenchmark = 0;

storageModelSelect.addEventListener("change", async function() {
  const response = storageTypeSelect.selectedOptions[0].textContent == "HDD" ? await fetch(config.url + "hdd") : await fetch(config.url + "ssd");

  const data = await response.json();
  let selectedStorageModelValue = this.selectedOptions[0].textContent;

  for(i = 0; i < data.length; i++){
    if(data[i].Model == selectedStorageModelValue){
      storageBenchmark = data[i].Benchmark;
      break;
    }
  }
});


// Add PCボタンを押下した際にベンチマークの計算を行う
let addPCBtn = document.getElementById(config.addPCBtnID);

addPCBtn.addEventListener("click", function() {
  let gamingBenchmark = 0;
  let workBenchmark = 0;
  let persentages = document.getElementById("percentages");

  gamingBenchmark = Math.floor(cpuBenchmark * 0.25 + gpuBenchmark * 0.6 + memoryBenchmark * 0.125 + storageBenchmark * 0.025);
  workBenchmark = Math.floor(cpuBenchmark * 0.6 + gpuBenchmark * 0.25 + memoryBenchmark * 0.1 + storageBenchmark * 0.05);

  console.log(cpuBenchmark);

  persentages.innerHTML = `Gaming : ${gamingBenchmark}% | Work : ${workBenchmark}%`;
});

// ブランドの選択肢を作成する関数
function generateBrand(parts, BrandArr, target){
  fetch(config.url + parts).then(response=>response.json()).then(function(data){
    for(i = 0; i < data.length; i++){
      if(!BrandArr.includes(data[i].Brand)){
        BrandArr.push(data[i].Brand);
        let newOption = document.createElement("option");
        newOption.textContent = data[i].Brand;
        target.appendChild(newOption);
      }
    }
  });
}

// モデルの選択肢を作成する関数
function generateModel(parts, selectedBrandValue, target){
  fetch(config.url + parts).then(response=>response.json()).then(function(data){
    for(i = 0; i < data.length; i++){
      if(selectedBrandValue == data[i].Brand){
        let newOption = document.createElement("option");
        newOption.textContent = data[i].Model;
        target.appendChild(newOption);
      }
    }
  });
}