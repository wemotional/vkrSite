// Инициализация кнопок и полей
let buttonSearch = document.getElementById("buttonSearch");
let minTempInput = document.getElementById("minTempInput");
let maxTempInput = document.getElementById("maxTempInput");            
let padInput = document.getElementById("padType");
let areaInput = document.getElementById("areaType");
let uvInput = document.getElementById("uvResist");
let pipelineLenghtInput = document.getElementById("pipelineLenght");
let pressureInput = document.getElementById("pressureInput");
let buttonCount = document.getElementById("buttonCount");
let output = document.getElementById("outputTable");
let outputHeader = document.getElementById("outputHeader");



// Инициализация внутренних переменных
let minTemp;
let maxTemp;
let pad;
let area;
let uv;
let pipeline;
let pressure;
let materials
let supportedMaterials = [];
let countedMaterials = [];






// Инициализация внутреннего справочника
class material {
    name
    min_temp
    max_temp
    supported_laying_types
    max_aggressive_level
    uv_resistant
    working_pressure_atm
    price_per_metr
    material
    note
    constructor (name, min_temp, max_temp, supported_laying_types, max_aggressive_level, uv_resistant, working_pressure_atm, price_per_metr, material, note){
        this.name = name;
        this.min_temp = min_temp;
        this.max_temp = max_temp;
        this.supported_laying_types = supported_laying_types;
        this.max_aggressive_level = max_aggressive_level;
        this.uv_resistant = uv_resistant;
        this.working_pressure_atm = working_pressure_atm;
        this.price_per_metr = price_per_metr;
        this.material = material;
        this.note = note;
    }
}

let material1 = new material("ВЧШГ (высокопрочный чугун с шаровидным графитом)", -20, 60, 2, 3, 1, 16, 320,"Высокопрочный чугун с шаровидным графитом, DN100–DN300", "Подходит для подземных и агрессивных условий, высокая прочность" );
let material2 = new material("ПНД (полиэтилен низкого давления)", -20, 40, 2, 2, 1, 10, 85, "Полиэтилен низкого давления, SDR 11, PN10", "Легкий и гибкий, хорош для неагрессивных и умеренных условий");
let material3 = new material("ПВХ (поливинилхлорид)", 0, 45, 2, 2, 0, 10, 90, "Поливинилхлорид, класс PN10", "Хорош для подземной прокладки, не рекомендуется на солнце");
let material4 = new material("Оцинкованная сталь", -30, 100, 1, 1, 1, 16, 270, "Трубы ВГП оцинкованные, диаметр 25–50 мм", "Прочная, устойчива к давлению, но подвержена коррозии в агрессивной среде");
let material5 = new material("Асбестоцемент", 0, 45, 2, 3, 0, 6, 110, "Асбестоцементные трубы ВТ6", "Хрупкий, используется в подземной прокладке без давления");
let material6 = new material("Полипропилен (PP-R)", -10, 95, 3, 1, 0, 10, 100, "Полипропиленовые трубы PN10, PN20", "Подходит только для внутренних систем; для уличной прокладки не применяется");
//let test = new material("test", -20, 60, 2, 3, 1, 16, 320,"Высокопрочный чугун с шаровидным графитом, DN100–DN300", "Подходит для подземных и агрессивных условий, высокая прочность" )
materials = [material1, material2, material3, material4, material5, material6];



// Реализация считывания данных с полей
minTempInput.addEventListener('input', function(){
    minTemp = parseInt(minTempInput.value);
    //console.log(minTemp);
});
maxTempInput.addEventListener('input', function() {
    maxTemp = parseInt(maxTempInput.value);
    //console.log(maxTemp);
});
padInput.addEventListener('input', function(){
    pad = parseInt(padInput.value);
    //console.log(pad);
});
areaInput.addEventListener('input', function(){
    area = parseInt(areaInput.value);
    //console.log(area);
});
uvInput.addEventListener('input', function(){
    uv = parseInt(uvInput.value);
    //console.log(uv);
});
pipelineLenghtInput.addEventListener('input', function(){
    pipeline = parseInt(pipelineLenghtInput.value);
    console.log(pipeline);
});
pressureInput.addEventListener('input', function(){
    pressure = parseInt(pressureInput.value);
    //console.log(pressure);
})




