let weight = parseFloat(prompt("Enter Weight In Kg"));
let height = parseFloat(prompt("Enter Height In Meter")); // 1.72
let BMI = weight / (height * height);
console.log(BMI);
if(BMI < 18.5){
    console.log('You are Under Weight');
}else if(BMI < 24.9){
    console.log('You are Healthy');
}else if(BMI < 29.9){
    console.log('You are Overweight');
}else{
    console.log('You are Obesity');
}


