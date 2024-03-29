import './SuitableCrops.css';
import React, { useEffect, useState } from 'react';
import {Container} from "@mui/material";


let lowerPHLimit;
let upperPHLimit;
let lowerTempLimit;
let upperTempLimit;
let lowerHumidityLimit;
let upperHumidityLimit;
let LowerLightLimit;
let upperLightLimit;
let costAndMaintainance;
let cropYield;
let growthTime;
let name;
let cropScore
let imageURL

const Crop =
    (name,
     lowerPHLimit,
     upperPHLimit,
     lowerTempLimit,
     upperTempLimit,
     lowerHumidityLimit,
     upperHumidityLimit,
     lowerLightLimit,
     upperLightLimit,
     costAndMaintainance,
     cropYield,
     growthTime,
     cropScore,
     imageURL) => { return { name: name, lowerPHLimit: lowerPHLimit, upperPHLimit: upperPHLimit, lowerTempLimit: lowerTempLimit,
        upperTempLimit:upperTempLimit, lowerHumidityLimit: lowerHumidityLimit, upperHumidityLimit:upperHumidityLimit,
        lowerLightLimit: lowerLightLimit, upperLightLimit: upperLightLimit, costAndMaintainance: costAndMaintainance, cropYield: cropYield,
        growthTime: growthTime, cropScore: cropScore, imageURL: imageURL
    }}

const wheat = Crop('Wheat','6','6.8','20','30','40',
    '60','35','65','100','450','45','1', 'Wheat.jpeg');

const rice = Crop('Rice', '6', '6.7', '20', '27', '45',
    '75','50','70', '50', '250', '30','1', 'Rice.jpeg')

const corn = Crop('Corn', '5.5', '7', '26', '30', '50',
    '80', '35', '85','75','400','90', '1', 'Corn.jpeg')

const barley = Crop('Barley','6.5','7','14','20','30',
    '60','20','50','150','500','60', '1','Barley.jpeg')

const oats = Crop('Oats','6.2','6.6','15','25','25',
    '75','10','40','80','300','30','1','Oats.jpeg')

const straw = Crop('Straw','5.8','6.3','18','24','35',
    '64','20','60','50','250','28','1','#')

const sugarBeat = Crop('Sugar Beat','4.7','7.2','15','22','30',
    '50','25','55','70','280','35','1','#')

const oilseed = Crop('Oil Seed','5.0','7.8','20','26','28',
    '68','30','100','85','320','25','1','#')

const peas = Crop('Peas','3.6','5.0','15','20','15',
    '60','25','60','110','370','35','1','#')

const fieldBeans = Crop('Field Beans','6.7','9.7','20','32','15',
    '80','15','80','100','445','40','1','#')

const vegetables = Crop('Vegetables','3','7.5','18','25','20',
    '55','35','65','75','350','35','1','#')

const fruits = Crop('Fruits','4.8','7.8','15','30','30',
    '70','20','65','60','300','55','1','#')

const potatoes = Crop('Potatoes','3.6','6.6','9','29','28',
    '68','20','80','80','360','42','1','#')

const rye = Crop('Rye','2.8','4.2','10','27','18',
    '48','15','55','65','265','28','1','#')

const millet = Crop('Millet','2.3','7.3','13','28','45',
    '85','35','95','85','370','35','1','#')

const cropArray= [wheat, rice, corn, barley, oats, straw, sugarBeat, oilseed, peas, fieldBeans, vegetables, fruits, potatoes, rye, millet];
let bestCropArray = cropArray;


function GetBestCrops(moisture, ph, sunlight, temperature){
    
    ScoreCrops(moisture,ph,sunlight,temperature);
    
    bestCropArray.sort((a,b) => b.cropScore - a.cropScore);

    for (let i = 0; i < bestCropArray.length; i++) {
        console.log(bestCropArray[i].cropScore, bestCropArray[i].name);
    }
    
    return bestCropArray;
}