// Инициализация алгоритмов работы кнопок (проверка на вход данных + алгоритм подбора)
buttonSearch.addEventListener('click', function(){
    output.innerHTML = "";
    outputHeader.innerHTML = " ";
    let strError = "";
    if (minTemp == undefined) {
        strError += "Пожалуйста, введите минимальную температуру!";
        strError += '\n';
    }
    if (maxTemp == undefined) {
        strError += "Пожалуйста, введите максимальную температуру!";
        strError += '\n';
    }
    if (pad == undefined) {
        strError += "Пожалуйста, выберите тип прокладки!";
        strError += '\n';
    }
    if (area == undefined) {
        strError += "Пожалуйста, выберите тип среды!";
        strError += '\n';
    }
    if (uv == undefined) {
       strError += "Пожалуйста, выберите тип воздействия УФ!";
        strError += '\n';
    }
    if (pressure == undefined) {
        strError += "Пожалуйста, введите давление!";
        strError += '\n';
    } else if (pressure < 0) {
        strError += "Давление не может быть отрицательным!"
    }
    if (maxTemp < minTemp) {
        strError += "Максимальная температура не может быть выше минимальной!"
    }
    if (strError === ""){

    } else {
        alert(strError);
    }
    if(supportedMaterials.length > 0) {
        supportedMaterials = [];
    }
    if (strError === ""){
        for (let i = 0; i < materials.length; i++){
            var check = true;
            if (materials[i].min_temp > minTemp) check = false;
            if (materials[i].max_temp < maxTemp) check = false;
            if (materials[i].max_aggressive_level != area) check = false;
            if (materials[i].supported_laying_types != pad) check = false;
            if (materials[i].uv_resistant != uv) check = false;
            if (materials[i].working_pressure_atm < pressure) check = false;
            if (check === true){
                supportedMaterials.push(materials[i]);
                if (supportedMaterials.length - countedMaterials.length === 1){
                    countedMaterials.push(materials[i].price_per_metr);
                }
            }
        }
        if (supportedMaterials.length > 0){
            outputHeader.innerHTML = "Подходящие материалы:";
            let tableTitle = document.createElement("tr");
            let table = document.getElementById("outputTable");
            table.appendChild(tableTitle);
            let firstTableTitle = document.createElement("td");
            firstTableTitle.textContent = "Название";
            let secondTableTitle = document.createElement("td");
            secondTableTitle.textContent = "Примечение";
            let thirdTableTitle = document.createElement("td");
            thirdTableTitle.textContent = "Предлагаемый вид материала";
            
            let firstTableRow = table.lastChild;
            firstTableRow.appendChild(firstTableTitle);
            firstTableRow.appendChild(secondTableTitle);
            firstTableRow.appendChild(thirdTableTitle);
            for (let i = 0; i < supportedMaterials.length; i++){
                let tableRow = document.createElement("tr");
                table.appendChild(tableRow);
                let cells = table.lastChild;
                let cell1 = document.createElement("td");
                let cell2 = document.createElement("td");
                let cell3 = document.createElement("td");
                cell1.textContent = supportedMaterials[i].name;
                cell2.textContent = supportedMaterials[i].note;
                cell3.textContent = supportedMaterials[i].material;
                cells.appendChild(cell1);
                cells.appendChild(cell2);
                cells.appendChild(cell3);
            }
        } else {
            outputHeader.innerHTML = "Нет подходящих материалов!";
        }
    }
});


buttonCount.addEventListener("click", function(){
    let check = true
    if (pipeline == undefined) {
        check = false;
        alert("Пожалуйста, введите длину трубопровода!");
    }
    if (check && countedMaterials.length > 0){
        let cell5 = document.createElement("td");
        let rows = output.firstChild;
        cell5.textContent = "Цена";
        rows.append(cell5);
        for (let i = 0, j = 1; i < countedMaterials.length; i++, j++){
            let cell4 = document.createElement("td");
            cell4.textContent = pipeline * countedMaterials[i];
            rows = output.childNodes[j];
            rows.append(cell4);
        }
        countedMaterials = [];
    }
})