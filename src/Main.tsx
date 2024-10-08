'use client';
import React,{useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Clipboard,
} from 'react-native';
import InputBox from './components/InputBox';
import FormCheckBox from './components/FormCheckBox';
import Output from './components/Output';
import Btn, { btnType } from './components/Btn';
import { generatePasswordString } from './utility/passwordGenerator';

function Main() : React.JSX.Element {
    //inputBox props setup
    const[userInputVal,setUserInputVal] = useState('');
    const[inputPlaceholder,setInputPlaceholder] = useState('Password Length (8-16)');

    //checkbox setup
    const [isUpperChecked, setIsUpperChecked] = useState(false);
    const [isLowerChecked, setIsLowerChecked] = useState(false);
    const [isSpecialChecked, setIsSpecialChecked] = useState(false);
    const [isNumberChecked, setIsNumberChecked] = useState(false);


    //Output props setup
    const[result, setResult] = useState('');
    const[placeholder,setPlaceholder] = useState('Select Options...');
    function handleCopy(){
        Clipboard.setString(result);
    }

    //generate button setup
    function handleSubmit(){
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
                <Btn title="Generate Password" type={btnType.Primary} onPress={handleSubmit}/>
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
