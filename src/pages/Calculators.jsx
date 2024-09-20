export const InchToCm = (inches) => inches * 2.54;
export const LbsToKg = (lbs) => lbs / 2.2;


// normal = 0.8
// enduranceAthl = 1.3
// vegetarian = 1.4
// vegan = 1.7
// strengthTrain = 1.6

export const ProteinReq = (fitnessLevel, weight) => Math.floor(fitnessLevel * LbsToKg(weight));  // kg


export const FluidReq = (age, weight) => {   // kg
    let fluid = 1500;
    const newWeight = weight - 20;

    if (weight<20){
        return '1500mL';
    }

    if (age>50){//  15ml/kg
        fluid += newWeight * 15;   //  15ml/kg + 1500ml
        return `${Math.floor(fluid)/1000}L`;
    } else { // if less than 50yr 20ml/kg +1500ml
        fluid += newWeight * 20;
        return `${Math.floor(fluid)/1000}L`;
    }
};

export const BMI = (height, weight) => (LbsToKg(weight) / Math.pow((InchToCm(height) / 100), 2)).toFixed(2); // cm & kg

export const KcalPerKg = (fitnessLevel, weight) => Math.floor(fitnessLevel * (weight/2.2)); // kg

//ideal bodyweight +/- 10%
export const idealBW = (height) => {
    const newHeight = height - 60;
    let idealWeight = 106;

    if (newHeight < 0){
        return idealWeight;
    } else {
        idealWeight += newHeight * 6;
        const lowerWeight = Math.floor(idealWeight * 0.90);
        const upperWeight = Math.floor(idealWeight * 1.10);

        return [lowerWeight, idealWeight, upperWeight];
    }
}  

export const hwagaMSJkcal = (height, weight, age, gender, activityLevel) => {
    const kg = LbsToKg(weight);
    const cm = InchToCm(height);
    let PAL = 1.3;

    if (activityLevel === '0.80'){
        PAL = 1.3
    } else if (activityLevel === '1.40') {
        PAL = 1.9
    } else if (activityLevel === '1.70') {
        PAL = 1.6
    }
    /////////////////////////
    if (gender === 'Male'){
        return Math.floor((9.99 * kg + 6.25 * cm - 4.92 * age + 5) * PAL);
    } else {
        return Math.floor((9.99 * kg + 6.25 * cm - 4.92 * age - 161) * PAL);
    }
}