function ScoreCrops(moisture, ph, sunlight, temperature){
    console.log("click");
    console.log("moisture = " + moisture + ", PH = " + ph + ", sunlight = " + sunlight + ", Temp = "  +temperature) 
    for (let i = 0; i < cropArray.length; i++) {
        let score = 0;
        if ((moisture >= cropArray[i].lowerHumidityLimit) && (moisture <= cropArray[i].upperHumidityLimit)) {
            score ++
            console.log(cropArray[i].name + " humid score")
        }
        if ((ph >= cropArray[i].lowerPHLimit) && (moisture <= cropArray[i].upperPHLimit)) {
            score ++
            console.log(cropArray[i].name + " ph score")
        }
        if ((sunlight >= cropArray[i].lowerLightLimit) && (moisture <= cropArray[i].upperLightLimit)) {
            score ++
            console.log(cropArray[i].name + " light score")
        }
        if ((temperature >= cropArray[i].lowerTempLimit) && (temperature <= cropArray[i].upperTempLimit)) {
            score ++
            console.log(cropArray[i].name + " temp score")
        }
        cropArray[i].cropScore = score;
    }
}

function GetRankExtension(key){
    let extension;
    
    switch (key){
        case 0:
            extension = "st"
            break;
        case 1:
            extension = "nd"
            break;
        case 2:
            extension = "rd"
            break;
        default:
            extension = "th"
            break;
    }
    return extension
}

function CreatePopup(){
    return(       
        <>
             <div className={"test"}>
                 <p>The value shown is the maintainance cost for the crop</p>
            </div>
        </>
    )
}

function GetOpacity(key){
    let test;
    
    test = 1 - ((key*100)/25)/50;
    console.log("opacity test" + test);
    if(test > .2) {
        return {opacity: test};
    }
    else{
        return{opacity: .2}
    }
}

function CreateCropInfoBox(crop, key){
    const [isShown, showInformation] = useState(false);
    return(
        <>
 
            <div className ="cropInfoBox" style={GetOpacity(key)} >
                <div className="column cropRank">
                    <h3 className = {'cropRankValue' + key}>{key + 1}{GetRankExtension(key)} </h3>
                    <p><img src={"/Images/App/information.png"}
                            onMouseEnter={() => showInformation(true)}
                            onMouseLeave={() => showInformation(false)}
                        ></img>   £{crop.cropYield}</p>
                </div>
                <div className="column cropImage">
                    <img src={"/Images/Cropimages/"+crop.imageURL} width="100%" height="100%" alt={crop.name}></img>
                </div>
                <div className="column cropInfo">
                    <p className="cropInfo">
                        <h3>{crop.name}</h3>
                        <p>This is a description of the crops. The crop description will be shown here.</p>
                        <p className = "cropIdealConditions">PH: {crop.lowerPHLimit} - {crop.upperPHLimit} | Humidity: {crop.lowerHumidityLimit}%
                            - {crop.upperHumidityLimit}% | {crop.lowerTempLimit}°C - {crop.upperTempLimit}°C</p>
                    </p>

                </div>


            </div>

            <div>
                {isShown && (CreatePopup()

                )}
            </div>
        </>
    );
}
function SuitableCrops(){

    const [moistValue, setmoistValue] = useState(30);
    const [phValue, setphValue] = useState(7);
    const [sunlightValue, setsunlightValue] = useState(30);
    const [tempValue, settempValue] = useState(23);

    useEffect(() => {
        const setSoilVariableArray = [
            setmoistValue, setphValue, setsunlightValue, settempValue
        ];

        const search_crops_btn = document.getElementById("search_crops_btn");
        const [moisture, pH, sunlight, temp] = document.getElementsByTagName("input");

        search_crops_btn.addEventListener("click", () => {
            var SoilVariableArray = [
                moisture.value, pH.value, sunlight.value, temp.value
            ];
            setSoilVariableArray.map((setSoilVar, indexNum) => {setSoilVar(SoilVariableArray[indexNum])})
        });
    }, []);

    const bestCropArray = GetBestCrops(moistValue,phValue,sunlightValue,tempValue);

  return(
    <>
      <div class="suitable_crops_box fill_in_box">
        <a></a>
          {bestCropArray.map((crop, key) =>(CreateCropInfoBox(crop, key)))}

          
      </div>
    </>

  );
}

  export default SuitableCrops;
