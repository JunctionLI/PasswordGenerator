
'use client';
import React,{useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import InputBox from './components/InputBox';
import FormCheckBox from './components/FormCheckBox';
import Output from './components/Output';
import Btn, { btnType } from './components/Btn';
import { generatePasswordString } from './utility/passwordGenerator';
import { showErrorSnackbar, showInfoSnackBar, showSuccessSnackBar } from './utility/utils';

function Main() : React.JSX.Element {
    //inputBox props setup
    const[userInputVal,setUserInputVal] = useState('');
    const[inputPlaceholder,setInputPlaceholder] = useState('Password Length (8-16)');

    function checkInputNumber(){
        if(isNaN(parseInt(userInputVal, 10))){
            handleReset();
            showErrorSnackbar('Please enter a valid number.');
            return false;
        }
        else if(parseInt(userInputVal, 10) > 16 || parseInt(userInputVal, 10) < 7 ){
            handleReset();
            showErrorSnackbar('Length can only between 8 and 16.');
            return false;
        }else{
            showSuccessSnackBar('Successful Generated!');
            return true;
        }
    }


    //checkbox setup
    const [isUpperChecked, setIsUpperChecked] = useState(false);
    const [isLowerChecked, setIsLowerChecked] = useState(false);
    const [isSpecialChecked, setIsSpecialChecked] = useState(false);
    const [isNumberChecked, setIsNumberChecked] = useState(false);

    function checkBoxSelect(){
        if(isUpperChecked === false && isLowerChecked === false && isSpecialChecked === false && isNumberChecked === false ){
            handleReset();
            showErrorSnackbar('At least one type of password should be selected.');
            return false;
        }else{
            return true;
        }
    }

    //Output props setup
    const[result, setResult] = useState('');
    const[placeholder,setPlaceholder] = useState('Select Options...');

    //generate button setup
    function handleSubmit(){
        if(!checkInputNumber() || !checkBoxSelect()){
            return;
        }
        const passwordRequirement = {
            length: parseInt(userInputVal, 10),
            includeUpper: isUpperChecked,
            includeLower: isLowerChecked,
            includeNumber: isNumberChecked,
            includeSymbol: isSpecialChecked,
        };
       setResult(generatePasswordString(passwordRequirement));
    }

    //reset button setup
    function handleReset(){
        setUserInputVal('');
        setInputPlaceholder('Password Length (8-16)');
        setIsUpperChecked(false);
        setIsLowerChecked(false);
        setIsSpecialChecked(false);
        setIsNumberChecked(false);
        setResult('');
        setPlaceholder('Select Options...');
        showInfoSnackBar('Already Reset');
    }

    function handleCopy(){
        Clipboard.setString(result);
        showSuccessSnackBar('Successful Copy');
    }




    return (
        <SafeAreaView>
            <View>
                <Text style={style.header}>Password Generator</Text>
                <InputBox inputVal={userInputVal} inputPlaceHolderTxt={inputPlaceholder} updateInputVal={setUserInputVal}/>
                <FormCheckBox label="Upper Case Letter" labelColor="red" checkedStatus={isUpperChecked} updateCheckedStatus={setIsUpperChecked}/>
                <FormCheckBox label="Lower Case Letter" labelColor="green" checkedStatus={isLowerChecked} updateCheckedStatus={setIsLowerChecked}/>
                <FormCheckBox label="Special Case Letter" labelColor="orange" checkedStatus={isSpecialChecked} updateCheckedStatus={setIsSpecialChecked}/>
                <FormCheckBox label="Number" labelColor="purple" checkedStatus={isNumberChecked} updateCheckedStatus={setIsNumberChecked}/>
                <Output generatedPassword={result} placeholder={placeholder} handleCopy={handleCopy}/>
                <Btn title="Generate Password" type={btnType.Primary}
                onPress={()=>{handleSubmit();}}/>
                <Btn title="Reset" type={btnType.Danger} onPress={handleReset}/>

            </View>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    header:{
        fontSize:25,
        fontWeight:'600',
        textAlign:'center',
    },
});


export default Main;
